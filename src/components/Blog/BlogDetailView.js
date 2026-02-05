'use client';

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

    const containerClass = 'mx-auto w-full max-w-[760px] px-6';
    const readerFontClass = "font-['Source_Sans_3','Inter','Helvetica_Neue',Arial,sans-serif]";
    const proseClass = 'text-[1.05rem] leading-7 text-[#2f2f2f] [&_p]:mb-4 [&_p]:text-[#3f3f3f] [&_strong]:text-[#1f1f1f] [&_a]:text-[var(--color-accent)] [&_a]:underline-offset-4 [&_a]:decoration-[var(--color-border)] [&_a:hover]:decoration-[#1f1f1f] [&_h1]:mt-10 [&_h1]:text-[2.1rem] [&_h1]:font-semibold [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1a1a1a] [&_h2]:mt-10 [&_h2]:text-[1.75rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-[#1a1a1a] [&_h3]:mt-8 [&_h3]:text-[1.4rem] [&_h3]:font-semibold [&_h3]:text-[#1a1a1a] [&_h4]:mt-6 [&_h4]:text-[1.1rem] [&_h4]:font-semibold [&_h4]:text-[#1a1a1a] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:marker:text-[#8a8a8a] [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#1f1f1f] [&_blockquote]:bg-[var(--color-surface)] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:italic [&_blockquote]:text-[1.1rem] [&_blockquote]:text-[#444444] [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-neutral-800 [&_pre]:bg-neutral-950 [&_pre]:p-6 [&_pre]:text-sm [&_pre]:leading-6 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-[#b42318] [&_hr]:my-12 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-[var(--color-border)]';

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
            <div className={`${containerClass} pt-8 font-sans`}>
                <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back to all stories</span>
                </button>
            </div>

            <article className={`${containerClass} pb-24 pt-6 ${readerFontClass}`}>
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-sans">
                        <span className="text-[var(--color-accent)]">{blog.tags?.[0] || 'Insight'}</span>
                        <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-border)]"></span>
                        <time className="text-[var(--color-text-secondary)]">{blog.date || (blog.createdAt ? format(new Date(blog.createdAt), 'MMM dd, yyyy') : 'Recently Published')}</time>
                    </div>

                    <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                        {blog.title}
                    </h1>

                    <div className="mt-6 flex items-center gap-3 font-sans">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-sm font-semibold text-[var(--color-bg)]">
                            {blog.author?.charAt(0) || 'Y'}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{blog.author || 'Yash Goswami'}</span>
                            <span className="text-xs text-[var(--color-text-muted)]">{blog.readTime || '5 min'} read</span>
                        </div>
                    </div>
                </header>

                <div>
                    {isHTML ? (
                        <div className={proseClass} dangerouslySetInnerHTML={{ __html: renderedContent }} />
                    ) : (
                        <div className={proseClass}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {renderedContent}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                <footer className="mt-16 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center font-sans">
                    <div className="mx-auto flex max-w-[520px] flex-col items-center">
                        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Did you like this blog?</h2>
                        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                            Want to explore more posts like this? Head back to all stories.
                        </p>
                        <button
                            onClick={onBack}
                            className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-text-primary)]"
                        >
                            Read More Blogs
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    );
}
