'use client'

export default function SkillsShowcase({ skills }) {
  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <section className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills & Expertise</h2>
        </div>

        <div className="skills-container">
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category)
            return (
              <div key={category} className="category-block">
                <h3 className="category-label">{category}</h3>
                <div className="skills-grid">
                  {categorySkills.map((skill, idx) => (
                    <span key={idx} className="skill-chip">{skill.name}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          padding: 2.5rem 0;
        }

        .section-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .category-block {
          padding: 1rem;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          borderRadius: var(--radius-md);
        }

        .category-label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .skill-chip {
          padding: 0.25rem 0.625rem;
          font-size: 0.75rem;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          color: var(--color-text-primary);
        }

        @media (max-width: 480px) {
          .skills-container {
            grid-template-columns: 1fr;
          }
           .section-header {
            text-align: left;
          }
        }
      `}</style>
    </section>
  )
}
