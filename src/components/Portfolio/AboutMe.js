'use client'

export default function AboutMe({ data }) {
    if (!data) return null;

    return (
        <section className="container" style={{
            padding: 'var(--spacing-xl) 0',
            marginBottom: 'var(--spacing-xl)'
        }}>
            {/* Section Header */}
            <div className="animate-fade-in-up" style={{
                textAlign: 'center',
                marginBottom: 'var(--spacing-xl)',
                maxWidth: '600px',
                margin: '0 auto var(--spacing-xl)'
            }}>
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: '800',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)'
                }}>
                    About Me
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                }}>
                    {data.tagline || 'The person behind the code'}
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-lg)',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Story Card */}
                <div className="card hover-lift animate-fade-in-up" style={{
                    padding: 'var(--spacing-lg)',
                    animationDelay: '0.1s'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        My Story
                    </h3>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.7'
                    }}>
                        {data.about?.story || 'My story...'}
                    </p>
                </div>

                {/* Quick Info Card */}
                <div className="card hover-lift animate-fade-in-up" style={{
                    padding: 'var(--spacing-lg)',
                    animationDelay: '0.2s'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        Quick Info
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-sm)'
                    }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>📍</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{data.location || 'Location'}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>💼</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{data.title || 'Developer'}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>✉️</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{data.email || 'email@example.com'}</span>
                        </div>
                    </div>
                </div>

                {/* Interests Card */}
                <div className="card hover-lift animate-fade-in-up" style={{
                    padding: 'var(--spacing-lg)',
                    animationDelay: '0.3s'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        Interests
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-xs)'
                    }}>
                        {(data.about?.interests || []).map((interest, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.8rem',
                                    backgroundColor: 'var(--color-surface)',
                                    color: 'var(--color-text-secondary)',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Values Card */}
                <div className="card hover-lift animate-fade-in-up" style={{
                    padding: 'var(--spacing-lg)',
                    animationDelay: '0.4s'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        Values
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-xs)'
                    }}>
                        {(data.about?.values || []).map((value, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.8rem',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'var(--color-bg)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontWeight: '500'
                                }}
                            >
                                {value}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
