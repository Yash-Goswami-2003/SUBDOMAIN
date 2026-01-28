'use client'

import { useState } from 'react'
import Footer from '@/components/Portfolio/Footer'
import Loader from '@/components/Portfolio/Loader'
import { useProfileData } from '@/context/ProfileDataContext'

export default function Projects() {
    const { data, loading, error } = useProfileData()
    const [activeFilter, setActiveFilter] = useState('All')

    if (loading) return <Loader />

    if (error) {
        return (
            <main className="page-transition" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ color: 'var(--color-error)' }}>Error loading projects data</div>
                <button onClick={() => window.location.reload()} className="button">Retry</button>
            </main>
        )
    }

    if (!data) return null;

    const categories = ['All', 'Full Stack', 'Frontend', 'Backend']

    const filteredProjects = activeFilter === 'All'
        ? data.projects
        : data.projects.filter(p => p.category === activeFilter)

    return (
        <main className="page-transition">
            {/* Projects Hero */}
            <section className="container animate-fade-in-up" style={{
                minHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--spacing-xl) 0'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    fontWeight: '900',
                    letterSpacing: '-0.03em',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-primary)'
                }}>
                    My Projects
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '700px',
                    lineHeight: '1.7'
                }}>
                    A collection of projects I've worked on, showcasing my skills and passion for building great software.
                </p>
            </section>

            {/* Filter Buttons */}
            <section className="container" style={{
                padding: 'var(--spacing-lg) 0',
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)',
                flexWrap: 'wrap'
            }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className="hover-scale"
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            backgroundColor: activeFilter === category ? 'var(--color-accent)' : 'var(--color-surface)',
                            color: activeFilter === category ? 'var(--color-bg)' : 'var(--color-text-primary)',
                            border: `1px solid ${activeFilter === category ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            transition: 'all var(--transition-fast)',
                            cursor: 'pointer'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </section>

            {/* Projects Grid */}
            <section className="container" style={{
                padding: 'var(--spacing-xl) 0',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div className="grid" style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: 'var(--spacing-xl)'
                }}>
                    {filteredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className="card hover-lift"
                            style={{
                                overflow: 'hidden',
                                padding: 0,
                                animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                            }}
                        >
                            {/* Project Image Placeholder */}
                            <div style={{
                                height: '200px',
                                background: `linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                color: 'var(--color-text-secondary)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'var(--color-surface)',
                                    opacity: 0,
                                    transition: 'opacity var(--transition-base)'
                                }} />
                                {project.featured && (
                                    <span style={{
                                        position: 'absolute',
                                        top: 'var(--spacing-md)',
                                        right: 'var(--spacing-md)',
                                        padding: '0.25rem 0.75rem',
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
                                )}
                                📱
                            </div>

                            {/* Project Content */}
                            <div style={{ padding: 'var(--spacing-lg)' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    marginBottom: 'var(--spacing-sm)',
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {project.title}
                                </h3>

                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.6',
                                    marginBottom: 'var(--spacing-md)'
                                }}>
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 'var(--spacing-xs)',
                                    marginBottom: 'var(--spacing-md)'
                                }}>
                                    {project.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                backgroundColor: 'var(--color-surface)',
                                                color: 'var(--color-text-secondary)',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--color-border)'
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex" style={{
                                    gap: 'var(--spacing-sm)',
                                    marginTop: 'auto'
                                }}>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button"
                                        style={{
                                            flex: 1,
                                            fontSize: '0.875rem',
                                            padding: '0.5rem 1rem'
                                        }}
                                    >
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button hover-scale"
                                        style={{
                                            flex: 1,
                                            fontSize: '0.875rem',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: 'transparent',
                                            color: 'var(--color-text-primary)',
                                            border: '1px solid var(--color-border)'
                                        }}
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: 'var(--spacing-xl)',
                        color: 'var(--color-text-secondary)'
                    }}>
                        No projects found in this category.
                    </div>
                )}
            </section>

            <Footer data={data} />
        </main>
    )
}
