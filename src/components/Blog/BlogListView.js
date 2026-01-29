'use client';

export default function BlogListView({ blogs, onSelectBlog }) {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '60px 24px'
        }}>
            {/* Hero Section */}
            <div style={{
                marginBottom: '60px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-text-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Latest Insights
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                }}>
                    Thoughts on development, design, and the tech landscape.
                </p>
            </div>

            {/* Blog Grid */}
            <div style={{ display: 'grid', gap: '32px' }}>
                {blogs.map((blog, index) => (
                    <article
                        key={blog.id}
                        onClick={() => onSelectBlog(blog.id)}
                        style={{
                            padding: '32px',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,0,0,0.15)';
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                        }}
                    >
                        {/* Meta */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '16px',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: '600'
                        }}>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'var(--color-accent)',
                                color: 'var(--color-bg)'
                            }}>
                                {blog.readTime}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                {blog.date}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                            fontWeight: '700',
                            marginBottom: '12px',
                            lineHeight: '1.3'
                        }}>
                            {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.7',
                            marginBottom: '20px',
                            fontSize: '1rem'
                        }}>
                            {blog.excerpt}
                        </p>

                        {/* Author */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            paddingTop: '16px',
                            borderTop: '1px solid var(--color-border)'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-bg)',
                                fontWeight: '700',
                                fontSize: '0.9rem'
                            }}>
                                {blog.author.charAt(0)}
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{blog.author}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
