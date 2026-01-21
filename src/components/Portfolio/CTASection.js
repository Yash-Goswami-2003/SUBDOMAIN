'use client'

export default function CTASection() {
  return (
    <section className="container" style={{
      position: 'relative',
      py: 'var(--spacing-xl)',
      paddingBottom: 'var(--spacing-xl)',
      overflow: 'hidden',
      backgroundColor: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: 'var(--spacing-md)' }}>
          Let's Build Something Amazing
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: 'var(--spacing-xl)', maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>
          I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to chat about tech, feel free to reach out!
        </p>

        <div className="flex" style={{ justifyContent: 'center', gap: 'var(--spacing-md)' }}>
          <button className="button">
            Get In Touch
          </button>
          <button className="button" style={{
            backgroundColor: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)'
          }}>
            Download Resume
          </button>
        </div>

        {/* Contact Info */}
        <div style={{
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-xl)',
          borderTop: '1px solid var(--color-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-lg)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 'var(--spacing-xs)' }}>Email</div>
            <a href="mailto:yash@example.com" style={{ fontWeight: '700', fontSize: '1.125rem' }}>
              yash@example.com
            </a>
          </div>

          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 'var(--spacing-xs)' }}>Location</div>
            <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>India</div>
          </div>

          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 'var(--spacing-xs)' }}>Availability</div>
            <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>Open for Work</div>
          </div>
        </div>
      </div>
    </section>
  )
}

