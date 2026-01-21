'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: 'var(--spacing-sm)' }}>Yash Goswami</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Full Stack Developer crafting digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.1em' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--spacing-xs)' }}>
              {['Experience', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)', letterSpacing: '0.1em' }}>Connect</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>
              Open for collaborations or just a friendly hello.
            </p>
            <button style={{ color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.875rem' }}>
              Send an email →
            </button>
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
            © {currentYear} Yash Goswami. All rights reserved.
          </div>
          <div style={{ fontStyle: 'italic' }}>
            Built with 🖤 using Next.js & Vanilla CSS
          </div>
        </div>
      </div>
    </footer>
  )
}

