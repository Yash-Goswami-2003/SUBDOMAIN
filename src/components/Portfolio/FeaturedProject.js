'use client'

import Link from 'next/link'

export default function FeaturedProject() {
    // Slide Graft - AI Presentation Maker
    const featured = {
        title: "Slide Graft",
        description: "An AI-powered presentation maker that lets you create and edit professional PowerPoint slides effortlessly.",
        longDescription: "Slide Graft revolutionizes how presentations are created. Using advanced AI, you can generate beautiful slides, edit content, and create stunning presentations in minutes instead of hours. Perfect for professionals, educators, and anyone who needs to communicate ideas visually.",
        technologies: ["Next.js", "AI/ML", "PowerPoint API", "React", "Node.js"],
        liveUrl: "https://slidegraft.com",
        githubUrl: "https://github.com/yourusername/slidegraft"
    }

    return (
        <section className="container" style={{
            padding: 'var(--spacing-xl) 0',
            marginBottom: 'var(--spacing-xl)',
            position: 'relative'
        }}>
            {/* Section Header */}
            <div className="section-header" style={{
                marginBottom: 'var(--spacing-xl)',
                maxWidth: 'calc(100% - 200px)'
            }}>
                <div>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        marginBottom: 'var(--spacing-xs)',
                        color: 'var(--color-text-primary)'
                    }}>
                        Featured Project
                    </h2>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        A glimpse into my latest work
                    </p>
                </div>
            </div>

            {/* Desktop View All Link */}
            <div className="desktop-link" style={{
                position: 'absolute',
                top: 'var(--spacing-xl)',
                right: 0
            }}>
                <Link
                    href="/projects"
                    className="button"
                    style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem'
                    }}
                >
                    View All Projects →
                </Link>
            </div>

            {/* Featured Project Card */}
            <div
                className="card"
                style={{
                    padding: 0,
                    overflow: 'hidden',
                    animation: 'fadeInUp 0.6s ease both'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 0
                }}>
                    {/* Project Visual */}
                    <div className="project-visual" style={{
                        position: 'relative',
                        minHeight: '320px',
                        backgroundColor: 'var(--color-bg)',
                        borderRight: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'var(--spacing-xl)'
                    }}>
                        {/* Decorative grid pattern */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0.4,
                            backgroundImage: `
                                linear-gradient(var(--color-border) 1px, transparent 1px),
                                linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px'
                        }} />

                        {/* Slide mockup */}
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            width: '100%',
                            maxWidth: '280px',
                            aspectRatio: '16/10',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            {/* Slide header */}
                            <div style={{
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)'
                            }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
                                <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>Slide Graft</span>
                            </div>

                            {/* Slide content */}
                            <div style={{
                                flex: 1,
                                padding: 'var(--spacing-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sm)'
                            }}>
                                <div style={{
                                    height: '12px',
                                    width: '60%',
                                    backgroundColor: 'var(--color-border)',
                                    borderRadius: '2px'
                                }} />
                                <div style={{
                                    height: '8px',
                                    width: '80%',
                                    backgroundColor: 'var(--color-border)',
                                    borderRadius: '2px',
                                    opacity: 0.6
                                }} />
                                <div style={{
                                    height: '8px',
                                    width: '70%',
                                    backgroundColor: 'var(--color-border)',
                                    borderRadius: '2px',
                                    opacity: 0.6
                                }} />
                                <div style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    gap: 'var(--spacing-xs)'
                                }}>
                                    <div style={{
                                        height: '24px',
                                        flex: 1,
                                        backgroundColor: 'var(--color-border)',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        height: '24px',
                                        flex: 1,
                                        backgroundColor: 'var(--color-border)',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* AI sparkle badge */}
                        <div style={{
                            position: 'absolute',
                            top: 'var(--spacing-lg)',
                            right: 'var(--spacing-lg)',
                            padding: '0.4rem 0.8rem',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg)',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            borderRadius: 'var(--radius-sm)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            AI-Powered
                        </div>
                    </div>

                    {/* Project Info */}
                    <div className="project-info" style={{
                        padding: 'var(--spacing-xl)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <h3 style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                            fontWeight: '700',
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--color-text-primary)'
                        }}>
                            {featured.title}
                        </h3>

                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {featured.longDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="tech-stack" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-xs)',
                            marginBottom: 'var(--spacing-xl)'
                        }}>
                            {featured.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '0.3rem 0.65rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-text-secondary)',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex action-buttons" style={{ gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                            <a
                                href={featured.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button"
                            >
                                View Live Demo
                            </a>
                            <a
                                href={featured.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'var(--color-text-primary)',
                                    border: '1px solid var(--color-border)'
                                }}
                            >
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View All Link */}
            <div className="mobile-link" style={{
                display: 'none',
                marginTop: 'var(--spacing-xl)',
                justifyContent: 'center'
            }}>
                <Link
                    href="/projects"
                    className="button"
                    style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.875rem'
                    }}
                >
                    View All Projects →
                </Link>
            </div>

            {/* Mobile responsive styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .section-header {
                        max-width: 100% !important;
                        text-align: center !important;
                        margin-bottom: var(--spacing-lg) !important;
                    }
                    .desktop-link {
                        display: none !important;
                    }
                    .mobile-link {
                        display: flex !important;
                    }
                    .project-info {
                        text-align: center !important;
                    }
                    .tech-stack {
                        justify-content: center !important;
                    }
                    .action-buttons {
                        justify-content: center !important;
                    }
                    .project-visual {
                        border-right: none !important;
                        border-bottom: 1px solid var(--color-border) !important;
                        min-height: 250px !important;
                    }
                    div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    )
}
