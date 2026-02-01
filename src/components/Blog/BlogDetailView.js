'use client';

export default function BlogDetailView({ blog, onBack }) {
    if (!blog) return null;

    return (
        <div className="blog-detail">
            <button onClick={onBack} className="back-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <article className="blog-article">
                <header className="blog-header">
                    <div className="blog-meta">
                        <span>{blog.date}</span>
                        <span>{blog.readTime}</span>
                    </div>
                    <h1 className="blog-title">{blog.title}</h1>
                    <div className="blog-author">
                        <span className="author-avatar">{blog.author.charAt(0)}</span>
                        <span className="author-name">{blog.author}</span>
                    </div>
                </header>

                <div className="blog-content">
                    {blog.content}
                </div>
            </article>

            <div className="blog-footer">
                <h3>Subscribe for more</h3>
                <p>Get notified when new articles are published.</p>
                <button className="button">Subscribe</button>
            </div>

            <style jsx>{`
                .blog-detail {
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 80px 24px 60px;
                }

                .back-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 2rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    transition: all var(--transition-fast);
                }

                .back-button:hover {
                    color: var(--color-text-primary);
                    border-color: var(--color-text-muted);
                }

                .blog-header {
                    margin-bottom: 2.5rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--color-border);
                }

                .blog-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.8125rem;
                    color: var(--color-text-muted);
                    margin-bottom: 1rem;
                }

                .blog-title {
                    font-size: 2rem;
                    font-weight: 600;
                    line-height: 1.2;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .blog-author {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .author-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .author-name {
                    font-size: 0.9375rem;
                    font-weight: 500;
                }

                .blog-content {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: var(--color-text-secondary);
                    white-space: pre-wrap;
                }

                .blog-footer {
                    margin-top: 4rem;
                    padding: 2rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    text-align: center;
                }

                .blog-footer h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .blog-footer p {
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
}
