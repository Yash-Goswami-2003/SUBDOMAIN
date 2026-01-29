'use client';

import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function BlogHeader() {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '16px 0',
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        const currentHost = window.location.host; // e.g., blogs.localhost:3000
                        const mainHost = currentHost.replace('blogs.', ''); // e.g., localhost:3000
                        const protocol = window.location.protocol; // e.g., http:
                        window.location.href = `${protocol}//${mainHost}`;
                    }}
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        color: 'var(--color-text-primary)',
                        transition: 'color var(--transition-fast)',
                        textDecoration: 'none'
                    }}
                >
                    YG
                </a>

                {/* Theme Switcher Only */}
                <ThemeSwitcher />
            </div>
        </header>
    );
}
