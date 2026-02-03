'use client'

import { format } from 'date-fns'

export default function BlogListView({ blogs, onSelectBlog }) {
    // Featured post is the first one, rest are regular
    const featuredPost = blogs[0];
    const regularPosts = blogs.slice(1);

    return (
        <div className="blog-page">
            {/* Hero Header */}
            <div className="blog-hero">
                <span className="hero-label">BLOGS</span>
                <h1 className="hero-title">Insights & Ideas</h1>
                <p className="hero-subtitle">
                    Thoughts on software development, design patterns, and building for the web.
                </p>
            </div>

            {/* Featured Post - Large Card */}
            {featuredPost && (
                <article
                    onClick={() => onSelectBlog(featuredPost.id)}
                    className="featured-post"
                >
                    <div className="featured-content">
                        <div className="featured-meta">
                            <span className="post-category">{featuredPost.category || 'Development'}</span>
                            <span className="meta-dot">•</span>
                            <span className="post-date">
                                {featuredPost.date || (featuredPost.createdAt ? format(new Date(featuredPost.createdAt), 'MMM dd, yyyy') : 'No date')}
                            </span>
                            {featuredPost.status && (
                                <>
                                    <span className="meta-dot">•</span>
                                    <span className={`status-badge ${featuredPost.status}`}>
                                        {featuredPost.status}
                                    </span>
                                </>
                            )}
                        </div>
                        <h2 className="featured-title">{featuredPost.title}</h2>
                        <p className="featured-excerpt">{featuredPost.excerpt}</p>
                        <div className="featured-footer">
                            <span className="read-more">Read article →</span>
                            <span className="read-time">{featuredPost.readTime}</span>
                        </div>
                    </div>
                </article>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
                <div className="posts-section">
                    <h3 className="section-label">More Articles</h3>
                    <div className="posts-grid">
                        {regularPosts.map((blog) => (
                            <article
                                key={blog.id}
                                onClick={() => onSelectBlog(blog.id)}
                                className="post-card"
                            >
                                <div className="post-meta">
                                    <span className="post-category-small">{blog.category || 'Dev'}</span>
                                    <span className="post-date-small">
                                        {blog.date || (blog.createdAt ? format(new Date(blog.createdAt), 'MMM dd, yyyy') : 'No date')}
                                    </span>
                                    {blog.status && (
                                        <span className={`status-badge-small ${blog.status}`}>
                                            {blog.status}
                                        </span>
                                    )}
                                </div>
                                <h3 className="post-title">{blog.title}</h3>
                                <p className="post-excerpt">{blog.excerpt}</p>
                                <span className="post-read-time">{blog.readTime}</span>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .blog-page {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 60px 24px 80px;
                }

                /* Hero Header */
                .blog-hero {
                    text-align: center;
                    margin-bottom: 4rem;
                    padding-bottom: 3rem;
                    border-bottom: 1px solid var(--color-border);
                }

                .hero-label {
                    display: inline-block;
                    font-size: 0.6875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-accent);
                    margin-bottom: 1rem;
                    padding: 0.375rem 0.875rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 999px;
                }

                .hero-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    margin-bottom: 1rem;
                    line-height: 1.1;
                }

                .hero-subtitle {
                    font-size: 1.0625rem;
                    color: var(--color-text-secondary);
                    max-width: 500px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Featured Post */
                .featured-post {
                    padding: 2rem;
                    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: all var(--transition-base);
                    margin-bottom: 3rem;
                }

                .featured-post:hover {
                    border-color: var(--color-text-muted);
                    transform: translateY(-2px);
                }

                .featured-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .post-category {
                    font-size: 0.6875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--color-accent);
                    padding: 0.25rem 0.625rem;
                    background-color: var(--color-bg);
                    border: 1px solid var(--color-border);
                    border-radius: 4px;
                }

                .meta-dot {
                    color: var(--color-text-muted);
                    font-size: 0.75rem;
                }

                .post-date {
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                }

                .featured-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                    margin-bottom: 0.75rem;
                }

                .featured-excerpt {
                    font-size: 1rem;
                    color: var(--color-text-secondary);
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .featured-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--color-border);
                }

                .read-more {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }

                .read-time {
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                }

                /* Regular Posts */
                .posts-section {
                    margin-top: 2rem;
                }

                .section-label {
                    font-size: 0.6875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--color-text-muted);
                    margin-bottom: 1.25rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--color-border);
                }

                .posts-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.25rem;
                }

                .post-card {
                    padding: 1.25rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    background-color: var(--color-surface);
                    cursor: pointer;
                    transition: all var(--transition-fast);
                }

                .post-card:hover {
                    border-color: var(--color-text-muted);
                }

                .post-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .post-category-small {
                    font-size: 0.625rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--color-accent);
                }

                .post-date-small {
                    font-size: 0.6875rem;
                    color: var(--color-text-muted);
                }

                .post-title {
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.4;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .post-excerpt {
                    font-size: 0.8125rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                    margin-bottom: 0.75rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .post-read-time {
                    font-size: 0.6875rem;
                    color: var(--color-text-muted);
                }

                .status-badge {
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .status-badge.published {
                    background-color: #d1fae5;
                    color: #065f46;
                }

                .status-badge.draft {
                    background-color: #fed7aa;
                    color: #92400e;
                }

                .status-badge-small {
                    padding: 1px 6px;
                    border-radius: 8px;
                    font-size: 0.625rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .status-badge-small.published {
                    background-color: #d1fae5;
                    color: #065f46;
                }

                .status-badge-small.draft {
                    background-color: #fed7aa;
                    color: #92400e;
                }

                @media (max-width: 768px) {
                    .blog-page {
                        padding: 40px 16px 60px;
                    }

                    .hero-title {
                        font-size: 2rem;
                    }

                    .featured-title {
                        font-size: 1.375rem;
                    }

                    .posts-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
