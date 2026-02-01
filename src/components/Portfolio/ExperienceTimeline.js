'use client'

export default function ExperienceTimeline({ experiences }) {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey</p>
        </div>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div className="experience-role">
                  <h3 className="position">{exp.position}</h3>
                  <span className="company">{exp.company}</span>
                </div>
                <span className="duration">{exp.duration}</span>
              </div>
              <span className="period">{exp.period}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .experience-section {
          padding: 3rem 0;
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .section-subtitle {
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .experience-item {
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .experience-item:first-child {
          padding-top: 0;
        }

        .experience-item:last-child {
          border-bottom: none;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.25rem;
        }

        .experience-role {
          display: flex;
          flex-direction: column;
        }

        .position {
          font-size: 1rem;
          font-weight: 600;
        }

        .company {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .duration {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          white-space: nowrap;
        }

        .period {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 480px) {
          .experience-header {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}
