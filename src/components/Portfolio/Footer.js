'use client'

import Link from 'next/link'
import { portfolioData } from '@/data/portfolio'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' }
  ]

  const socialLinks = [
    { name: 'GitHub', url: portfolioData.social.github },
    { name: 'LinkedIn', url: portfolioData.social.linkedin },
    { name: 'Twitter', url: portfolioData.social.twitter }
  ]

  return (
    <footer className="container" style={{
      py: 'var(--spacing-lg)',
      paddingTop: 'var(--spacing-xl)',
      paddingBottom: 'var(--spacing-xl)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'var(--spacing-xl)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-xl)',
          paddingBottom: 'var(--spacing-xl)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: 'var(--spacing-sm)' }}>
              {portfolioData.name}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
              {portfolioData.title} crafting digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.1em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--spacing-xs)' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover-scale"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      display: 'inline-block',
                      transition: 'color var(--transition-fast), transform var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.1em' }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-scale"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast), transform var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                >
                  {social.name} →
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-md)',
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)'
        }}>
          <div>
            © {currentYear} {portfolioData.name}. All rights reserved.
          </div>
          <div style={{ fontStyle: 'italic' }}>
            Built with 🖤 using Next.js & Vanilla CSS
          </div>
        </div>
      </div>
    </footer>
  )
}

