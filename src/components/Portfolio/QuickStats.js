'use client'

export default function QuickStats({ data }) {
    if (!data) return null;

    const stats = [
        { value: `${data.experience || 0}+`, label: 'Years Experience' },
        { value: `${data.projects?.length || 0}+`, label: 'Projects' },
        { value: `${data.skills?.length || 0}+`, label: 'Technologies' }
    ];

    return (
        <section className="stats">
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .stats {
                    padding: 2rem 0;
                    border-top: 1px solid var(--color-border);
                    border-bottom: 1px solid var(--color-border);
                }

                .stats-grid {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-value {
                    display: block;
                    font-size: 2rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.8125rem;
                    color: var(--color-text-muted);
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        gap: 2rem;
                    }

                    .stat-value {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </section>
    )
}
