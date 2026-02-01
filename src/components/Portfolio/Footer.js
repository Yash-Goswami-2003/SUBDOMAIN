'use client'

import Link from 'next/link'

export default function Footer({ data }) {
  const currentYear = new Date().getFullYear()
  if (!data) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' }
  ]

  const socialLinks = [
    { name: 'GitHub', url: data.social?.github || '#' },
    { name: 'LinkedIn', url: data.social?.linkedin || '#' }
  ]

  return (
    <footer className="footer-root">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3 className="footer-name">{data.name}</h3>
            <p className="footer-summary">{data.title} crafting digital experiences.</p>
          </div>

          <div className="footer-nav">
            <div className="nav-group">
              <span className="group-label">Pages</span>
              <div className="tag-links">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-tag-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="nav-group">
              <span className="group-label">Connect</span>
              <div className="tag-links">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="footer-tag-link">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <span>© {currentYear} {data.name}</span>
          <span className="footer-divider">•</span>
          <span>Built with Next.js</span>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          padding: 3rem 0 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-bg);
        }

        .footer-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .footer-name {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .footer-summary {
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          max-width: 200px;
          line-height: 1.5;
        }

        .footer-nav {
          display: flex;
          gap: 3rem;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .group-label {
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
        }

        .tag-links {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .footer-tag-link {
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-tag-link:hover {
          color: var(--color-text-primary);
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }

        .footer-divider {
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2.5rem;
          }

          .footer-summary {
            max-width: 100%;
          }

          .footer-nav {
            width: 100%;
            justify-content: space-evenly;
            gap: 4rem;
          }

          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}
