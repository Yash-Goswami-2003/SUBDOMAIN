'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { format } from 'date-fns';

// Import highlight.js theme for syntax highlighting
import 'highlight.js/styles/github-dark.css';

/**
 * Intelligent formatter to fix common blog formatting issues.
 * Specifically handles "Mock Code Trees" and ensures text meant to be code is treated as such.
 */
const smartFormatContent = (content) => {
    if (!content) return '';

    // Split into lines to process line-by-line
    const lines = content.split('\n');
    let processedLines = [];
    let inCodeBlock = false;
    let codeBlockBuffer = [];

    // Helper to check if a line looks like it belongs in a component tree diagram
    const isTreeLine = (line) => {
        const trimmed = line.trim();
        // Matches: <Component>, |___, |---, +---
        return /^<?[A-Z][a-zA-Z0-9\.]*>$/.test(trimmed) || // <App> or App
            /^[|\\+\\-]{1,}\s*-*\s*<?[A-Z][a-zA-Z0-9\.]*>/.test(trimmed) || // |-- <Auth>
            /^\s+[|\\+\\-]+\s+/.test(line); // Indented tree lines
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if this line looks like part of a code tree
        if (isTreeLine(line)) {
            if (!inCodeBlock) {
                // If the previous line was also code-like (e.g. "Components:"), maybe include it? 
                // For now, let's just start the block.
                inCodeBlock = true;
            }
            codeBlockBuffer.push(line);
        } else {
            // If we were in a code block, flush it
            if (inCodeBlock) {
                // Heuristic: Trees usually have at least 2 lines. 
                // If it's a single <Component>, it might just be inline reference, 
                // but usually <Component> on its own line implies emphasis or code.
                if (codeBlockBuffer.length > 0) {
                    processedLines.push('```jsx'); // Use JSX highlighting for trees
                    processedLines.push(...codeBlockBuffer);
                    processedLines.push('```');
                }
                codeBlockBuffer = [];
                inCodeBlock = false;
            }
            processedLines.push(line);
        }
    }

    // Flush remaining buffer
    if (codeBlockBuffer.length > 0) {
        processedLines.push('```jsx');
        processedLines.push(...codeBlockBuffer);
        processedLines.push('```');
    }

    return processedLines.join('\n');
};

