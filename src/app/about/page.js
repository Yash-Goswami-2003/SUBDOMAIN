import ExperienceTimeline from '@/components/Portfolio/ExperienceTimeline'
import SkillsShowcase from '@/components/Portfolio/SkillsShowcase'
import Footer from '@/components/Portfolio/Footer'
import { getPortfolioConfig } from '@/lib/portfolioConfig'

export const dynamic = 'force-static'

export default async function About() {
    const data = await getPortfolioConfig()

    return (
        <main className="page-transition">
            {/* About Hero */}
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
                    fontSize: 'clamp(2rem, 7vw, 3rem)',
                    fontWeight: '900',
                    letterSpacing: '-0.03em',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-text-primary)'
                }}>
                    About Me
                </h1>
                <p style={{
                    fontSize: '1.05rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '680px',
                    lineHeight: '1.6',
                    margin: '0 auto'
                }}>
                    {data.about.story}
                </p>
            </section>

            {/* Experience Timeline */}
            <section style={{ padding: 'var(--spacing-xl) 0' }}>
                <ExperienceTimeline experiences={data.experienceDetails} />
            </section>

            {/* Skills Showcase */}
            <section style={{ padding: 'var(--spacing-xl) 0' }}>
                <SkillsShowcase skills={data.skills} />
            </section>

            {/* Interests & Values */}
            <section className="container" style={{
                padding: 'var(--spacing-xl) 0',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div className="grid" style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-xl)'
                }}>
                    {/* Interests */}
                    <div className="card hover-lift" style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--color-text-primary)'
                        }}>
                            Interests
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-sm)'
                        }}>
                            {data.about.interests.map((interest, index) => (
                                <li key={index} style={{
                                    fontSize: '1rem',
                                    color: 'var(--color-text-secondary)',
                                    paddingLeft: 'var(--spacing-md)',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: 0,
                                        content: '→',
                                        color: 'var(--color-accent)'
                                    }}>→</span>
                                    {interest}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Values */}
                    <div className="card hover-lift" style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--color-text-primary)'
                        }}>
                            Core Values
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-sm)'
                        }}>
                            {data.about.values.map((value, index) => (
                                <li key={index} style={{
                                    fontSize: '1rem',
                                    color: 'var(--color-text-secondary)',
                                    paddingLeft: 'var(--spacing-md)',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: 0,
                                        content: '→',
                                        color: 'var(--color-accent)'
                                    }}>→</span>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer data={data} />
        </main>
    )
}
