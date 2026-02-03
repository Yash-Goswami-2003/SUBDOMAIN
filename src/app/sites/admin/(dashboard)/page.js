'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import TipTapEditorWrapper from '@/components/Admin/TipTapEditorWrapper';
import BlogList from '@/components/Admin/BlogList';

const Icons = {
    Dashboard: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    ),
    Blogs: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    ),
    Database: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    ),
    Settings: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    ),
    Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
    ),
    Menu: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    ),
    Close: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    )
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('{\n  "documentType": "skill"\n}');
    const [method, setMethod] = useState('GET');
    const [editorValue, setEditorValue] = useState('[\n  \n]');
    const [status, setStatus] = useState({ message: '', type: '' });
    const [showModal, setShowModal] = useState(null);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'editor'

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

    const handleSubmit = async () => {
        setStatus({ message: 'Processing...', type: 'info' });
        try {
            let filter = JSON.parse(filterValue);

            if (method === 'GET') {
                const res = await fetch(`/api/admin/documents?filter=${encodeURIComponent(JSON.stringify(filter))}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setEditorValue(JSON.stringify(data, null, 2));
                setStatus({ message: `Fetched ${data.length} documents`, type: 'success' });
            } else {
                let documents = JSON.parse(editorValue);
                const res = await fetch('/api/admin/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ documents, filter })
                });
                if (!res.ok) throw new Error('Failed to update');
                const result = await res.json();
                setStatus({ message: result.message, type: 'success' });
            }
        } catch (error) {
            setStatus({ message: error.message, type: 'error' });
        }
    };

    const handleRestore = async () => {
        setStatus({ message: 'Restoring...', type: 'info' });
        try {
            const res = await fetch('/api/admin/restore', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to restore');
            const result = await res.json();
            setStatus({ message: result.message, type: 'success' });
            setEditorValue('[\n  \n]');
        } catch (error) {
            setStatus({ message: error.message, type: 'error' });
        }
    };

    const handleBlogEdit = (blog) => {
        setCurrentBlog(blog);
        setView('editor');
    };

    const handleBlogSave = (savedBlog) => {
        setCurrentBlog(null);
        setView('list');
    };

    const handleBlogCancel = () => {
        setCurrentBlog(null);
        setView('list');
    };

    const navItems = [
        { icon: Icons.Dashboard, label: 'Overview' },
        { icon: Icons.Blogs, label: 'Blogs' },
        { icon: Icons.Database, label: 'Configuration' },
        { icon: Icons.Settings, label: 'Settings' }
    ];

    return (
        <div className="admin">
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>{showModal === 'restore' ? 'Restore Default' : 'Update Data'}</h3>
                        <p>{showModal === 'restore'
                            ? 'This will reset all configurations. Continue?'
                            : 'This will update documents matching the filter. Continue?'}
                        </p>
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(null)} className="modal-cancel">Cancel</button>
                            <button onClick={() => { showModal === 'restore' ? handleRestore() : handleSubmit(); setShowModal(null); }} className="modal-confirm">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} />}

            <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="logo">Admin</span>
                    <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <Icons.Close />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            onClick={() => { setActiveTab(label); setIsMobileMenuOpen(false); }}
                            className={`nav-item ${activeTab === label ? 'active' : ''}`}
                        >
                            <Icon />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <Icons.Logout />
                    <span>Logout</span>
                </button>
            </aside>

            <main className="main">
                <header className="topbar">
                    <button className="menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
                        <Icons.Menu />
                    </button>
                    <h1 className="page-title">{activeTab}</h1>
                </header>

                <div className="content">
                    {activeTab === 'Overview' && (
                        <div className="overview">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="stat-label">Projects</span>
                                    <span className="stat-value">14</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Skills</span>
                                    <span className="stat-value">28</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Live Sites</span>
                                    <span className="stat-value">3</span>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h3>Recent Activity</h3>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <span className="activity-dot"></span>
                                        <div>
                                            <span className="activity-text">Updated skills data</span>
                                            <span className="activity-time">2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <span className="activity-dot"></span>
                                        <div>
                                            <span className="activity-text">New project added</span>
                                            <span className="activity-time">Yesterday</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Blogs' && (
                        <div style={{ width: '100%' }}>
                            {view === 'list' ? (
                                <BlogList onEdit={handleBlogEdit} theme="light" />
                            ) : (
                                <TipTapEditorWrapper
                                    blog={currentBlog}
                                    onSave={handleBlogSave}
                                    onCancel={handleBlogCancel}
                                    theme="light"
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'Configuration' && (
                        <div className="config">
                            <div className="config-controls">
                                <div className="method-toggle">
                                    <button onClick={() => setMethod('GET')} className={method === 'GET' ? 'active' : ''}>GET</button>
                                    <button onClick={() => setMethod('POST')} className={method === 'POST' ? 'active' : ''}>POST</button>
                                </div>
                                <div className="config-actions">
                                    <button onClick={() => method === 'GET' ? handleSubmit() : setShowModal('update')} className="action-btn primary">
                                        {method === 'GET' ? 'Fetch' : 'Update'}
                                    </button>
                                    <button onClick={() => setShowModal('restore')} className="action-btn danger">Reset</button>
                                </div>
                            </div>

                            {status.message && (
                                <div className={`status-message ${status.type}`}>{status.message}</div>
                            )}

                            <div className="editor-section">
                                <div className="editor-header">
                                    <span className="editor-title">Filter</span>
                                </div>
                                <div className="editor-wrapper filter">
                                    <Editor
                                        height="100%"
                                        defaultLanguage="json"
                                        value={filterValue}
                                        onChange={setFilterValue}
                                        theme="vs-dark"
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            lineNumbers: 'on',
                                            padding: { top: 10, bottom: 10 }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="editor-section">
                                <div className="editor-header">
                                    <span className="editor-title">Data</span>
                                    <span className={`editor-mode ${method}`}>{method === 'GET' ? 'Read Only' : 'Editable'}</span>
                                </div>
                                <div className="editor-wrapper main">
                                    <Editor
                                        height="100%"
                                        defaultLanguage="json"
                                        value={editorValue}
                                        onChange={setEditorValue}
                                        theme="vs-dark"
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            readOnly: method === 'GET',
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true,
                                            padding: { top: 10, bottom: 10 }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="placeholder">
                            <p>Settings coming soon...</p>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .admin {
                    display: flex;
                    min-height: 100vh;
                    background-color: var(--color-bg);
                }

                .sidebar {
                    width: 220px;
                    background-color: var(--color-surface);
                    border-right: 1px solid var(--color-border);
                    display: flex;
                    flex-direction: column;
                    padding: 1.25rem;
                    position: sticky;
                    top: 0;
                    height: 100vh;
                }

                .sidebar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .logo {
                    font-size: 1rem;
                    font-weight: 600;
                }

                .close-btn {
                    display: none;
                    padding: 0.25rem;
                    color: var(--color-text-secondary);
                }

                .sidebar-nav {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.625rem 0.75rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                    transition: all var(--transition-fast);
                }

                .nav-item:hover {
                    background-color: var(--color-bg);
                }

                .nav-item.active {
                    color: var(--color-text-primary);
                    background-color: var(--color-bg);
                    font-weight: 500;
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.625rem 0.75rem;
                    font-size: 0.875rem;
                    color: #ef4444;
                    margin-top: 1rem;
                }

                .main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .topbar {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid var(--color-border);
                }

                .menu-btn {
                    display: none;
                    padding: 0.25rem;
                    color: var(--color-text-primary);
                }

                .page-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                }

                .content {
                    flex: 1;
                    padding: 1.5rem;
                    overflow-y: auto;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stat-card {
                    padding: 1.25rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                }

                .stat-label {
                    display: block;
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                    margin-bottom: 0.25rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .recent-activity {
                    padding: 1.25rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                }

                .recent-activity h3 {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .activity-item {
                    display: flex;
                    gap: 0.75rem;
                }

                .activity-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: var(--color-accent);
                    margin-top: 6px;
                }

                .activity-text {
                    display: block;
                    font-size: 0.875rem;
                }

                .activity-time {
                    display: block;
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                }

                .config {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .config-controls {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .method-toggle {
                    display: flex;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    overflow: hidden;
                }

                .method-toggle button {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    background-color: var(--color-surface);
                    color: var(--color-text-secondary);
                    transition: all var(--transition-fast);
                }

                .method-toggle button.active {
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                }

                .config-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-left: auto;
                }

                .action-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border-radius: var(--radius-sm);
                    transition: opacity var(--transition-fast);
                }

                .action-btn.primary {
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                }

                .action-btn.danger {
                    background-color: transparent;
                    border: 1px solid #fecaca;
                    color: #ef4444;
                }

                .status-message {
                    padding: 0.625rem 0.875rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.8125rem;
                }

                .status-message.success {
                    background-color: #f0fdf4;
                    color: #16a34a;
                    border: 1px solid #bbf7d0;
                }

                .status-message.error {
                    background-color: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                }

                .status-message.info {
                    background-color: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                }

                .editor-section {
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                }

                .editor-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 0.75rem;
                    background-color: #1e1e1e;
                    border-bottom: 1px solid #333;
                }

                .editor-title {
                    font-size: 0.75rem;
                    color: #9ca3af;
                    font-family: monospace;
                }

                .editor-mode {
                    font-size: 0.625rem;
                    padding: 0.125rem 0.375rem;
                    border-radius: 3px;
                    text-transform: uppercase;
                }

                .editor-mode.GET {
                    background-color: rgba(59,130,246,0.2);
                    color: #60a5fa;
                }

                .editor-mode.POST {
                    background-color: rgba(34,197,94,0.2);
                    color: #4ade80;
                }

                .editor-wrapper.filter {
                    height: 100px;
                }

                .editor-wrapper.main {
                    height: calc(100vh - 420px);
                    min-height: 250px;
                }

                .placeholder {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                    color: var(--color-text-muted);
                }

                .overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 99;
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .modal {
                    background-color: var(--color-surface);
                    padding: 1.5rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    max-width: 360px;
                    width: 90%;
                }

                .modal h3 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .modal p {
                    font-size: 0.875rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 1.25rem;
                }

                .modal-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                }

                .modal-cancel {
                    padding: 0.5rem 1rem;
                    font-size: 0.8125rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                }

                .modal-confirm {
                    padding: 0.5rem 1rem;
                    font-size: 0.8125rem;
                    background-color: var(--color-accent);
                    color: var(--color-bg);
                    border-radius: var(--radius-sm);
                }

                @media (max-width: 768px) {
                    .sidebar {
                        position: fixed;
                        left: -260px;
                        top: 0;
                        z-index: 100;
                        width: 260px;
                        transition: left 0.2s ease;
                    }

                    .sidebar.open {
                        left: 0;
                    }

                    .close-btn {
                        display: block;
                    }

                    .menu-btn {
                        display: block;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .editor-wrapper.main {
                        height: 300px;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
