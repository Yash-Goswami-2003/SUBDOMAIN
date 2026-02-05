'use client'

import { Extension } from '@tiptap/core'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Plugin } from 'prosemirror-state'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'
import { SlashCommand } from './SlashCommand'

// Helper function to detect if text looks like Markdown
const looksLikeMarkdown = (text) => {
    if (!text) return false
    return /(^#{1,6}\s)|(^\s*[-*]\s+)|(^\s*\d+\.\s+)|(^>\s+)|(```)|(`[^`]+`)|(\*\*[^*]+\*\*)/m.test(text)
}

const escapeHtml = (text) => {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

const markdownToHtml = (markdown) => {
    if (!markdown) return ''
    let html = markdown.replace(/\r\n/g, '\n')
    html = html.replace(/```([\s\S]*?)```/g, (_match, code) => `<pre><code>${escapeHtml(code)}</code></pre>`)
    html = html
        .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
        .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
        .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
        .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
        .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
        .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
    const lines = html.split('\n')
    const out = []
    let inUl = false
    let inOl = false
    const closeLists = () => {
        if (inUl) { out.push('</ul>'); inUl = false }
        if (inOl) { out.push('</ol>'); inOl = false }
    }
    for (const raw of lines) {
        const line = raw.trimEnd()
        if (!line.trim()) { closeLists(); continue }
        const ulMatch = line.match(/^[-*]\s+(.+)$/)
        const olMatch = line.match(/^\d+\.\s+(.+)$/)
        if (ulMatch) {
            if (inOl) { out.push('</ol>'); inOl = false }
            if (!inUl) { out.push('<ul>'); inUl = true }
            out.push(`<li>${ulMatch[1]}</li>`)
            continue
        }
        if (olMatch) {
            if (inUl) { out.push('</ul>'); inUl = false }
            if (!inOl) { out.push('<ol>'); inOl = true }
            out.push(`<li>${olMatch[1]}</li>`)
            continue
        }
        closeLists()
        if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<blockquote')) {
            out.push(line)
            continue
        }
        out.push(`<p>${line}</p>`)
    }
    closeLists()
    return out.join('\n')
}

const SmartPasteMarkdown = Extension.create({
    name: 'smartPasteMarkdown',
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handlePaste: (_view, event) => {
                        const text = event?.clipboardData?.getData('text/plain') || ''
                        if (!looksLikeMarkdown(text)) return false
                        event.preventDefault()
                        this.editor.commands.insertContent(markdownToHtml(text))
                        return true
                    },
                },
            }),
        ]
    },
})

