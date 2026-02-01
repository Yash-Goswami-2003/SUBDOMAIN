'use client'

import { useState } from 'react'
import Footer from '@/components/Portfolio/Footer'

export default function ProjectsPageClient({ data }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend']

  const filteredProjects = activeFilter === 'All'
    ? data.projects
    : data.projects.filter(p => p.category === activeFilter)

  return (
    <main className="projects-page">
      <section className="projects-header">
        <div className="container">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            A collection of work I've built and contributed to.
          </p>
        </div>
      </section>

      <section className="filter-section">
        <div className="container">
          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-preview">
                  {project.featured && <span className="featured-tag">Featured</span>}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  <div className="tech-list">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button">
                      Demo
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button button-outline">
                      Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="empty-state">No projects found in this category.</p>
          )}
        </div>
      </section>

      <Footer data={data} />

      <style jsx>{`
        .projects-page {
          padding-top: 80px;
        }

        .projects-header {
          padding: 3rem 0;
          text-align: center;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: 1rem;
          color: var(--color-text-secondary);
        }

        .filter-section {
          padding: 1rem 0 2rem;
        }

        .filters {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8125rem;
          font-weight: 500;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--color-text-muted);
          color: var(--color-text-primary);
        }

        .filter-btn.active {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-bg);
        }

        .projects-grid-section {
          padding-bottom: 3rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .project-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--color-surface);
          transition: border-color var(--transition-fast);
        }

        .project-card:hover {
          border-color: var(--color-text-muted);
        }

        .project-preview {
          height: 160px;
          background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%);
          position: relative;
        }

        .featured-tag {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 0.25rem 0.5rem;
          background-color: var(--color-accent);
          color: var(--color-bg);
          border-radius: var(--radius-sm);
        }

        .project-content {
          padding: 1.25rem;
        }

        .project-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .project-desc {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          margin-bottom: 1rem;
        }

        .tech-tag {
          font-size: 0.6875rem;
          padding: 0.2rem 0.5rem;
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
        }

        .project-links {
          display: flex;
          gap: 0.5rem;
        }

        .project-links :global(.button) {
          flex: 1;
          padding: 0.5rem;
          font-size: 0.8125rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
