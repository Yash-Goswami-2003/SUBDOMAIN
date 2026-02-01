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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
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
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Admin</h1>
                    <p>Enter your credentials to continue</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>

            <style jsx>{`
                .login-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 1rem;
                    background-color: var(--color-bg);
                }

                .login-card {
                    width: 100%;
                    max-width: 360px;
                    padding: 2rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .login-header h1 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }

                .login-header p {
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                }

                .error-message {
                    padding: 0.75rem;
                    background-color: #fef2f2;
                    border: 1px solid #fecaca;
                    color: #dc2626;
                    border-radius: var(--radius-sm);
                    font-size: 0.8125rem;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.375rem;
                }

                .form-group label {
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: var(--color-text-secondary);
                }

                .form-group input {
                    padding: 0.625rem 0.75rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    background-color: var(--color-bg);
                    color: var(--color-text-primary);
                    font-size: 0.875rem;
                    font-family: inherit;
                    outline: none;
                    transition: border-color var(--transition-fast);
                }

                .form-group input:focus {
                    border-color: var(--color-text-muted);
                }

                .login-button {
                    margin-top: 0.5rem;
                    padding: 0.75rem;
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: opacity var(--transition-fast);
                }

                .login-button:hover {
                    opacity: 0.9;
                }

                .login-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}
