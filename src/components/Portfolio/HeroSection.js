'use client'

import Link from 'next/link'

export default function HeroSection({ data }) {
  if (!data) return null;

  return (
    <section className="container animate-fade-in-up" style={{
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      marginBottom: 'var(--spacing-xl)'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Subtle Dot Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', padding: '0 var(--spacing-md)' }}>
        {/* Status Badge */}
        <div className="animate-fade-in" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--spacing-lg)',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Site is under development.</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          fontWeight: '900',
          letterSpacing: '-0.04em',
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)'
        }}>
          {data.name || 'Your Name'}
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {data.bio || 'Your bio description'}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex" style={{
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
        marginTop: 'var(--spacing-xl)',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap'
      }}>
        <Link href="/projects" className="button hover-scale">
          View My Work
        </Link>
        <Link href="/contact" className="button hover-scale" style={{
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)'
        }}>
          Get In Touch
        </Link>
      </div>
    </section>
  )
}
