'use client'

const services = [
    {
        id: 1,
        title: 'Full Stack Development',
        icon: '💻',
        description: 'Building complete web applications from database to user interface with modern technologies.',
        highlights: ['React/Next.js', 'Node.js', 'MongoDB', 'REST APIs']
    },
    {
        id: 2,
        title: 'Frontend Engineering',
        icon: '🎨',
        description: 'Crafting responsive, performant, and accessible user interfaces that delight users.',
        highlights: ['Components', 'State Management', 'Animations', 'Performance']
    },
    {
        id: 3,
        title: 'API Development',
        icon: '🔌',
        description: 'Designing and implementing robust, scalable backend services and APIs.',
        highlights: ['RESTful Design', 'Authentication', 'Database', 'Docs']
    },
    {
        id: 4,
        title: 'Problem Solving',
        icon: '🧩',
        description: 'Breaking down complex challenges into elegant, maintainable solutions.',
        highlights: ['Clean Code', 'Best Practices', 'Reviews', 'Debugging']
    }
]

export default function WhatIDo() {
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
                    What I Do
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Transforming ideas into reality through code
                </p>
            </div>

            {/* Services Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--spacing-lg)',
                alignItems: 'stretch'
            }}>
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className="card"
                        style={{
                            padding: 'var(--spacing-xl)',
                            animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {service.icon}
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            marginBottom: 'var(--spacing-sm)',
                            color: 'var(--color-text-primary)'
                        }}>
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.925rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            {service.description}
                        </p>

                        {/* Highlights */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-xs)',
                            marginTop: 'auto'
                        }}>
                            {service.highlights.map((highlight, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '0.25rem 0.6rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        backgroundColor: 'var(--color-bg)',
                                        color: 'var(--color-text-secondary)',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile responsive styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: repeat(2"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    )
}
