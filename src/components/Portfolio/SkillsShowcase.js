'use client'

import { useState, useEffect, useRef } from 'react'

export default function SkillsShowcase({ skills }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [visibleSkills, setVisibleSkills] = useState({})
  const skillsRef = useRef({})

  const categories = [...new Set(skills.map(s => s.category))]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillName = entry.target.dataset.skill
          setVisibleSkills((prev) => ({
            ...prev,
            [skillName]: true
          }))
        }
      })
    }, { threshold: 0.1 })

    Object.values(skillsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="container" style={{ py: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div className="flex" style={{ alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-bg)'
            }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Skills & Expertise</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Technologies and tools I work with</p>
        </div>

        {/* Skills Grid by Category */}
        <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category)
            return (
              <div key={category}>
                {/* Category Header */}
                <div style={{ marginBottom: 'var(--spacing-md)', borderLeft: '4px solid var(--color-accent)', paddingLeft: 'var(--spacing-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{category}</h3>
                </div>

                {/* Skills Grid */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  {categorySkills.map((skill, idx) => (
                    <div
                      key={idx}
                      ref={(el) => skillsRef.current[skill.name] = el}
                      data-skill={skill.name}
                      className="card"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        opacity: visibleSkills[skill.name] ? 1 : 0,
                        transform: visibleSkills[skill.name] ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                      }}
                    >
                      <h4 style={{ fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>{skill.name}</h4>

                      <div style={{ marginTop: 'auto' }}>
                        <div className="flex" style={{ justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)' }}>
                          <span>Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <div style={{ height: '4px', backgroundColor: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: visibleSkills[skill.name] ? `${skill.proficiency}%` : '0%',
                            backgroundColor: 'var(--color-accent)',
                            transition: 'width 1s ease-out'
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div style={{
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-xl)',
          borderTop: '1px solid var(--color-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          textAlign: 'center',
          gap: 'var(--spacing-md)'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{skills.length}</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Total Skills</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{categories.length}</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Categories</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>100%</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Commitment</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>∞</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Learning</div>
          </div>
        </div>
      </div>
    </section>
  )
}

