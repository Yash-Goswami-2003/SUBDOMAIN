'use client';

import React from 'react';

export default function AuthorLinks() {
    const handleBlogsNavigation = (e) => {
        e.preventDefault();
        const currentHost = window.location.host;
        let domain = currentHost;

        if (currentHost.includes('localhost')) {
            const parts = currentHost.split(':');
            const hostname = parts[0];
            const port = parts[1] ? `:${parts[1]}` : '';
            const hostParts = hostname.split('.');
            let baseHost = hostname;
            if (hostParts.length > 1) {
                baseHost = hostParts[hostParts.length - 1];
            }
            domain = baseHost + port;
        } else {
            const parts = currentHost.split('.');
            if (parts.length > 2) {
                domain = parts.slice(1).join('.');
            }
        }

        const protocol = window.location.protocol;
        window.location.href = `${protocol}//blogs.${domain}`;
    };

    return (
        <div className="container" style={{ padding: '0 var(--spacing-md)' }}>
            <div
                className="card hover-lift"
                style={{
                    background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 100%)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-xl)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.03) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Icon */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </div>

                    {/* Headline */}
                    <h3 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: '800',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-sm)',
                        letterSpacing: '-0.02em'
                    }}>
                        Explore My Insights
                    </h3>

                    {/* Description */}
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto var(--spacing-lg)',
                        lineHeight: 1.7
                    }}>
                        I share my thoughts on software development, tech trends, and lessons learned from building products. Dive into the latest articles.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="#"
                        onClick={handleBlogsNavigation}
                        className="button button-magnetic hover-scale"
                        style={{
                            textDecoration: 'none',
                            padding: '14px 32px',
                            backgroundColor: 'var(--color-text-primary)',
                            color: 'var(--color-bg)',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'transform 0.2s ease',
                        }}
                    >
                        <span>Browse Blogs</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
