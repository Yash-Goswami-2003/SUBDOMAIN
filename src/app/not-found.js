'use client';

import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function NotFound() {

    const handleMainSiteNavigation = (e) => {
        e.preventDefault();
        const currentHost = window.location.host;
        // Remove "blogs." or "random." or "www."
        // Actually, we want to go to the root domain.
        // Logic: take the last two parts if length > 2? Or just strip the first part if it is a subdomain?
        // Let's use the same logic as BlogHeader: strip the first part if it's a subdomain 
        // OR just stripping everything before the domain name if we knew it?
        // Robust way: 
        // localhost:3000 -> localhost:3000
        // blogs.localhost:3000 -> localhost:3000
        // random.blogs.localhost:3000 -> localhost:3000 ??
        // standard: strip the subdomain.

        // Simple logic: remove the first segment if it looks like a subdomain. 
        // But wait, the user wants "main website page".
        // If I am at "abc.yashgoswami.com", main is "yashgoswami.com".
        // If I am at "abc.localhost:3000", main is "localhost:3000".

        let mainHost = currentHost;
        const parts = currentHost.split('.');

        if (parts.length > 2 || (parts.length === 2 && parts[1].includes('localhost'))) {
            // e.g. [blogs, yashgoswami, com] -> [yashgoswami, com]
            // e.g. [blogs, localhost:3000] -> [localhost:3000]
            // We generally want to keep the LAST TWO parts for standard domains, 
            // or LAST ONE part for localhost? No, localhost is "localhost:port".

            if (currentHost.includes('localhost')) {
                mainHost = 'localhost:' + currentHost.split(':')[1];
            } else {
                // Production: assume domain.com
                // This might break for co.uk but for yashgoswami.com it works.
                // Safer to just strip the first part? "blogs.yashgoswami.com" -> "yashgoswami.com"
                // "blogs2.yashgoswami.com" -> "yashgoswami.com"
                // "yashgoswami.com" -> "yashgoswami.com"

                // Let's basically look for the base domain.
                // Given the context `yashgoswami.com`, we can hardcode it or derive it.
                // Let's derive it by stripping the subdomain.
                if (parts.length > 2) {
                    mainHost = parts.slice(1).join('.');
                }
            }
        }

        const protocol = window.location.protocol;
        window.location.href = `${protocol}//${mainHost}`;
    };

    const handleBlogsNavigation = (e) => {
        e.preventDefault();
        // Navigate to blogs.domain.com
        const currentHost = window.location.host;
        let domain = currentHost;

        if (currentHost.includes('localhost')) {
            domain = 'localhost:' + currentHost.split(':')[1];
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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>

            {/* 
          Custom Simplified Header for 404 
          - Only "YG" Icon (links to main site)
          - ThemeSwitcher
          - NO Nav links
      */}
            <header style={{
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Logo */}
                <a
                    href="#"
                    onClick={handleMainSiteNavigation}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        color: 'var(--color-text-primary)',
                        textDecoration: 'none',
                        cursor: 'pointer'
                    }}
                >
                    YG
                </a>

                <ThemeSwitcher />
            </header>

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px'
            }}>
                <h1 style={{
                    fontSize: 'clamp(6rem, 15vw, 10rem)',
                    fontWeight: '900',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                    marginBottom: 'var(--spacing-md)',
                    opacity: 0.05
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '700',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    Page Not Found
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '500px',
                    marginBottom: 'var(--spacing-xl)',
                    lineHeight: 1.6
                }}>
                    The page or subdomain you are looking for does not exist or has been moved.
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a
                        href="#"
                        onClick={handleMainSiteNavigation}
                        className="button button-magnetic hover-scale"
                        style={{
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            backgroundColor: 'var(--color-text-primary)',
                            color: 'var(--color-bg)',
                            borderRadius: '8px',
                            fontWeight: '600'
                        }}
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    )
}
