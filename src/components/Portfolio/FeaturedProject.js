'use client'

import Link from 'next/link'

export default function FeaturedProject({ data }) {
    if (!data) return null;

    const featuredProject = data.projects?.find(p => p.featured) || data.projects?.[0];
    if (!featuredProject) return null;

    return (
        <section className="featured">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Project</h2>
                    <Link href="/projects" className="view-all">View all →</Link>
                </div>

                <div className="project-card">
                    <div className="project-preview">
                        <span className="featured-badge">Featured</span>
                    </div>

                    <div className="project-content">
                        <h3 className="project-title">{featuredProject.title}</h3>
                        <p className="project-desc">
                            {featuredProject.longDescription || featuredProject.description}
                        </p>

                        <div className="tech-stack">
                            {(featuredProject.technologies || []).map((tech, idx) => (
                                <span key={idx} className="tech-tag">{tech}</span>
                            ))}
                        </div>

                        <div className="project-actions">
                            <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer" className="button">
                                View Demo
                            </a>
                            <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer" className="button button-outline">
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .featured {
                    padding: 4rem 0;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .view-all {
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                }

                .view-all:hover {
                    color: var(--color-text-primary);
                }

                .project-card {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                }

                .project-preview {
                    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
                    min-height: 280px;
                    display: flex;
                    align-items: flex-start;
                    padding: 1rem;
                }

                .featured-badge {
                    font-size: 0.6875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    padding: 0.375rem 0.75rem;
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                    border-radius: var(--radius-sm);
                }

                .project-content {
                    padding: 2rem;
                }

                .project-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }

                .project-desc {
                    font-size: 0.9375rem;
                    color: var(--color-text-secondary);
                    line-height: 1.7;
                    margin-bottom: 1.25rem;
                }

                .tech-stack {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .tech-tag {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.625rem;
                    background-color: var(--color-bg);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    color: var(--color-text-secondary);
                }

                .project-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                @media (max-width: 768px) {
                    .project-card {
                        grid-template-columns: 1fr;
                    }

                    .project-preview {
                        min-height: 150px;
                    }

                    .project-actions {
                        flex-direction: column;
                    }
                }
            `}</style>
        </section>
    )
}
