'use client'

import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'

const BlogEditor = ({ blog = null, onSave, onCancel, theme = 'light' }) => {
    const [title, setTitle] = useState(blog?.title || '')
    const [content, setContent] = useState(blog?.content || '')
    const [excerpt, setExcerpt] = useState(blog?.excerpt || '')
    const [author, setAuthor] = useState(blog?.author || 'Admin')
    const [status, setStatus] = useState(blog?.status || 'draft')
    const [tags, setTags] = useState(blog?.tags?.join(', ') || '')
    const [featuredImage, setFeaturedImage] = useState(blog?.featuredImage || '')
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState(null)

    useEffect(() => {
        if (content && !excerpt) {
            const autoExcerpt = content.substring(0, 150) + '...'
            setExcerpt(autoExcerpt)
        }
    }, [content, excerpt])

    const handleSave = async (saveStatus = status) => {
        if (!title.trim() || !content.trim()) {
            toast.error('Title and content are required')
            return
        }

        setIsSaving(true)
        try {
            const blogData = {
                title: title.trim(),
                content: content.trim(),
                excerpt: excerpt.trim() || content.substring(0, 150) + '...',
                author: author.trim(),
                status: saveStatus,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                featuredImage: featuredImage.trim()
            }

            const url = '/api/blogs'
            const method = blog?.id ? 'PUT' : 'POST'
            if (blog?.id) blogData.id = blog.id

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            })

            const result = await response.json()
            if (result.success) {
                toast.success(`Blog ${saveStatus === 'published' ? 'published' : 'saved'}!`)
                setLastSaved(new Date())
                onSave?.(result.blog)
            } else {
                toast.error(result.error || 'Failed to save')
            }
        } catch (error) {
            console.error('Error saving blog:', error)
            toast.error('Failed to save blog')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <Toaster position="top-center" toastOptions={{ style: { background: '#000', color: '#fff', borderRadius: '8px' } }} />
            <div className="editor-container">
                {/* Top Bar */}
                <header className="editor-topbar">
                    <button onClick={onCancel} className="back-button">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </button>

                    <div className="topbar-right">
                        {lastSaved && (
                            <span className="save-indicator">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Saved {format(lastSaved, 'h:mm a')}
                            </span>
                        )}
                        <button onClick={() => handleSave('draft')} disabled={isSaving} className="btn btn-secondary">
                            Save Draft
                        </button>
                        <button onClick={() => handleSave('published')} disabled={isSaving} className="btn btn-primary">
                            {isSaving ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </header>

                <div className="editor-body">
                    {/* Main Writing Area */}
                    <main className="editor-main">
                        <div className="writing-area">
                            <input
                                type="text"
                                placeholder="Post title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="title-input"
                            />

                            <div className="md-wrapper" data-color-mode="light">
                                <MDEditor
                                    value={content}
                                    onChange={(val) => setContent(val || '')}
                                    height={550}
                                    preview="edit"
                                    hideToolbar={false}
                                    visibleDragBar={false}
                                />
                            </div>
                        </div>
                    </main>

                    {/* Settings Sidebar */}
                    <aside className="editor-sidebar">
                        <div className="sidebar-header">
                            <h3>Post Settings</h3>
                        </div>

                        <div className="sidebar-content">
                            {/* Status Toggle */}
                            <div className="setting-group">
                                <label>Status</label>
                                <div className="status-toggle">
                                    <button
                                        className={`toggle-btn ${status === 'draft' ? 'active' : ''}`}
                                        onClick={() => setStatus('draft')}
                                    >
                                        Draft
                                    </button>
                                    <button
                                        className={`toggle-btn ${status === 'published' ? 'active' : ''}`}
                                        onClick={() => setStatus('published')}
                                    >
                                        Published
                                    </button>
                                </div>
                            </div>

                            {/* Author */}
                            <div className="setting-group">
                                <label>Author</label>
                                <div className="author-input">
                                    <div className="author-avatar">{author?.charAt(0)?.toUpperCase() || 'A'}</div>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="Author name"
                                    />
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div className="setting-group">
                                <label>Excerpt</label>
                                <textarea
                                    placeholder="Write a brief summary..."
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    rows={3}
                                />
                                <span className="char-count">{excerpt.length}/200</span>
                            </div>

                            {/* Tags */}
                            <div className="setting-group">
                                <label>Tags</label>
                                <input
                                    type="text"
                                    placeholder="React, JavaScript, Web Dev"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                                <span className="hint">Separate with commas</span>
                            </div>

                            {/* Featured Image */}
                            <div className="setting-group">
                                <label>Featured Image</label>
                                <div className="image-upload-area">
                                    {featuredImage ? (
                                        <div className="image-preview">
                                            <img src={featuredImage} alt="Featured" onError={(e) => e.target.style.display = 'none'} />
                                            <button onClick={() => setFeaturedImage('')} className="remove-image">×</button>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <span>Add cover image</span>
                                        </div>
                                    )}
                                    <input
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={featuredImage}
                                        onChange={(e) => setFeaturedImage(e.target.value)}
                                        className="image-url-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .editor-container {
                    min-height: 100vh;
                    background: #fafafa;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                /* Top Bar */
                .editor-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    background: #fff;
                    border-bottom: 1px solid #eee;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .back-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #666;
                    transition: all 0.15s;
                }
                .back-button:hover {
                    background: #f5f5f5;
                    color: #000;
                }

                .topbar-right {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .save-indicator {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: #22c55e;
                    padding-right: 12px;
                    border-right: 1px solid #eee;
                }

                .btn {
                    padding: 10px 18px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.15s;
                    cursor: pointer;
                }
                .btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .btn-secondary {
                    background: #fff;
                    border: 1px solid #ddd;
                    color: #333;
                }
                .btn-secondary:hover:not(:disabled) { background: #f5f5f5; }

                .btn-primary {
                    background: #000;
                    border: none;
                    color: #fff;
                }
                .btn-primary:hover:not(:disabled) { background: #222; transform: translateY(-1px); }

                /* Main Layout */
                .editor-body {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    min-height: calc(100vh - 65px);
                }

                /* Writing Area */
                .editor-main {
                    padding: 40px;
                    background: #fff;
                }

                .writing-area {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .title-input {
                    width: 100%;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #111;
                    border: none;
                    background: transparent;
                    outline: none;
                    margin-bottom: 32px;
                    letter-spacing: -0.02em;
                }
                .title-input::placeholder { color: #ccc; }

                .md-wrapper {
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #eee;
                }

                /* MDEditor Overrides */
                .w-md-editor {
                    background: #fff !important;
                    box-shadow: none !important;
                    border: none !important;
                }
                .w-md-editor-toolbar {
                    background: #fafafa !important;
                    border-bottom: 1px solid #eee !important;
                    padding: 8px 12px !important;
                }
                .w-md-editor-toolbar li > button {
                    height: 32px !important;
                    width: 32px !important;
                    border-radius: 6px !important;
                    color: #555 !important;
                }
                .w-md-editor-toolbar li > button:hover {
                    background: #eee !important;
                    color: #000 !important;
                }
                .w-md-editor-content {
                    padding: 20px !important;
                }
                .w-md-editor-text-pre > code,
                .w-md-editor-text-input {
                    font-size: 16px !important;
                    line-height: 1.7 !important;
                    font-family: 'Inter', sans-serif !important;
                }

                /* Sidebar */
                .editor-sidebar {
                    background: #fff;
                    border-left: 1px solid #eee;
                    display: flex;
                    flex-direction: column;
                }

                .sidebar-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid #eee;
                }
                .sidebar-header h3 {
                    font-size: 14px;
                    font-weight: 600;
                    color: #111;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .sidebar-content {
                    padding: 20px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    overflow-y: auto;
                }

                .setting-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .setting-group > label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #888;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                .setting-group input,
                .setting-group textarea {
                    padding: 12px 14px;
                    border: 1px solid #e5e5e5;
                    border-radius: 10px;
                    font-size: 14px;
                    color: #111;
                    background: #fafafa;
                    transition: all 0.15s;
                    font-family: inherit;
                }
                .setting-group input:focus,
                .setting-group textarea:focus {
                    outline: none;
                    border-color: #000;
                    background: #fff;
                }
                .setting-group textarea {
                    resize: none;
                }

                .hint, .char-count {
                    font-size: 11px;
                    color: #999;
                }
                .char-count { text-align: right; }

                /* Status Toggle */
                .status-toggle {
                    display: flex;
                    background: #f5f5f5;
                    border-radius: 10px;
                    padding: 4px;
                }
                .toggle-btn {
                    flex: 1;
                    padding: 10px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #666;
                    transition: all 0.15s;
                }
                .toggle-btn.active {
                    background: #fff;
                    color: #000;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                }

                /* Author Input */
                .author-input {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    border: 1px solid #e5e5e5;
                    border-radius: 10px;
                    background: #fafafa;
                }
                .author-input:focus-within {
                    border-color: #000;
                    background: #fff;
                }
                .author-avatar {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    flex-shrink: 0;
                }
                .author-input input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 0;
                    font-size: 14px;
                }
                .author-input input:focus {
                    outline: none;
                    border: none;
                }

                /* Image Upload */
                .image-upload-area {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .upload-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 24px;
                    border: 2px dashed #ddd;
                    border-radius: 12px;
                    color: #888;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .upload-placeholder:hover {
                    border-color: #999;
                    background: #fafafa;
                }
                .upload-placeholder span {
                    font-size: 13px;
                    font-weight: 500;
                }

                .image-preview {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    aspect-ratio: 16/9;
                    background: #f5f5f5;
                }
                .image-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .remove-image {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 24px;
                    height: 24px;
                    background: rgba(0,0,0,0.6);
                    color: #fff;
                    border-radius: 50%;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                .remove-image:hover { background: rgba(0,0,0,0.8); }

                .image-url-input {
                    font-size: 13px !important;
                    padding: 10px 12px !important;
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .editor-body {
                        grid-template-columns: 1fr;
                    }
                    .editor-sidebar {
                        border-left: none;
                        border-top: 1px solid #eee;
                    }
                    .editor-main {
                        padding: 24px;
                    }
                    .title-input {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </>
    )
}

export default BlogEditor
