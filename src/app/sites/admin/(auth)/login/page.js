'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                // Redirection should be to the root of the subdomain
                // In Next.js with subdomains, '/' will point to the admin root
                router.push('/');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: 'var(--spacing-md)'
        }}>
            <div className="card animate-scale-in" style={{ width: '100%', maxWidth: '400px', padding: 'var(--spacing-xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: 'var(--spacing-xs)' }}>
                        Admin Login
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                        Please enter your credentials to continue
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: 'var(--spacing-sm)',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem',
                        marginBottom: 'var(--spacing-md)',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg)',
                                color: 'var(--color-text-primary)',
                                fontFamily: 'inherit',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg)',
                                color: 'var(--color-text-primary)',
                                fontFamily: 'inherit',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        className={`button ${loading ? 'loading' : ''}`}
                        type="submit"
                        disabled={loading}
                        style={{ marginTop: 'var(--spacing-md)' }}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }} onClick={(e) => e.preventDefault()}>
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
}
