'use client';

import { useEffect, useState } from 'react';
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
    Projects: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"></rect><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path></svg>
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
    const [projects, setProjects] = useState([]);
    const [projectForm, setProjectForm] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [projectsSaving, setProjectsSaving] = useState(false);
    const [projectsStatus, setProjectsStatus] = useState({ message: '', type: '' });
    const [isNewProject, setIsNewProject] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const normalizeProject = (project, fallbackId) => ({
        documentType: 'project',
        id: Number.isFinite(Number(project?.id)) ? Number(project.id) : fallbackId,
        title: project?.title || '',
        description: project?.description || '',
        longDescription: project?.longDescription || '',
        image: project?.image || '',
        technologies: Array.isArray(project?.technologies) ? project.technologies : [],
        category: project?.category || '',
        featured: Boolean(project?.featured),
        liveUrl: project?.liveUrl || '',
        githubUrl: project?.githubUrl || ''
    });

    const toFormState = (project) => ({
        ...project,
        technologiesInput: (project.technologies || []).join(', ')
    });

    const getNextProjectId = (list) => {
        if (!list || list.length === 0) return 1;
        const maxId = list.reduce((max, item) => {
            const value = Number(item.id);
            return Number.isFinite(value) && value > max ? value : max;
        }, 0);
        return maxId + 1;
    };

    const createProjectTemplate = (nextId) => ({
        documentType: 'project',
        id: nextId,
        title: '',
        description: '',
        longDescription: '',
        image: '',
        technologies: [],
        category: '',
        featured: false,
        liveUrl: '',
        githubUrl: ''
    });

    const fetchProjects = async () => {
        setProjectsLoading(true);
        setProjectsStatus({ message: '', type: '' });
        try {
            const res = await fetch(`/api/admin/documents?filter=${encodeURIComponent(JSON.stringify({ documentType: 'project' }))}`);
            if (!res.ok) throw new Error('Failed to fetch projects');
            const data = await res.json();
            const normalized = (Array.isArray(data) ? data : []).map((project, index) => normalizeProject(project, index + 1));
            setProjects(normalized);
            if (normalized.length > 0) {
                setSelectedProjectId(normalized[0].id);
                setProjectForm(toFormState(normalized[0]));
                setIsNewProject(false);
            } else {
                const fresh = createProjectTemplate(1);
                setSelectedProjectId(fresh.id);
                setProjectForm(toFormState(fresh));
                setIsNewProject(true);
            }
        } catch (error) {
            setProjectsStatus({ message: error.message, type: 'error' });
        } finally {
            setProjectsLoading(false);
        }
    };

    const persistProjects = async (nextProjects, successMessage) => {
        setProjectsSaving(true);
        setProjectsStatus({ message: 'Saving...', type: 'info' });
        try {
            const res = await fetch('/api/admin/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documents: nextProjects, filter: { documentType: 'project' } })
            });
            if (!res.ok) throw new Error('Failed to save projects');
            const result = await res.json();
            setProjectsStatus({ message: successMessage || result.message, type: 'success' });
        } catch (error) {
            setProjectsStatus({ message: error.message, type: 'error' });
        } finally {
            setProjectsSaving(false);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProjectId(project.id);
        setProjectForm(toFormState(project));
        setIsNewProject(false);
    };

    const handleProjectNew = () => {
        const nextId = getNextProjectId(projects);
        const fresh = createProjectTemplate(nextId);
        setSelectedProjectId(fresh.id);
        setProjectForm(toFormState(fresh));
        setIsNewProject(true);
    };

    const handleProjectChange = (field, value) => {
        setProjectForm((prev) => ({ ...prev, [field]: value }));
    };

    const buildProjectPayload = (form) => {
        const technologies = form.technologiesInput
            ? form.technologiesInput.split(',').map((tech) => tech.trim()).filter(Boolean)
            : [];
        return {
            documentType: 'project',
            id: Number(form.id),
            title: form.title.trim(),
            description: form.description.trim(),
            longDescription: form.longDescription.trim(),
            image: form.image.trim(),
            technologies,
            category: form.category.trim(),
            featured: Boolean(form.featured),
            liveUrl: form.liveUrl.trim(),
            githubUrl: form.githubUrl.trim()
        };
    };

    const handleProjectSave = async () => {
        if (!projectForm) return;
        if (!projectForm.title.trim() || !projectForm.description.trim()) {
            setProjectsStatus({ message: 'Title and description are required', type: 'error' });
            return;
        }
        const payload = buildProjectPayload(projectForm);

        let nextProjects = isNewProject
            ? [...projects, payload]
            : projects.map((project) => (project.id === selectedProjectId ? payload : project));

        if (payload.featured) {
            nextProjects = nextProjects.map((project) => ({
                ...project,
                featured: project.id === payload.id
            }));
        }

        setProjects(nextProjects);
        setIsNewProject(false);
        setSelectedProjectId(payload.id);
        setProjectForm(toFormState(payload));
        await persistProjects(nextProjects, isNewProject ? 'Project created' : 'Project updated');
    };

    const handleProjectDelete = async () => {
        if (!selectedProjectId) return;
        const current = projects.find((project) => project.id === selectedProjectId);
        if (!current) return;
        const shouldDelete = window.confirm(`Delete "${current.title || 'Untitled project'}"? This cannot be undone.`);
        if (!shouldDelete) return;
        const nextProjects = projects.filter((project) => project.id !== selectedProjectId);
        setProjects(nextProjects);
        if (nextProjects.length > 0) {
            setSelectedProjectId(nextProjects[0].id);
            setProjectForm(toFormState(nextProjects[0]));
            setIsNewProject(false);
        } else {
            const fresh = createProjectTemplate(1);
            setSelectedProjectId(fresh.id);
            setProjectForm(toFormState(fresh));
            setIsNewProject(true);
        }
        await persistProjects(nextProjects, 'Project deleted');
    };

    const handleProjectUpload = async (file) => {
        if (!file) return;
        setUploadingImage(true);
        setProjectsStatus({ message: 'Uploading image...', type: 'info' });
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) throw new Error('Failed to upload image');
            const result = await res.json();
            setProjectForm((prev) => ({ ...prev, image: result.url || prev.image }));
            setProjectsStatus({ message: 'Image uploaded', type: 'success' });
        } catch (error) {
            setProjectsStatus({ message: error.message, type: 'error' });
        } finally {
            setUploadingImage(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'Projects') {
            fetchProjects();
        }
    }, [activeTab]);

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
        { icon: Icons.Projects, label: 'Projects' },
        { icon: Icons.Database, label: 'Configuration' },
        { icon: Icons.Settings, label: 'Settings' }
    ];

    const ghostButtonClass = 'inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-60';
    const primaryButtonClass = 'inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';
    const dangerButtonClass = 'inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60';
    const inputClass = 'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-text-primary)]';
    const textareaClass = `${inputClass} resize-none`;

    const statusToneClasses = {
        success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        error: 'border-red-200 bg-red-50 text-red-600',
        info: 'border-blue-200 bg-blue-50 text-blue-600'
    };
    const getStatusClass = (tone) => statusToneClasses[tone] || 'border-transparent text-[var(--color-text-secondary)]';

    return (
        <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
            {showModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" onClick={() => setShowModal(null)}>
                    <div className="w-[90%] max-w-[360px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6" onClick={e => e.stopPropagation()}>
                        <h3 className="text-base font-semibold">{showModal === 'restore' ? 'Restore Default' : 'Update Data'}</h3>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{showModal === 'restore'
                            ? 'This will reset all configurations. Continue?'
                            : 'This will update documents matching the filter. Continue?'}
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button onClick={() => setShowModal(null)} className={ghostButtonClass}>Cancel</button>
                            <button onClick={() => { showModal === 'restore' ? handleRestore() : handleSubmit(); setShowModal(null); }} className={primaryButtonClass}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isMobileMenuOpen && <div className="fixed inset-0 z-[90] bg-black/40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

            <aside className={`fixed left-0 top-0 z-[100] flex h-screen w-[260px] flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-transform md:sticky md:top-0 md:w-[220px] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-base font-semibold">Admin</span>
                    <button className="p-1 text-[var(--color-text-secondary)] md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <Icons.Close />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {navItems.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            onClick={() => { setActiveTab(label); setIsMobileMenuOpen(false); }}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeTab === label ? 'bg-[var(--color-bg)] font-medium text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]'}`}
                        >
                            <Icon />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="mt-4 flex items-center gap-3 px-3 py-2.5 text-sm text-red-500">
                    <Icons.Logout />
                    <span>Logout</span>
                </button>
            </aside>

            <main className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 backdrop-blur md:flex-nowrap">
                    <div className="flex items-center gap-3">
                        <button className="p-1 text-[var(--color-text-primary)] md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                            <Icons.Menu />
                        </button>
                        <div>
                            <p className="mb-0.5 text-[0.75rem] uppercase tracking-[0.02em] text-[var(--color-text-muted)]">Admin Console</p>
                            <h1 className="text-[1.125rem] font-semibold">{activeTab}</h1>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
                        {activeTab === 'Overview' && (
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                                        <span className="text-[0.75rem] text-[var(--color-text-muted)]">Projects</span>
                                        <span className="mt-1 block text-[1.5rem] font-semibold">14</span>
                                    </div>
                                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                                        <span className="text-[0.75rem] text-[var(--color-text-muted)]">Skills</span>
                                        <span className="mt-1 block text-[1.5rem] font-semibold">28</span>
                                    </div>
                                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                                        <span className="text-[0.75rem] text-[var(--color-text-muted)]">Live Sites</span>
                                        <span className="mt-1 block text-[1.5rem] font-semibold">3</span>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <h3 className="text-[0.9375rem] font-semibold">Recent Activity</h3>
                                        <span className="text-[0.8125rem] text-[var(--color-text-muted)]">Latest changes across the portfolio</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-3">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
                                            <div>
                                                <span className="block text-sm">Updated skills data</span>
                                                <span className="block text-xs text-[var(--color-text-muted)]">2 hours ago</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>
                                            <div>
                                                <span className="block text-sm">New project added</span>
                                                <span className="block text-xs text-[var(--color-text-muted)]">Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Blogs' && (
                            view === 'list' ? (
                                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2">
                                    <BlogList onEdit={handleBlogEdit} theme="light" />
                                </div>
                            ) : (
                                <div className="bg-transparent">
                                    <TipTapEditorWrapper
                                        blog={currentBlog}
                                        onSave={handleBlogSave}
                                        onCancel={handleBlogCancel}
                                        theme="light"
                                    />
                                </div>
                            )
                        )}

                        {activeTab === 'Projects' && (
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">Projects</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)]">Create, update, and feature projects shown on the homepage.</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button onClick={fetchProjects} className={ghostButtonClass} disabled={projectsLoading}>
                                            {projectsLoading ? 'Refreshing...' : 'Refresh'}
                                        </button>
                                        <button onClick={handleProjectNew} className={ghostButtonClass}>
                                            New Project
                                        </button>
                                        <button onClick={handleProjectSave} className={primaryButtonClass} disabled={projectsSaving || !projectForm}>
                                            {projectsSaving ? 'Saving...' : isNewProject ? 'Create Project' : 'Save Changes'}
                                        </button>
                                    </div>
                                </div>

                                {projectsStatus.message && (
                                    <div className={`rounded-lg border px-3 py-2 text-sm ${getStatusClass(projectsStatus.type)}`}>{projectsStatus.message}</div>
                                )}

                                <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                                    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                                        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                                            <span>All Projects</span>
                                            <span>{projects.length}</span>
                                        </div>
                                        <div className="flex max-h-[640px] flex-col overflow-y-auto">
                                            {projectsLoading && (
                                                <div className="px-4 py-10 text-center text-sm text-[var(--color-text-muted)]">Loading projects...</div>
                                            )}
                                            {!projectsLoading && projects.length === 0 && (
                                                <div className="px-4 py-10 text-center text-sm text-[var(--color-text-muted)]">No projects yet. Create your first one.</div>
                                            )}
                                            {!projectsLoading && projects.map((project) => (
                                                <button
                                                    key={project.id}
                                                    className={`flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3 text-left transition-colors last:border-b-0 ${selectedProjectId === project.id ? 'bg-[var(--color-bg)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]'}`}
                                                    onClick={() => handleProjectSelect(project)}
                                                >
                                                    <div>
                                                        <span className="block text-sm font-medium">{project.title || 'Untitled project'}</span>
                                                        <span className="block text-xs text-[var(--color-text-muted)]">{project.category || 'Uncategorized'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        {project.featured && <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">Featured</span>}
                                                        <span className="text-[0.7rem] text-[var(--color-text-muted)]">#{project.id}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                                        {projectForm ? (
                                            <>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Title</label>
                                                        <input
                                                            type="text"
                                                            value={projectForm.title}
                                                            onChange={(e) => handleProjectChange('title', e.target.value)}
                                                            placeholder="Project title"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Category</label>
                                                        <input
                                                            type="text"
                                                            list="project-categories"
                                                            value={projectForm.category}
                                                            onChange={(e) => handleProjectChange('category', e.target.value)}
                                                            placeholder="AI / Full Stack"
                                                            className={inputClass}
                                                        />
                                                        <datalist id="project-categories">
                                                            <option value="Full Stack" />
                                                            <option value="Frontend" />
                                                            <option value="Backend" />
                                                            <option value="AI / Full Stack" />
                                                            <option value="Hardware / Web" />
                                                            <option value="Software" />
                                                        </datalist>
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Short Description</label>
                                                        <textarea
                                                            rows={2}
                                                            value={projectForm.description}
                                                            onChange={(e) => handleProjectChange('description', e.target.value)}
                                                            placeholder="One-line summary for listings"
                                                            className={textareaClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Long Description</label>
                                                        <textarea
                                                            rows={4}
                                                            value={projectForm.longDescription}
                                                            onChange={(e) => handleProjectChange('longDescription', e.target.value)}
                                                            placeholder="Detailed description for featured section"
                                                            className={textareaClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Technologies</label>
                                                        <input
                                                            type="text"
                                                            value={projectForm.technologiesInput}
                                                            onChange={(e) => handleProjectChange('technologiesInput', e.target.value)}
                                                            placeholder="React, Next.js, Node.js"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Live URL</label>
                                                        <input
                                                            type="url"
                                                            value={projectForm.liveUrl}
                                                            onChange={(e) => handleProjectChange('liveUrl', e.target.value)}
                                                            placeholder="https://example.com"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">GitHub URL</label>
                                                        <input
                                                            type="url"
                                                            value={projectForm.githubUrl}
                                                            onChange={(e) => handleProjectChange('githubUrl', e.target.value)}
                                                            placeholder="https://github.com/..."
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Image</label>
                                                        <div className="flex flex-col gap-3">
                                                            <input
                                                                type="url"
                                                                value={projectForm.image}
                                                                onChange={(e) => handleProjectChange('image', e.target.value)}
                                                                placeholder="/uploads/project-image.jpg"
                                                                className={inputClass}
                                                            />
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <label className={`${ghostButtonClass} cursor-pointer`} htmlFor="project-image-upload">
                                                                    {uploadingImage ? 'Uploading...' : 'Upload'}
                                                                </label>
                                                                <input
                                                                    id="project-image-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleProjectUpload(e.target.files?.[0])}
                                                                    disabled={uploadingImage}
                                                                    className="hidden"
                                                                />
                                                                {projectForm.image && (
                                                                    <button
                                                                        type="button"
                                                                        className={ghostButtonClass}
                                                                        onClick={() => handleProjectChange('image', '')}
                                                                    >
                                                                        Clear
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {projectForm.image && (
                                                                <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]">
                                                                    <img src={projectForm.image} alt="Project preview" className="h-full w-full object-cover" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
                                                    <label className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                                        <input
                                                            type="checkbox"
                                                            checked={projectForm.featured}
                                                            onChange={(e) => handleProjectChange('featured', e.target.checked)}
                                                            className="h-4 w-4 accent-[var(--color-accent)]"
                                                        />
                                                        <span>Feature this project on the home page</span>
                                                    </label>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-[var(--color-text-muted)]">Project ID: {projectForm.id}</span>
                                                        <button type="button" onClick={handleProjectDelete} className={dangerButtonClass}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="px-4 py-10 text-center text-sm text-[var(--color-text-muted)]">Select a project to edit.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Configuration' && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                                        <button
                                            onClick={() => setMethod('GET')}
                                            className={`px-4 py-2 text-[0.78rem] font-semibold transition-colors ${method === 'GET' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                                        >
                                            GET
                                        </button>
                                        <button
                                            onClick={() => setMethod('POST')}
                                            className={`px-4 py-2 text-[0.78rem] font-semibold transition-colors ${method === 'POST' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                                        >
                                            POST
                                        </button>
                                    </div>
                                    <div className="flex w-full flex-wrap gap-2 justify-start md:ml-auto md:w-auto md:justify-end">
                                        <button onClick={() => method === 'GET' ? handleSubmit() : setShowModal('update')} className={primaryButtonClass}>
                                            {method === 'GET' ? 'Fetch' : 'Update'}
                                        </button>
                                        <button onClick={() => setShowModal('restore')} className={dangerButtonClass}>Reset</button>
                                    </div>
                                </div>

                                {status.message && (
                                    <div className={`rounded-lg border px-3 py-2 text-sm ${getStatusClass(status.type)}`}>{status.message}</div>
                                )}

                                <div className="grid gap-4 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
                                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                                            <span className="text-[0.8rem] font-mono text-slate-600">Filter</span>
                                        </div>
                                        <div className="relative h-[clamp(220px,26vh,320px)] min-h-[220px] border-t border-slate-200 bg-slate-50">
                                            {!filterValue?.trim() && (
                                                <div className="pointer-events-none absolute left-3 top-2.5 z-10 text-[0.85rem] font-mono text-slate-400">
                                                    {'{ "documentType": "skill" }'}
                                                </div>
                                            )}
                                            <Editor
                                                height="100%"
                                                defaultLanguage="json"
                                                value={filterValue}
                                                onChange={(value) => setFilterValue(value ?? '')}
                                                theme="light"
                                                options={{
                                                    minimap: { enabled: false },
                                                    fontSize: 13,
                                                    scrollBeyondLastLine: false,
                                                    automaticLayout: true,
                                                    lineNumbers: 'on',
                                                    padding: { top: 12, bottom: 12 },
                                                    wordWrap: 'on',
                                                    renderLineHighlight: 'line',
                                                    lineDecorationsWidth: 6,
                                                    lineNumbersMinChars: 2,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                                            <span className="text-[0.8rem] font-mono text-slate-600">Data</span>
                                            <span className={`rounded-md border px-2 py-0.5 text-[0.625rem] uppercase ${method === 'GET' ? 'border-blue-200 bg-blue-50 text-blue-500' : 'border-emerald-200 bg-emerald-50 text-emerald-500'}`}>
                                                {method === 'GET' ? 'Read Only' : 'Editable'}
                                            </span>
                                        </div>
                                        <div className="h-[320px] min-h-[280px] border-t border-slate-200 bg-white md:h-[clamp(320px,60vh,760px)]">
                                            <Editor
                                                height="100%"
                                                defaultLanguage="json"
                                                value={editorValue}
                                                onChange={(value) => setEditorValue(value ?? '')}
                                                theme="light"
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
                            </div>
                        )}

                        {activeTab === 'Settings' && (
                            <div className="flex h-[200px] items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-muted)]">
                                <p>Settings coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            
        </div>
    );
}
