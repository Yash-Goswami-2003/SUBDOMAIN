'use client'

import { useEffect, useState, useRef } from 'react'

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        let startTime
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }, [isVisible, end, duration])

    return (
        <span ref={countRef}>
            {count}{suffix}
        </span>
    )
}

// Simple monochrome icons as SVG
const icons = {
    clock: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    rocket: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    zap: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    target: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    )
}

export default function QuickStats({ data }) {
    const stats = [
        {
            value: data.experience,
            suffix: '+',
            label: data.experienceUnit,
            icon: icons.clock
        },
        {
            value: data.projects?.length || 5,
            suffix: '+',
            label: 'Projects Built',
            icon: icons.rocket
        },
        {
            value: data.skills?.length || 15,
            suffix: '+',
            label: 'Technologies',
            icon: icons.zap
        },
        {
            value: 100,
            suffix: '%',
            label: 'Commitment',
            icon: icons.target
        }
    ]

    return (
        <section className="container" style={{
            padding: 'var(--spacing-xl) 0',
            marginTop: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-xl)'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--spacing-lg)'
            }}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            textAlign: 'center',
                            padding: 'var(--spacing-xl) var(--spacing-lg)',
                            animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 'var(--spacing-md)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {stat.icon}
                        </div>

                        {/* Number */}
                        <div style={{
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            fontWeight: '800',
                            color: 'var(--color-text-primary)',
                            lineHeight: 1.2
                        }}>
                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>

                        {/* Label */}
                        <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-secondary)',
                            marginTop: 'var(--spacing-sm)',
                            fontWeight: '500'
                        }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile responsive styles */}
            <style jsx>{`
                @media (max-width: 900px) {
                    div[style*="grid-template-columns: repeat(4"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 500px) {
                    div[style*="grid-template-columns: repeat(4"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    )
}
