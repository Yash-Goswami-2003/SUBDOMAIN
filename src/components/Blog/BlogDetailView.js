'use client';

export default function BlogDetailView({ blog, onBack }) {
    if (!blog) return null;

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '60px 24px'
        }}>
            {/* Back Button */}
            <button
                onClick={onBack}
                style={{
                    marginBottom: '40px',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-text-primary)',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Blogs
            </button>

            <article>
                {/* Header */}
                <header style={{ marginBottom: '48px' }}>
                    {/* Meta */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '20px',
                        fontWeight: '500'
                    }}>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)'
                        }}>
                            {blog.date}
                        </span>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg)'
                        }}>
                            {blog.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        letterSpacing: '-0.03em'
                    }}>
                        {blog.title}
                    </h1>

                    {/* Author */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        paddingTop: '24px',
                        borderTop: '1px solid var(--color-border)'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-bg)',
                            fontWeight: '700',
                            fontSize: '1.1rem'
                        }}>
                            {blog.author.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1rem' }}>{blog.author}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Author</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div style={{
                    fontSize: '1.15rem',
                    lineHeight: '1.9',
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'pre-wrap'
                }}>
                    {blog.content}
                </div>
            </article>

            {/* Footer CTA */}
            <div style={{
                marginTop: '80px',
                padding: '40px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                textAlign: 'center'
            }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.5rem', fontWeight: '700' }}>
                    Enjoyed this read?
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                    Subscribe to our newsletter for more insights like this.
                </p>
                <button style={{
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 20px -5px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Subscribe Now
                </button>
            </div>
        </div>
    );
}
