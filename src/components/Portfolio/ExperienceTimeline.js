'use client'

import { useEffect, useRef, useState } from 'react'

export default function ExperienceTimeline({ experiences }) {
  const [visibleItems, setVisibleItems] = useState({})
  const itemsRef = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, { threshold: 0.3 })

    Object.values(itemsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="container"
      style={{
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 0a2 2 0 100 4m0-4a2 2 0 110 4" />
              </svg>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '800' }}>Experience</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '500px' }}>My professional journey and growth</p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '15px',
            top: '0',
            bottom: '0',
            width: '1px',
            backgroundColor: 'var(--color-border)',
            zIndex: 0
          }} />

          <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => itemsRef.current[index] = el}
                id={`experience-${index}`}
                style={{
                  position: 'relative',
                  paddingLeft: '50px',
                  opacity: visibleItems[`experience-${index}`] ? 1 : 0,
                  transform: visibleItems[`experience-${index}`] ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  zIndex: 1
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '5px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-bg)',
                  border: '2px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
                </div>

                {/* Card */}
                <div className="card hover-lift" style={{ padding: 'var(--spacing-md)', transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)' }}>
                  <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 'var(--spacing-sm)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{exp.position}</h3>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{exp.company}</div>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      padding: 'var(--spacing-xs) var(--spacing-sm)',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '500'
                    }}>
                      {exp.duration}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                    {exp.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