const TipTapEditor = ({ blog = null, onSave, onCancel, theme = 'light' }) => {
    const [title, setTitle] = useState(blog?.title || '')
    const [excerpt, setExcerpt] = useState(blog?.excerpt || '')
    const [author, setAuthor] = useState(blog?.author || 'Admin')
    const [status, setStatus] = useState(blog?.status || 'draft')
    const [tags, setTags] = useState(blog?.tags?.join(', ') || '')
    const [featuredImage, setFeaturedImage] = useState(blog?.featuredImage || '')
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState(null)
    const [stats, setStats] = useState({ words: 0, chars: 0, minutes: 1 })

    const updateStats = (text) => {
        const trimmed = text.trim()
        const words = trimmed ? trimmed.split(/\s+/).length : 0
        const chars = trimmed.length
        const minutes = Math.max(1, Math.round(words / 200))
        setStats({ words, chars, minutes })
    }

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4, 5, 6] },
            }),
            Image.configure({
                HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-blue-600 hover:text-blue-800 underline' },
            }),
            Underline,
            HorizontalRule,
            TaskList.configure({ HTMLAttributes: { class: 'task-list' } }),
            TaskItem.configure({ HTMLAttributes: { class: 'task-item' } }),
            Placeholder.configure({
                placeholder: "Type '/' for commands, or start writing...",
            }),
            SlashCommand,
            SmartPasteMarkdown,
        ],
        content: blog?.content || '',
        editorProps: {
            attributes: {
                class: `notion-editor ${theme === 'dark' ? 'notion-editor-dark' : ''}`,
            },
        },
        onUpdate: ({ editor }) => {
            const plainText = editor.getText()
            if (plainText && !excerpt) {
                setExcerpt(plainText.substring(0, 150) + '...')
            }
            updateStats(plainText)
        },
    })

    useEffect(() => {
        if (editor && blog?.content) {
            editor.commands.setContent(blog.content)
            updateStats(editor.getText())
        }
    }, [blog?.content, editor])

    useEffect(() => {
        if (editor) {
            updateStats(editor.getText())
        }
    }, [editor])

    const handleSave = async (saveStatus = status) => {
        if (!title.trim() || !editor?.getText().trim()) {
            toast.error('Title and content are required')
            return
        }
        setIsSaving(true)
        try {
            const content = editor?.getHTML() || ''
            const blogData = {
                title: title.trim(),
                content,
                excerpt: excerpt.trim() || editor?.getText().substring(0, 150) + '...',
                author: author.trim(),
                status: saveStatus,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                featuredImage: featuredImage.trim()
            }
            const url = blog?.id ? '/api/blogs' : '/api/blogs'
            const method = blog?.id ? 'PUT' : 'POST'
            if (blog?.id) blogData.id = blog.id

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success(`Blog ${saveStatus === 'published' ? 'published' : 'saved as draft'} successfully!`)
                setLastSaved(new Date())
                onSave?.(result.blog)
            } else {
                toast.error(result.error || 'Failed to save blog')
            }
        } catch (error) {
            console.error('Error saving blog:', error)
            toast.error('Failed to save blog')
        } finally {
            setIsSaving(false)
        }
    }

    if (!editor) {
        return (
            <div className="notion-editor-loading">
                <div className="notion-editor-loading-spinner" />
                <span>Loading editor...</span>
            </div>
        )
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="notion-blog-editor bg-white text-slate-900">
                {/* Compact Header */}
                <header className="notion-editor-header sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
                    <div className="notion-editor-header-left">
                        <button type="button" onClick={onCancel} className="notion-btn notion-btn-ghost">
                            Back
                        </button>
                        {lastSaved && (
                            <span className="notion-last-saved">
                                Saved {format(lastSaved, 'MMM d, HH:mm')}
                            </span>
                        )}
                    </div>
                    <div className="notion-editor-actions">
                        <button
                            type="button"
                            onClick={() => handleSave('draft')}
                            disabled={isSaving}
                            className="notion-btn notion-btn-secondary"
                        >
                            {isSaving ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSave('published')}
                            disabled={isSaving}
                            className="notion-btn notion-btn-primary"
                        >
                            {isSaving ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </header>

                <div className="notion-meta-bar sticky top-[72px] z-20 grid grid-cols-1 gap-2 border-b border-slate-100/80 bg-white/85 px-6 py-3 backdrop-blur sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
                    <span className={`notion-pill ${status}`}>{status === 'published' ? 'Published' : 'Draft'}</span>
                    <div className="notion-meta-group">
                        <span>{stats.words} words</span>
                        <span className="meta-divider">|</span>
                        <span>~{stats.minutes} min read</span>
                        <span className="meta-divider">|</span>
                        <span>{stats.chars} chars</span>
                    </div>
                    <div className="notion-meta-group subtle">
                        <span>{blog?.title ? 'Editing existing post' : 'New blog post'}</span>
                        {lastSaved && <span className="meta-divider">|</span>}
                        {lastSaved && <span>Last saved {format(lastSaved, 'MMM d, HH:mm')}</span>}
                    </div>
                </div>

                <div className="notion-editor-layout mx-auto grid max-w-screen-2xl gap-10 px-6 pb-16 pt-8 lg:px-10 xl:grid-cols-[minmax(0,1fr)_300px]">
                    {/* Main Editor */}
                    <div className="notion-editor-main min-w-0 space-y-6">
                        <input
                            type="text"
                            placeholder="Untitled"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="notion-title-input w-full border-0 bg-transparent text-4xl font-semibold leading-tight tracking-tight text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-0 md:text-5xl"
                        />

                        <div className="notion-editor-wrapper rounded-2xl bg-white p-4 md:p-6">
                            {editor && (
                                <BubbleMenu
                                    editor={editor}
                                    updateDelay={100}
                                    options={{ placement: 'top' }}
                                    className="notion-bubble-menu"
                                >
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        className={editor.isActive('bold') ? 'active' : ''}
                                    >
                                        <strong>B</strong>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                        className={editor.isActive('italic') ? 'active' : ''}
                                    >
                                        <em>I</em>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                                        className={editor.isActive('underline') ? 'active' : ''}
                                    >
                                        <u>U</u>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => editor.chain().focus().toggleStrike().run()}
                                        className={editor.isActive('strike') ? 'active' : ''}
                                    >
                                        <s>S</s>
                                    </button>
                                    <span className="notion-bubble-divider" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const url = window.prompt('Enter URL:')
                                            if (url) editor.chain().focus().setLink({ href: url }).run()
                                        }}
                                        className={editor.isActive('link') ? 'active' : ''}
                                    >
                                        🔗
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const url = window.prompt('Enter image URL:')
                                            if (url) editor.chain().focus().setImage({ src: url }).run()
                                        }}
                                    >
                                        Image
                                    </button>
                                </BubbleMenu>
                            )}
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="notion-editor-sidebar xl:ml-auto flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 xl:sticky xl:top-28 xl:h-fit xl:gap-5">
                        <div className="notion-sidebar-section space-y-2">
                            <label>Excerpt</label>
                            <textarea
                                placeholder="Brief description..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                            />
                        </div>
                        <div className="notion-sidebar-section">
                            <label>Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="notion-sidebar-section space-y-2">
                            <label>Tags</label>
                            <input
                                type="text"
                                placeholder="react, javascript"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        <div className="notion-sidebar-section space-y-2">
                            <label>Featured Image</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                value={featuredImage}
                                onChange={(e) => setFeaturedImage(e.target.value)}
                            />
                        </div>
                        <div className="notion-sidebar-section space-y-2">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx global>{`
                .notion-blog-editor {
                    min-height: 100vh;
                    background: #fff;
                    color: #0f172a;
                }

                .notion-editor-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    gap: 1rem;
                    color: var(--color-text-secondary);
                }

                .notion-editor-loading-spinner {
                    width: 32px;
                    height: 32px;
                    border: 3px solid var(--color-border);
                    border-top-color: var(--color-accent);
                    border-radius: 50%;
                    animation: notion-spin 0.8s linear infinite;
                }

                @keyframes notion-spin {
                    to { transform: rotate(360deg); }
                }

                .notion-editor-header {
                    border-bottom: 1px solid #e5e7eb;
                    background: #ffffffeb;
                }

                .notion-editor-header-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .notion-last-saved {
                    font-size: 12px;
                    color: var(--color-text-muted);
                }

                .notion-meta-bar {
                    border-bottom: 1px solid #e5e7eb;
                }

                .notion-meta-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #475569;
                    font-size: 13px;
                    flex-wrap: wrap;
                }

                .notion-meta-group.subtle {
                    justify-content: flex-end;
                }

                .meta-divider {
                    color: #e2e8f0;
                }

                .notion-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: capitalize;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                }

                .notion-pill.published {
                    color: var(--color-accent);
                    border-color: var(--color-accent);
                    background: rgba(0,0,0,0.03);
                }

                .notion-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.15s ease;
                }

                .notion-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .notion-btn-ghost {
                    background: transparent;
                    color: var(--color-text-secondary);
                    border: none;
                }

                .notion-btn-ghost:hover {
                    color: var(--color-text-primary);
                }

                .notion-btn-secondary {
                    background: var(--color-surface);
                    color: var(--color-text-primary);
                    border: 1px solid var(--color-border);
                }

                .notion-btn-secondary:hover:not(:disabled) {
                    background: var(--color-border);
                }

                .notion-btn-primary {
                    background: var(--color-accent);
                    color: var(--color-bg);
                    border: none;
                }

                .notion-btn-primary:hover:not(:disabled) {
                    filter: brightness(1.05);
                }

                .notion-editor-actions {
                    display: flex;
                    gap: 8px;
                }

                .notion-mobile-actions {
                    display: none;
                    position: sticky;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 12px 16px;
                    background: var(--color-surface);
                    border-top: 1px solid var(--color-border);
                    justify-content: space-between;
                    gap: 12px;
                    z-index: 6;
                }

                .notion-editor-layout {
                    min-height: calc(100vh - 160px);
                }

                .notion-editor-wrapper {
                    position: relative;
                }

                .notion-editor-wrapper :global(.ProseMirror) {
                    outline: none;
                    min-height: 400px;
                    font-size: 1.0625rem;
                    line-height: 1.75;
                    color: var(--color-text-primary);
                }

                .notion-editor-wrapper :global(.ProseMirror [data-placeholder]::before) {
                    content: attr(data-placeholder);
                    float: left;
                    color: var(--color-text-muted);
                    pointer-events: none;
                    height: 0;
                }

                .notion-editor-wrapper :global(.ProseMirror h1) {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin: 2rem 0 0.75rem;
                    line-height: 1.3;
                }

                .notion-editor-wrapper :global(.ProseMirror h2) {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 1.75rem 0 0.5rem;
                    line-height: 1.35;
                }

                .notion-editor-wrapper :global(.ProseMirror h3) {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 1.5rem 0 0.5rem;
                    line-height: 1.4;
                }

                .notion-editor-wrapper :global(.ProseMirror p) {
                    margin: 0.5rem 0;
                }

                .notion-editor-wrapper :global(.ProseMirror ul),
                .notion-editor-wrapper :global(.ProseMirror ol) {
                    margin: 0.75rem 0;
                    padding-left: 1.5rem;
                }

                .notion-editor-wrapper :global(.ProseMirror li) {
                    margin: 0.25rem 0;
                }

                .notion-editor-wrapper :global(.ProseMirror blockquote) {
                    margin: 1rem 0;
                    padding: 0.75rem 1.25rem;
                    border-left: 4px solid var(--color-accent);
                    background: var(--color-surface);
                    border-radius: 0 8px 8px 0;
                    font-style: italic;
                    color: var(--color-text-secondary);
                }

                .notion-editor-wrapper :global(.ProseMirror pre) {
                    margin: 1rem 0;
                    padding: 1rem 1.25rem;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    overflow-x: auto;
                    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }

                .notion-editor-wrapper :global(.ProseMirror code) {
                    background: var(--color-surface);
                    padding: 0.15em 0.4em;
                    border-radius: 4px;
                    font-family: 'SF Mono', Monaco, monospace;
                    font-size: 0.9em;
                }

                .notion-editor-wrapper :global(.ProseMirror pre code) {
                    background: transparent;
                    padding: 0;
                }

                .notion-editor-wrapper :global(.ProseMirror img) {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 1rem 0;
                }

                .notion-editor-wrapper :global(.ProseMirror hr) {
                    border: none;
                    border-top: 2px solid var(--color-border);
                    margin: 2rem 0;
                }

                .notion-editor-wrapper :global(.ProseMirror a) {
                    color: var(--color-accent);
                    text-decoration: underline;
                }

                .notion-editor-wrapper :global(.ProseMirror .task-list) {
                    list-style: none;
                    padding-left: 0;
                }

                .notion-editor-wrapper :global(.ProseMirror .task-item) {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .notion-editor-wrapper :global(.ProseMirror .task-item input) {
                    margin: 0;
                }

                .notion-bubble-menu {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    padding: 4px 6px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .notion-bubble-menu button {
                    padding: 6px 10px;
                    border: none;
                    background: transparent;
                    color: var(--color-text-secondary);
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.15s;
                }

                .notion-bubble-menu button:hover {
                    background: var(--color-border);
                    color: var(--color-text-primary);
                }

                .notion-bubble-menu button.active {
                    background: var(--color-accent);
                    color: var(--color-bg);
                }

                .notion-bubble-divider {
                    width: 1px;
                    height: 20px;
                    background: var(--color-border);
                    margin: 0 4px;
                }

                .notion-sidebar-section label {
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #94a3b8;
                }

                .notion-sidebar-section input,
                .notion-sidebar-section textarea,
                .notion-sidebar-section select {
                    width: 100%;
                    padding: 10px 12px;
                    font-size: 14px;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    background: #fff;
                    color: #0f172a;
                    font-family: inherit;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .notion-sidebar-section input:focus,
                .notion-sidebar-section textarea:focus,
                .notion-sidebar-section select:focus {
                    outline: none;
                    border-color: #cbd5e1;
                    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2);
                }

                .notion-sidebar-section textarea {
                    resize: vertical;
                    min-height: 72px;
                }

                .slash-command-menu {
                    min-width: 220px;
                    padding: 6px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                    max-height: 320px;
                    overflow-y: auto;
                }

                .slash-command-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    padding: 10px 12px;
                    border: none;
                    background: transparent;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    color: var(--color-text-primary);
                    text-align: left;
                    transition: background 0.15s;
                }

                .slash-command-item:hover,
                .slash-command-item.selected {
                    background: var(--color-border);
                }

                .slash-command-icon {
                    width: 24px;
                    font-size: 16px;
                    text-align: center;
                }

                .slash-command-empty {
                    padding: 12px;
                    font-size: 14px;
                    color: var(--color-text-muted);
                }

                @media (max-width: 768px) {
                    .notion-meta-bar {
                        grid-template-columns: 1fr;
                        align-items: flex-start;
                    }

                    .notion-meta-group.subtle {
                        justify-content: flex-start;
                    }

                    .notion-editor-layout {
                        grid-template-columns: 1fr;
                    }

                    .notion-editor-main {
                        padding: 24px 20px 60px;
                    }

                    .notion-title-input {
                        font-size: 2rem;
                    }

                    .notion-editor-sidebar {
                        border-left: none;
                        border-top: 1px solid #e5e7eb;
                    }

                    .notion-mobile-actions {
                        display: flex;
                    }

                    .notion-editor-actions {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default TipTapEditor


