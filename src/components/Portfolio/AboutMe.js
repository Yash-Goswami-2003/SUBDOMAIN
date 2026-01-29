'use client'

export default function AboutMe({ data }) {
    return (
        <section className="container" style={{
            padding: 'var(--spacing-xl) 0',
            marginBottom: 'var(--spacing-xl)'
        }}>
            {/* Section Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <h2 style={{
                    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)'
                }}>
                    About Me
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    The person behind the code
                </p>
            </div>

            {/* Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-xl)',
                // Removed alignItems: 'start' to let items stretch to equal height
            }}>
                {/* Story Card */}
                <div className="card" style={{
                    padding: 'var(--spacing-xl)',
                    animation: 'fadeInUp 0.5s ease both',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)' }}>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)'
                        }}>
                            My Story
                        </h3>
                    </div>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.8,
                        flex: 1 // Allow text to take available space
                    }}>
                        {data.about?.story || "I'm a passionate developer who loves turning complex problems into simple, beautiful solutions. With a focus on clean code and user experience, I strive to create applications that make a difference."}
                    </p>
                </div>

                {/* Quick Info Card */}
                <div className="card" style={{
                    padding: 'var(--spacing-xl)',
                    animation: 'fadeInUp 0.5s ease 0.1s both',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)' }}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)'
                        }}>
                            Quick Info
                        </h3>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)',
                        flex: 1 // Allow content to fill space
                    }}>
                        {/* Location */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Location</div>
                                <div style={{ fontSize: '0.925rem', color: 'var(--color-text-primary)', fontWeight: '500' }}>{data.location}</div>
                            </div>
                        </div>

                        {/* Role */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Role</div>
                                <div style={{ fontSize: '0.925rem', color: 'var(--color-text-primary)', fontWeight: '500' }}>{data.title}</div>
                            </div>
                        </div>

                        {/* Email */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Email</div>
                                <a href={`mailto:${data.email}`} style={{ fontSize: '0.925rem', color: 'var(--color-text-primary)', fontWeight: '500', textDecoration: 'underline' }}>{data.email}</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div className="card" style={{
                    padding: 'var(--spacing-xl)',
                    animation: 'fadeInUp 0.5s ease 0.2s both',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)' }}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)'
                        }}>
                            Interests
                        </h3>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-xs)',
                        flex: 1
                    }}>
                        {(data.about?.interests || ['Web Development', 'Open Source', 'UI/UX Design', 'Learning New Tech']).map((interest, idx) => (
                            <span
                                key={idx}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text-secondary)',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    height: 'fit-content'
                                }}
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div className="card" style={{
                    padding: 'var(--spacing-xl)',
                    animation: 'fadeInUp 0.5s ease 0.3s both',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-secondary)' }}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)'
                        }}>
                            Values
                        </h3>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-xs)',
                        flex: 1
                    }}>
                        {(data.about?.values || ['Clean Code', 'Continuous Learning', 'Collaboration', 'User-First Design']).map((value, idx) => (
                            <span
                                key={idx}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text-secondary)',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-border)',
                                    height: 'fit-content'
                                }}
                            >
                                {value}
                            </span>
                        ))}
                    </div>
                </div>
            </div>


            {/* Mobile responsive styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section >
    )
}
