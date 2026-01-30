'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';

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
    ),
    Database: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    ),
    Close: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    ),
    Alert: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    )
};

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '450px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', border: '1px solid var(--color-border)', animation: 'slideUp 0.3s ease-out' }} className="animate-fade-in-up">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: '#fef2f2' }}>
                        <Icons.Alert />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{title}</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.5' }}>{message}</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'transparent', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={() => { onConfirm(); onClose(); }} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Confirm Restore</button>
                </div>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Configuration Tab State
    const [filterEditorValue, setFilterEditorValue] = useState('{\n  "documentType": "skill"\n}');
    const [method, setMethod] = useState('GET');
    const [editorValue, setEditorValue] = useState('[\n  \n]');
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

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

    const handleConfigSubmit = async () => {
        setStatus({ message: 'Processing...', type: 'info' });
        try {
            let filter;
            try {
                filter = JSON.parse(filterEditorValue);
            } catch (e) {
                throw new Error('Invalid Filter JSON format');
            }

            if (method === 'GET') {
                const res = await fetch(`/api/admin/documents?filter=${encodeURIComponent(JSON.stringify(filter))}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to fetch documents');
                }
                const data = await res.json();
                setEditorValue(JSON.stringify(data, null, 2));
                setStatus({ message: `Fetched ${data.length} documents matching the filter`, type: 'success' });
            } else {
                let documents;
                try {
                    documents = JSON.parse(editorValue);
                } catch (e) {
                    throw new Error('Invalid Editor JSON format');
                }

                const res = await fetch('/api/admin/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ documents, filter })
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to update documents');
                }
                const result = await res.json();
                setStatus({ message: result.message, type: 'success' });
            }
        } catch (error) {
            setStatus({ message: error.message, type: 'error' });
        }
    };

    const handleRestoreConfirm = async () => {
        setStatus({ message: 'Restoring...', type: 'info' });
        try {
            const res = await fetch('/api/admin/restore', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to restore configuration');
            const result = await res.json();
            setStatus({ message: result.message, type: 'success' });
            setEditorValue('[\n  \n]');
            setFilterEditorValue('{\n  "documentType": "skill"\n}');
        } catch (error) {
            setStatus({ message: error.message, type: 'error' });
        }
    };

    const handleTabChange = (label) => {
        setActiveTab(label);
        setIsMobileMenuOpen(false);
    };

    const NavItem = ({ icon: Icon, label, mobile = false }) => (
        <button
            onClick={() => handleTabChange(label)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: mobile ? '1rem 1.25rem' : '0.875rem 1rem',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                color: activeTab === label ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                backgroundColor: activeTab === label ? 'rgba(var(--color-accent-rgb, 0, 0, 0), 0.05)' : 'transparent',
                border: activeTab === label ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                fontWeight: activeTab === label ? '600' : '400',
                marginBottom: mobile ? '0.25rem' : '0.5rem',
                fontSize: mobile ? '1rem' : '0.925rem'
            }}
            className="hover-lift"
        >
            <Icon />
            <span>{label}</span>
        </button>
    );

    const StatCard = ({ label, value, trend, delay }) => (
        <div className="card stat-card animate-fade-in-up" style={{ animationDelay: delay, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: '1' }}>{value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>
                    <Icons.TrendUp />
                    <span>{trend}</span>
                </div>
            </div>
        </div>
    );

    // Hamburger Menu Icon
    const HamburgerIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    );

    return (
        <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
            <Modal
                isOpen={isRestoreModalOpen}
                onClose={() => setIsRestoreModalOpen(false)}
                onConfirm={handleRestoreConfirm}
                title="Restore to Default"
                message="Are you sure you want to proceed? This will clear all existing custom configurations and restore the website to its original default settings. This action cannot be undone."
            />

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 99,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className="mobile-drawer"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: isMobileMenuOpen ? 0 : '-280px',
                    width: '280px',
                    height: '100vh',
                    backgroundColor: 'var(--color-surface)',
                    zIndex: 100,
                    transition: 'left 0.3s ease',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid var(--color-border)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
                        ADMIN<span style={{ color: 'var(--color-accent)' }}>.PANEL</span>
                    </h2>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <Icons.Close />
                    </button>
                </div>

                <nav style={{ flex: 1 }}>
                    <NavItem icon={Icons.Dashboard} label="Overview" mobile />
                    <NavItem icon={Icons.Projects} label="Projects" mobile />
                    <NavItem icon={Icons.Skills} label="Skills" mobile />
                    <NavItem icon={Icons.Database} label="Configuration" mobile />
                    <NavItem icon={Icons.Settings} label="Settings" mobile />
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        padding: '1rem 1.25rem',
                        width: '100%',
                        borderRadius: 'var(--radius-md)',
                        color: '#ef4444',
                        border: '1px solid transparent',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    <Icons.Logout />
                    <span>Logout</span>
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="desktop-sidebar" style={{
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
                    <NavItem icon={Icons.Database} label="Configuration" />
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
                        marginTop: '2rem',
                        background: 'none',
                        cursor: 'pointer'
                    }}
                    className="hover-lift"
                >
                    <Icons.Logout />
                    <span style={{ fontSize: '0.925rem', fontWeight: '600' }}>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                {/* Mobile Header */}
                <header className="mobile-header" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0.5rem 0' }}>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        style={{ padding: '0.5rem', color: 'var(--color-text)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <HamburgerIcon />
                    </button>
                    <h2 style={{ fontSize: '1rem', fontWeight: '800' }}>
                        ADMIN<span style={{ color: 'var(--color-accent)' }}>.PANEL</span>
                    </h2>
                    <div style={{ width: '40px' }}></div>
                </header>

                {/* Desktop Header */}
                <header className="desktop-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{activeTab}</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Welcome back, Yash! Here's what's happening today.</p>
                    </div>
                </header>

                {activeTab === 'Overview' && (
                    <>
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            <StatCard label="Total Projects" value="14" trend="+2 this month" delay="0s" />
                            <StatCard label="Live Sites" value="3" trend="Stable" delay="0.1s" />
                            <StatCard label="Total Skills" value="28" trend="+4 new" delay="0.2s" />
                            <StatCard label="Visitor Count" value="1.2k" trend="+12%" delay="0.3s" />
                        </div>

                        <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                            <section className="card" style={{ padding: '0' }}>
                                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Recent Projects</h3>
                                    <button style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
                                </div>
                                <div style={{ padding: '0.75rem' }}>
                                    {[
                                        { name: 'Portfolio Site', status: 'Live', date: 'Oct 12' },
                                        { name: 'Admin Dashboard', status: 'Building', date: 'Oct 15' },
                                        { name: 'E-commerce UI', status: 'Completed', date: 'Oct 08' }
                                    ].map((proj, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem', borderRadius: 'var(--radius-sm)', borderBottom: i === 2 ? 'none' : '1px solid var(--color-border)' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{proj.name}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Modified {proj.date}</span>
                                            </div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '20px', backgroundColor: proj.status === 'Live' ? '#dcfce7' : proj.status === 'Building' ? '#fef9c3' : '#f1f5f9', color: proj.status === 'Live' ? '#166534' : proj.status === 'Building' ? '#854d0e' : '#475569' }}>{proj.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="card" style={{ padding: '1.25rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem' }}>Activity</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { action: 'Updated Skill: Next.js', time: '2h ago' },
                                        { action: 'New login detected', time: '5h ago' },
                                        { action: 'Deleted draft project', time: '1d ago' }
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', marginTop: '5px', flexShrink: 0 }} />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{item.action}</span>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {activeTab === 'Configuration' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Controls Bar */}
                        <div className="card" style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {/* Method Toggle */}
                            <div style={{ display: 'flex', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <button
                                    onClick={() => setMethod('GET')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontWeight: '600',
                                        fontSize: '0.8rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: method === 'GET' ? 'var(--color-accent)' : 'var(--color-surface)',
                                        color: method === 'GET' ? 'white' : 'var(--color-text-secondary)',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    GET
                                </button>
                                <button
                                    onClick={() => setMethod('POST')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontWeight: '600',
                                        fontSize: '0.8rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: method === 'POST' ? '#10b981' : 'var(--color-surface)',
                                        color: method === 'POST' ? 'white' : 'var(--color-text-secondary)',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    POST
                                </button>
                            </div>

                            <div style={{ flex: 1 }}></div>

                            {/* Action Buttons */}
                            <button
                                onClick={handleConfigSubmit}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    backgroundColor: method === 'GET' ? 'var(--color-accent)' : '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                {method === 'GET' ? '▶ Fetch' : '▲ Update'}
                            </button>

                            <button
                                onClick={() => setIsRestoreModalOpen(true)}
                                style={{
                                    padding: '0.5rem 0.875rem',
                                    backgroundColor: 'transparent',
                                    color: '#ef4444',
                                    border: '1px solid #fecaca',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '500',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Status Message */}
                        {status.message && (
                            <div style={{
                                padding: '0.65rem 0.875rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                backgroundColor: status.type === 'error' ? '#fef2f2' : status.type === 'success' ? '#f0fdf4' : '#eff6ff',
                                color: status.type === 'error' ? '#dc2626' : status.type === 'success' ? '#16a34a' : '#2563eb',
                                border: `1px solid ${status.type === 'error' ? '#fecaca' : status.type === 'success' ? '#bbf7d0' : '#bfdbfe'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span style={{ fontSize: '0.9rem' }}>{status.type === 'error' ? '✕' : status.type === 'success' ? '✓' : '○'}</span>
                                {status.message}
                            </div>
                        )}

                        {/* Filter Editor - Proper Card */}
                        <div className="card filter-editor-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                            <div style={{
                                padding: '0.6rem 0.875rem',
                                backgroundColor: '#1e1e1e',
                                borderBottom: '1px solid #333',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }}></span>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                                    </div>
                                    <span style={{ fontWeight: '600', fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>filter.json</span>
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(168,85,247,0.2)',
                                    color: '#c084fc',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Query
                                </span>
                            </div>
                            <div className="filter-editor-container" style={{ height: '120px' }}>
                                <Editor
                                    height="100%"
                                    defaultLanguage="json"
                                    value={filterEditorValue}
                                    onChange={(value) => setFilterEditorValue(value)}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        scrollBeyondLastLine: false,
                                        lineNumbers: 'on',
                                        glyphMargin: false,
                                        folding: false,
                                        lineDecorationsWidth: 0,
                                        lineNumbersMinChars: 3,
                                        automaticLayout: true,
                                        scrollbar: { vertical: 'auto', horizontal: 'auto' },
                                        overviewRulerLanes: 0,
                                        hideCursorInOverviewRuler: true,
                                        overviewRulerBorder: false,
                                        renderLineHighlight: 'line',
                                        wordWrap: 'on',
                                        padding: { top: 12, bottom: 12 },
                                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                                        lineHeight: 20,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="card editor-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--color-border)', flex: 1 }}>
                            <div style={{
                                padding: '0.6rem 0.875rem',
                                backgroundColor: '#1e1e1e',
                                borderBottom: '1px solid #333',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }}></span>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                                    </div>
                                    <span style={{ fontWeight: '600', fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>response.json</span>
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    padding: '0.15rem 0.4rem',
                                    borderRadius: '4px',
                                    backgroundColor: method === 'GET' ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)',
                                    color: method === 'GET' ? '#60a5fa' : '#4ade80',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {method === 'GET' ? 'Read Only' : 'Editable'}
                                </span>
                            </div>
                            <div className="editor-container" style={{ height: 'calc(100vh - 380px)', minHeight: '300px' }}>
                                <Editor
                                    height="100%"
                                    defaultLanguage="json"
                                    value={editorValue}
                                    onChange={(value) => setEditorValue(value)}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        readOnly: method === 'GET',
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        padding: { top: 12, bottom: 12 },
                                        lineHeight: 20,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                                        renderLineHighlight: 'all',
                                        cursorBlinking: 'smooth',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== 'Overview' && activeTab !== 'Configuration' && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{activeTab} module is coming soon...</p>
                    </div>
                )}
            </main>

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                
                /* Desktop First - Default styles are for desktop */
                .desktop-sidebar { display: flex; }
                .mobile-header { display: none !important; }
                .mobile-drawer { display: none; }
                .mobile-overlay { display: none; }
                .main-content { padding: 2rem 2.5rem !important; }
                .overview-grid { grid-template-columns: 2fr 1fr !important; }
                .filter-editor-container { height: 120px !important; }
                .editor-container { height: calc(100vh - 500px) !important; min-height: 300px !important; }
                
                /* Tablet - 1024px and below */
                @media (max-width: 1024px) {
                    .desktop-sidebar { display: none !important; }
                    .mobile-header { display: flex !important; }
                    .mobile-drawer { display: flex !important; }
                    .mobile-overlay { display: block !important; }
                    .main-content { padding: 1rem !important; }
                    .overview-grid { grid-template-columns: 1fr !important; }
                    .desktop-header { display: none !important; }
                    .filter-editor-container { height: 100px !important; }
                    .editor-container { height: calc(100vh - 420px) !important; min-height: 280px !important; }
                }
                
                /* Mobile - 640px and below */
                @media (max-width: 640px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
                    .stat-card { padding: 1rem !important; }
                    .stat-card span:first-child { font-size: 0.65rem !important; }
                    .stat-card span:last-child { font-size: 1.25rem !important; }
                    .filter-editor-container { height: 90px !important; }
                    .editor-container { height: 45vh !important; min-height: 220px !important; }
                }
                
                /* Extra small - 400px and below */
                @media (max-width: 400px) {
                    .stats-grid { grid-template-columns: 1fr !important; }
                    .filter-editor-container { height: 80px !important; }
                }
            `}</style>
        </div>
    );
}
