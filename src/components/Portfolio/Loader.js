'use client'

export default function Loader() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            gap: 'var(--spacing-xl)',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 50
        }}>
            {/* Orbital Animation Container */}
            <div style={{
                position: 'relative',
                width: '80px',
                height: '80px'
            }}>
                {/* Outer Orbit */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid var(--color-border)',
                }} />

                {/* Orbiting Dot 1 */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    animation: 'orbit 1.5s linear infinite'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        boxShadow: '0 0 20px var(--color-accent)'
                    }} />
                </div>

                {/* Orbiting Dot 2 */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    animation: 'orbit 1.5s linear infinite',
                    animationDelay: '-0.5s'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-text-secondary)',
                        opacity: 0.6
                    }} />
                </div>

                {/* Orbiting Dot 3 */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    animation: 'orbit 1.5s linear infinite',
                    animationDelay: '-1s'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-text-secondary)',
                        opacity: 0.3
                    }} />
                </div>

                {/* Center Pulsing Core */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    animation: 'pulse-glow 1.5s ease-in-out infinite'
                }} />
            </div>

            {/* Loading Text with Animated Dots */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
            }}>
                <span>Loading</span>
                <span style={{ animation: 'dot-bounce 1.4s infinite', animationDelay: '0s' }}>.</span>
                <span style={{ animation: 'dot-bounce 1.4s infinite', animationDelay: '0.2s' }}>.</span>
                <span style={{ animation: 'dot-bounce 1.4s infinite', animationDelay: '0.4s' }}>.</span>
            </div>

            <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }
        
        @keyframes dot-bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    )
}
