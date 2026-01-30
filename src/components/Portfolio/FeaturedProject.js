'use client'

import Link from 'next/link'

export default function FeaturedProject({ data }) {
    if (!data) return null;

    // Get the first featured project or the first project
    const featuredProject = data.projects?.find(p => p.featured) || data.projects?.[0];

    if (!featuredProject) {
        return null; // No projects to display
    }

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
                    Featured Project
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                }}>
                    A glimpse into my latest work
                </p>
                <Link
                    href="/projects"
                    className="hover-scale"
                    style={{
                        display: 'inline-block',
                        marginTop: 'var(--spacing-md)',
                        fontSize: '0.9rem',
                        color: 'var(--color-accent)',
                        textDecoration: 'none'
                    }}
                >
                    View All Projects →
                </Link>
            </div>

            {/* Featured Project Card */}
            <div className="card hover-lift animate-fade-in-up" style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: 0,
                overflow: 'hidden'
            }}>
                <div className="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 0
                }}>
                    {/* Project Preview */}
                    <div style={{
                        minHeight: '300px',
                        background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: 'var(--spacing-md)',
                            left: 'var(--spacing-md)',
                            padding: '0.35rem 0.75rem',
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg)',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            borderRadius: 'var(--radius-sm)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Featured
                        </span>
                        <span style={{ fontSize: '4rem', opacity: 0.5 }}>🚀</span>
                    </div>

                    {/* Project Details */}
                    <div style={{ padding: 'var(--spacing-xl)' }}>
                        <h3 style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                            fontWeight: '700',
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--color-text-primary)'
                        }}>
                            {featuredProject.title}
                        </h3>

                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {featuredProject.longDescription || featuredProject.description}
                        </p>

                        {/* Tech Stack */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-xs)',
                            marginBottom: 'var(--spacing-xl)'
                        }}>
                            {(featuredProject.technologies || []).map((tech, idx) => (
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
                        <div className="flex" style={{ gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                            <a
                                href={featuredProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button"
                            >
                                View Live Demo
                            </a>
                            <a
                                href={featuredProject.githubUrl}
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

            {/* View All Projects Link (Bottom) */}
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
                <Link
                    href="/projects"
                    className="hover-scale"
                    style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-accent)',
                        textDecoration: 'none'
                    }}
                >
                    View All Projects →
                </Link>
            </div>
        </section>
    )
}
