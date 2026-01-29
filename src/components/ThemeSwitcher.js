'use client';

import { useTheme } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';

export default function ThemeSwitcher() {
    const { themes, currentTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    transition: 'all var(--transition-fast)'
                }}
            >
                <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--color-accent)',
                    border: '1px solid var(--color-border)'
                }} />
                Theme
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-xs)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    minWidth: '150px',
                    zIndex: 100,
                    animation: 'slideDown 0.2s ease'
                }}>
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                setTheme(theme.id);
                                setIsOpen(false);
                            }}
                            style={{
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                textAlign: 'left',
                                borderRadius: 'var(--radius-sm)',
                                border: 'none',
                                backgroundColor: currentTheme === theme.id ? 'var(--color-surface)' : 'transparent',
                                color: 'var(--color-text-primary)',
                                fontSize: '0.75rem',
                                fontWeight: currentTheme === theme.id ? '700' : '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                            onMouseLeave={(e) => {
                                if (currentTheme !== theme.id) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <div style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                backgroundColor: theme.colors.accent,
                                border: '1px solid var(--color-border)'
                            }} />
                            {theme.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
