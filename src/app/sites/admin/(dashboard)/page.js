'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// SVG Icons as components for a clean look
const Icons = {
    Dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    ),
    Projects: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
    ),
    Skills: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
    ),
    Settings: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    ),
    Logout: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
    ),
    TrendUp: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
    )
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const NavItem = ({ icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(label)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: '0.875rem 1rem',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                color: activeTab === label ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                backgroundColor: activeTab === label ? 'rgba(var(--color-accent-rgb, 0, 0, 0), 0.05)' : 'transparent',
                border: activeTab === label ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                fontWeight: activeTab === label ? '600' : '400',
                marginBottom: '0.5rem'
            }}
            className="hover-lift"
        >
            <Icon />
            <span style={{ fontSize: '0.925rem' }}>{label}</span>
        </button>
    );

    const StatCard = ({ label, value, trend, delay }) => (
        <div className="card animate-fade-in-up" style={{ animationDelay: delay, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: '1' }}>{value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.8rem', fontWeight: '600', paddingBottom: '0.25rem' }}>
                    <Icons.TrendUp />
                    <span>{trend}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--color-border)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                height: '100vh',
                backgroundColor: 'var(--color-surface)',
                zIndex: 50
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
                        ADMIN<span style={{ color: 'var(--color-accent)' }}>.PANEL</span>
                    </h2>
                </div>

                <nav style={{ flex: 1 }}>
                    <NavItem icon={Icons.Dashboard} label="Overview" />
                    <NavItem icon={Icons.Projects} label="Projects" />
                    <NavItem icon={Icons.Skills} label="Skills" />
                    <NavItem icon={Icons.Settings} label="Settings" />
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        padding: '0.875rem 1rem',
                        width: '100%',
                        borderRadius: 'var(--radius-md)',
                        color: '#ef4444',
                        border: '1px solid transparent',
                        marginTop: '2rem'
                    }}
                    className="hover-lift"
                >
                    <Icons.Logout />
                    <span style={{ fontSize: '0.925rem', fontWeight: '600' }}>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>{activeTab}</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Welcome back, Yash! Here's what's happening today.</p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button className="button" style={{ borderRadius: 'var(--radius-md)', padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
                            Create New
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <StatCard label="Total Projects" value="14" trend="+2 this month" delay="0s" />
                    <StatCard label="Live Sites" value="3" trend="Stable" delay="0.1s" />
                    <StatCard label="Total Skills" value="28" trend="+4 new" delay="0.2s" />
                    <StatCard label="Visitor Count" value="1.2k" trend="+12%" delay="0.3s" />
                </div>

                {/* Dynamic Content Area */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="grid-cols-1-mobile">
                    {/* Main List */}
                    <section className="card" style={{ padding: '0' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Projects</h3>
                            <button style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: '600' }}>View All</button>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            {[
                                { name: 'Portfolio Site', status: 'Live', date: 'Oct 12' },
                                { name: 'Admin Dashboard', status: 'Building', date: 'Oct 15' },
                                { name: 'E-commerce UI', status: 'Completed', date: 'Oct 08' }
                            ].map((proj, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    borderBottom: i === 2 ? 'none' : '1px solid var(--color-border)'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{proj.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Modified {proj.date}</span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '20px',
                                        backgroundColor: proj.status === 'Live' ? '#dcfce7' : proj.status === 'Building' ? '#fef9c3' : '#f1f5f9',
                                        color: proj.status === 'Live' ? '#166534' : proj.status === 'Building' ? '#854d0e' : '#475569',
                                        alignSelf: 'center'
                                    }}>
                                        {proj.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Activity Sidebar */}
                    <section className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { action: 'Updated Skill: Next.js', time: '2h ago' },
                                { action: 'New login detected', time: '5h ago' },
                                { action: 'Deleted draft project', time: '1d ago' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-accent)',
                                        marginTop: '5px',
                                        flexShrink: 0
                                    }} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{item.action}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <style jsx>{`
        @media (max-width: 1024px) {
          aside {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
