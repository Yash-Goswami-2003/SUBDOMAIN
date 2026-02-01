'use client'

const services = [
    { title: 'Full Stack Development', desc: 'Building complete web applications from database to UI' },
    { title: 'Frontend Engineering', desc: 'Crafting responsive, performant user interfaces' },
    { title: 'API Development', desc: 'Designing scalable backend services' },
    { title: 'Problem Solving', desc: 'Breaking down complex challenges into solutions' }
]

export default function WhatIDo() {
    return (
        <section className="whatido-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">What I Do</h2>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .whatido-section {
                    padding: 2.5rem 0;
                }

                .section-header {
                    margin-bottom: 1.25rem;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .service-item {
                    padding: 1rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                }

                .service-title {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }

                .service-desc {
                    font-size: 0.8125rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                }

                @media (max-width: 640px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    )
}
