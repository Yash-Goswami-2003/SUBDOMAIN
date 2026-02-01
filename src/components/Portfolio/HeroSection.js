'use client'

import Link from 'next/link'

export default function HeroSection({ data }) {
  if (!data) return null;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="status">Available for work</span>

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
      </div>

      <style jsx>{`
        .hero {
          min-height: 85vh;
          display: flex;
          align-items: center;
        }

        .container {
          width: 100%;
          display: flex;
          justify-content: flex-start;
        }

        .hero-content {
          max-width: 600px;
          text-align: left;
          margin-left: 0;
          margin-right: auto;
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

        @media (max-width: 768px) {
          .hero {
            min-height: 70vh;
          }

          .container {
            justify-content: center;
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
