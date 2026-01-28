'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import strings from '@/data/config/strings.json';

export default function HeroSection({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = []
    const particleCount = 40

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.3 + 0.1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.fillStyle = `rgba(150, 150, 150, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw lines to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.strokeStyle = `rgba(150, 150, 150, ${0.05 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <section className="container" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-content {
            margin-top: -10vh;
          }
        }
      `}</style>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      />

      {/* Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px' }}>
        {/* Floating Badge */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div className="animate-float" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-xs) var(--spacing-md)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--color-text-secondary)'
          }}>
            <span className="animate-pulse" style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)'
            }} />
            This website is under development.
          </div>
        </div>

        {/* Main Heading */}
        <div className="animate-fade-in-up" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 5rem)',
            fontWeight: '900',
            letterSpacing: '-0.04em',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-primary)'
          }}>
            {data.name}
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {data.bio}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex" style={{
          justifyContent: 'center',
          marginTop: 'var(--spacing-xl)',
          animation: 'fadeInUp 0.6s ease 0.3s both'
        }}>
          <Link href="/projects" className="button button-magnetic hover-scale">
            View My Work
          </Link>
          <Link
            href="/contact"
            className="button hover-scale"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)'
            }}
          >
            Get In Touch
          </Link>
        </div>
      </div>


    </section>
  )
}

