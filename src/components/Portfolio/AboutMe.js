'use client'

export default function AboutMe({ data }) {
    if (!data) return null;

    return (
        <section className="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-main">
                        <h2 className="section-title">About</h2>
                        <p className="story">
                            {data.about?.story || 'Passionate about building things that matter.'}
                        </p>

                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Location</span>
                                <span className="info-value">{data.location || 'Remote'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Role</span>
                                <span className="info-value">{data.title || 'Developer'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <span className="info-value">{data.email || 'hello@example.com'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-side">
                        {data.about?.interests?.length > 0 && (
                            <div className="tag-group">
                                <h3 className="tag-title">Interests</h3>
                                <div className="tags">
                                    {data.about.interests.map((interest, i) => (
                                        <span key={i} className="tag">{interest}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.about?.values?.length > 0 && (
                            <div className="tag-group">
                                <h3 className="tag-title">Values</h3>
                                <div className="tags">
                                    {data.about.values.map((value, i) => (
                                        <span key={i} className="tag tag-accent">{value}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .about {
                    padding: 4rem 0;
                }

                .about-content {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 3rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .story {
                    font-size: 1rem;
                    color: var(--color-text-secondary);
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .info-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .info-item {
                    display: flex;
                    gap: 1rem;
                }

                .info-label {
                    font-size: 0.8125rem;
                    color: var(--color-text-muted);
                    min-width: 70px;
                }

                .info-value {
                    font-size: 0.875rem;
                    color: var(--color-text-primary);
                }

                .tag-group {
                    margin-bottom: 1.5rem;
                }

                .tag-title {
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: var(--color-text-muted);
                    margin-bottom: 0.75rem;
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tag {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.8125rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    color: var(--color-text-secondary);
                }

                .tag-accent {
                    background-color: var(--color-accent);
                    border-color: var(--color-accent);
                    color: var(--color-bg);
                }

                @media (max-width: 768px) {
                    .about-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>
        </section>
    )
}
