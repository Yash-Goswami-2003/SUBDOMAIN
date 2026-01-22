'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ]

    return (
        <nav
            className="navbar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: 'var(--spacing-md) 0',
                transition: 'all var(--transition-base)',
                backgroundColor: isScrolled ? 'var(--color-bg-glass)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
            }}
        >
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo/Name */}
                <Link href="/" style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                    transition: 'color var(--transition-fast)'
                }}>
                    YG
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links" style={{
                    display: 'flex',
                    gap: 'var(--spacing-xl)',
                    alignItems: 'center'
                }}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="nav-link"
                                style={{
                                    position: 'relative',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? '600' : '500',
                                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                    transition: 'color var(--transition-fast)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {link.label}
                                {isActive && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        backgroundColor: 'var(--color-accent)',
                                        borderRadius: '2px'
                                    }} />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: 'var(--spacing-sm)',
                        cursor: 'pointer'
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--color-text-primary)',
                        transition: 'all var(--transition-fast)',
                        transform: isMobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
                    }} />
                    <span style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--color-text-primary)',
                        transition: 'all var(--transition-fast)',
                        opacity: isMobileMenuOpen ? 0 : 1
                    }} />
                    <span style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--color-text-primary)',
                        transition: 'all var(--transition-fast)',
                        transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
                    }} />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-bg)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: 'var(--spacing-lg)',
                    animation: 'slideDown 0.3s ease'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)'
                    }}>
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        padding: 'var(--spacing-sm)',
                                        fontSize: '1rem',
                                        fontWeight: isActive ? '600' : '500',
                                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                        borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
                                        paddingLeft: 'var(--spacing-md)',
                                        transition: 'all var(--transition-fast)',
                                        animation: `fadeInStagger 0.3s ease ${index * 0.1}s both`
                                    }}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </nav>
    )
}
