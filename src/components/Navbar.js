'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ]

    return (
        <nav className="navbar-root">
            <div className="navbar-main">
                <div className="container nav-container">
                    <Link href="/" className="logo">YG</Link>

                    <div className="nav-content">
                        <div className="desktop-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="nav-actions">
                            <ThemeSwitcher />
                            <button
                                className="mobile-toggle"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-dropdown">
                    <div className="container mobile-links">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`mobile-link ${pathname === link.href ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                .navbar-root {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background-color: var(--color-bg);
                    border-bottom: 1px solid var(--color-border);
                }

                .navbar-main {
                    height: 56px;
                    display: flex;
                    align-items: center;
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .logo {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    text-decoration: none;
                }

                .nav-content {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .desktop-links {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .nav-link {
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                }

                .nav-link:hover,
                .nav-link.active {
                    color: var(--color-text-primary);
                }

                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    color: var(--color-text-primary);
                    padding: 0.25rem;
                    cursor: pointer;
                    line-height: 1;
                }

                .mobile-dropdown {
                    display: none;
                    background-color: var(--color-bg);
                    border-top: 1px solid var(--color-border);
                    padding: 1.5rem 0 2rem;
                    animation: slideDown 0.2s ease;
                }

                .mobile-links {
                    display: flex;
                    flex-direction: column;
                    padding: 0 1.5rem;
                    gap: 1.25rem; /* Explicit gap between items */
                }

                .mobile-link {
                    display: block;
                    font-size: 1.125rem;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    transition: color var(--transition-fast);
                    padding: 0.25rem 0;
                }

                .mobile-link.active {
                    color: var(--color-text-primary);
                    font-weight: 600;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .desktop-links {
                        display: none;
                    }

                    .mobile-toggle {
                        display: block;
                    }

                    .mobile-dropdown {
                        display: block;
                    }

                    .nav-content {
                        gap: 1rem;
                    }
                }
            `}</style>
        </nav>
    )
}
