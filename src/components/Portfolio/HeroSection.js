'use client'

import Link from 'next/link'
import VSCodeWindow from './VSCodeWindow'

export default function HeroSection({ data }) {
  if (!data) return null;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="status">Currently under development.</span>

            <h1 className="title">
              {data.name || 'Your Name'}
            </h1>

            <p className="bio">
              {data.bio || 'Software engineer crafting clean, functional digital experiences.'}
            </p>

            <div className="actions">
              <Link href="/projects" className="button">
                View Work
              </Link>
              <Link href="/contact" className="button button-outline">
                Contact
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <VSCodeWindow data={data} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 85vh;
          display: flex;
          align-items: center;
        }

        .container {
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
          text-align: left;
        }

        .hero-visual {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .status {
          display: inline-block;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        .title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .bio {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-content {
            order: 1;
          }

          .hero-visual {
            order: 2;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: 4rem 0;
          }

          .hero-content {
            margin: 0 auto;
            text-align: center;
          }

          .actions {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
