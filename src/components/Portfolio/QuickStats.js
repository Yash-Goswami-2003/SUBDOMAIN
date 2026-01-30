'use client'

export default function QuickStats({ data }) {
    if (!data) return null;

    // Calculate stats from the transformed data object
    const stats = [
        {
            value: `${data.experience || 0}+`,
            label: data.experienceUnit || 'Years',
            sublabel: 'Experience'
        },
        {
            value: `${data.projects?.length || 0}+`,
            label: 'Projects',
            sublabel: 'Completed'
        },
        {
            value: `${data.skills?.length || 0}+`,
            label: 'Technologies',
            sublabel: 'Mastered'
        }
    ];

    return (
        <section className="container" style={{
            padding: 'var(--spacing-xl) 0'
        }}>
            <div className="grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--spacing-lg)',
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="card hover-lift animate-fade-in-up"
                        style={{
                            textAlign: 'center',
                            padding: 'var(--spacing-lg)',
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <div style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: '900',
                            color: 'var(--color-accent)',
                            lineHeight: 1,
                            marginBottom: 'var(--spacing-sm)'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-xs)'
                        }}>
                            {stat.label}
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {stat.sublabel}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