export default function BlogDetailView({ blog, onBack }) {
    if (!blog) return null;

    // improved HTML detection: Only assume HTML if it starts with standard block tags
    // This prevents <App> (React component text) from being mistaken as HTML
    const isHTML = /^\s*<(p|div|h[1-6]|ul|ol|article|section|blockquote|pre)\b/i.test(blog.content);

    // Apply smart formatting only if it's Markdown (not TipTap HTML)
    const renderedContent = isHTML ? blog.content : smartFormatContent(blog.content);

    return (
        <div className="modern-blog-layout">
            {/* Minimalist Header Nav */}
            <div className="top-nav">
                <button onClick={onBack} className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back to all stories</span>
                </button>
            </div>

            <article className="main-story">
                <header className="story-header">
                    <div className="story-meta">
                        <span className="meta-category">{blog.tags?.[0] || 'Insight'}</span>
                        <span className="meta-dot"></span>
                        <time>{blog.date || (blog.createdAt ? format(new Date(blog.createdAt), 'MMM dd, yyyy') : 'Recently Published')}</time>
                    </div>

                    <h1 className="story-title">{blog.title}</h1>

                    <div className="author-card">
                        <div className="author-avatar">{blog.author?.charAt(0) || 'Y'}</div>
                        <div className="author-details">
                            <span className="author-name">{blog.author || 'Yash Goswami'}</span>
                            <span className="author-role">{blog.readTime || '5 min'} read</span>
                        </div>
                    </div>
                </header>

                <div className="story-content">
                    {isHTML ? (
                        <div
                            className="prose-container"
                            dangerouslySetInnerHTML={{ __html: renderedContent }}
                        />
                    ) : (
                        <div className="prose-container">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {renderedContent}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                <footer className="story-footer">
                    <div className="footer-cta">
                        <h2>Enjoyed this article?</h2>
                        <p>I write about development, design, and product thinking every week. Join 5,000+ others.</p>
                        <div className="subscribe-form">
                            <input type="email" placeholder="Enter your email" />
                            <button>Subscribe</button>
                        </div>
                    </div>
                </footer>
            </article>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

                :root {
                    --accent-primary: #000000;
                    --text-main: #1a1a1a;
                    --text-secondary: #555555;
                    --bg-main: #ffffff;
                    --border-soft: #f0f0f0;
                    --notion-red: #eb5757;
                }

                .modern-blog-layout {
                    background: var(--bg-main);
                    color: var(--text-main);
                    min-height: 100vh;
                    font-family: 'Inter', -apple-system, sans-serif;
                }

                .prose-container {
                    font-size: 1.125rem;
                    line-height: 1.7;
                    color: var(--text-main);
                }

                .prose-container h2, .prose-container h3 {
                    font-family: 'Outfit', sans-serif;
                    color: #000;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    letter-spacing: -0.02em;
                }

                .prose-container h2 { font-size: 1.875rem; font-weight: 700; }
                .prose-container h3 { font-size: 1.5rem; font-weight: 600; }

                .prose-container p { margin-bottom: 0.5rem; }

                /* Better Code Block Styling */
                .prose-container pre {
                    background: #0d0d0d;
                    color: #fff;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin: 2rem 0;
                    overflow-x: auto;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    border: 1px solid #222;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: relative;
                }

                .prose-container code {
                    font-family: 'JetBrains Mono', 'Fira Code', monospace;
                    background: rgba(0,0,0,0.05);
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-size: 0.85em;
                    color: var(--notion-red);
                }

                .prose-container pre code { 
                    background: transparent; 
                    color: inherit; 
                    padding: 0;
                    font-family: inherit;
                }

                .prose-container blockquote {
                    border-left: 4px solid #000;
                    padding-left: 1.5rem;
                    margin: 2rem 0;
                    font-style: italic;
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    background: #f9f9f9;
                    padding: 1.5rem;
                    border-radius: 0 12px 12px 0;
                }

                .prose-container ul, .prose-container ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }

                .prose-container li { margin-bottom: 0.5rem; }

                .prose-container hr {
                    border: none;
                    height: 1px;
                    background: #eee;
                    margin: 4rem 0;
                }
            `}</style>

            <style jsx>{`
                .top-nav {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 32px 0;
                }

                .back-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                    padding: 0 24px;
                }

                .back-link:hover { color: #000; transform: translateX(-4px); }

                .main-story {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 0 24px 100px;
                }

                .story-header { margin-bottom: 4rem; }

                .story-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .meta-category { color: var(--notion-red); }
                .meta-dot { width: 4px; height: 4px; border-radius: 50%; background: #ccc; }

                .story-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                    margin-bottom: 2.5rem;
                }

                .author-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .author-avatar {
                    width: 44px;
                    height: 44px;
                    background: #000;
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                }

                .author-details { display: flex; flex-direction: column; }
                .author-name { font-weight: 700; font-size: 15px; }
                .author-role { font-size: 13px; color: #888; }

                .story-footer {
                    margin-top: 6rem;
                    padding: 4rem;
                    background: #000;
                    color: #fff;
                    border-radius: 32px;
                    text-align: center;
                }

                .footer-cta h2 { font-family: 'Outfit', sans-serif; font-size: 2.25rem; margin-bottom: 1rem; }
                .footer-cta p { color: #aaa; margin-bottom: 2.5rem; max-width: 450px; margin-left: auto; margin-right: auto; }

                .subscribe-form {
                    display: flex;
                    gap: 12px;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .subscribe-form input {
                    flex: 1;
                    padding: 16px 24px;
                    border-radius: 12px;
                    border: none;
                    background: #1a1a1a;
                    color: #fff;
                    outline: none;
                }

                .subscribe-form button {
                    padding: 16px 32px;
                    background: #fff;
                    color: #000;
                    font-weight: 700;
                    border-radius: 12px;
                }

                @media (max-width: 768px) {
                    .top-nav { padding: 24px 0; }
                    .main-story { padding: 0 24px 60px; }
                    .story-title { font-size: 2.25rem; }
                    .story-footer { padding: 3rem 2rem; }
                    .subscribe-form { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
