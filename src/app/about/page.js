import ExperienceTimeline from '@/components/Portfolio/ExperienceTimeline'
import SkillsShowcase from '@/components/Portfolio/SkillsShowcase'
import WhatIDo from '@/components/Portfolio/WhatIDo'
import Footer from '@/components/Portfolio/Footer'
import { getPortfolioConfig } from '@/lib/portfolioConfig'

export const dynamic = 'force-dynamic'

export default async function About() {
    const data = await getPortfolioConfig()

    return (
        <main style={{ paddingTop: '80px' }}>
            {/* Centered About Hero */}
            <section className="container" style={{
                padding: '3rem 0 2rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem'
                }}>About Me</h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '560px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                }}>{data.about.story}</p>
            </section>

            <ExperienceTimeline experiences={data.experienceDetails} />
            <SkillsShowcase skills={data.skills} />
            <WhatIDo />

            {/* Interests & Values - Compact Tags */}
            <section className="container" style={{ padding: '2rem 0 3rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <h3 style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.75rem'
                        }}>Interests</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {data.about.interests.map((interest, index) => (
                                <span key={index} style={{
                                    padding: '0.375rem 0.625rem',
                                    fontSize: '0.8125rem',
                                    backgroundColor: 'var(--color-bg)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-text-primary)'
                                }}>{interest}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <h3 style={{
                            fontSize: '0.6875rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.75rem'
                        }}>Core Values</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {data.about.values.map((value, index) => (
                                <span key={index} style={{
                                    padding: '0.375rem 0.625rem',
                                    fontSize: '0.8125rem',
                                    backgroundColor: 'var(--color-bg)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--color-text-primary)'
                                }}>{value}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer data={data} />
        </main>
    )
}
