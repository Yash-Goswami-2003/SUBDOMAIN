'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast'

const BlogList = ({ onEdit, theme = 'light' }) => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs')
            const result = await response.json()
            if (result.blogs) {
                setBlogs(result.blogs)
            }
        } catch (error) {
            console.error('Error fetching blogs:', error)
            toast.error('Failed to fetch blogs')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (blogId) => {
        try {
            const response = await fetch(`/api/blogs?id=${blogId}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            
            if (result.success) {
                toast.success('Blog deleted successfully')
                setBlogs(blogs.filter(blog => blog.id !== blogId))
                setDeleteConfirm(null)
            } else {
                toast.error(result.error || 'Failed to delete blog')
            }
        } catch (error) {
            console.error('Error deleting blog:', error)
            toast.error('Failed to delete blog')
        }
    }

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             blog.author.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status) => {
        return status === 'published' ? '#10b981' : '#f59e0b'
    }

    const getStatusBg = (status) => {
        return status === 'published' ? '#d1fae5' : '#fed7aa'
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                color: 'var(--color-text-secondary)'
            }}>
                Loading blogs...
            </div>
        )
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="blog-list" style={{
                backgroundColor: '#fff',
                color: '#0f172a',
                padding: '12px 0',
                maxWidth: '1160px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            margin: 0,
                            color: '#0f172a'
                        }}>
                            Blogs
                        </h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#64748b',
                            margin: '4px 0 0 0'
                        }}>
                            Manage your blog posts
                        </p>
                    </div>
                    <button
                        onClick={() => onEdit(null)}
                        style={{
                            padding: '10px 18px',
                            backgroundColor: '#0f172a',
                            color: '#fff',
                            border: '1px solid #0f172a',
                            borderRadius: '999px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 12px 30px rgba(15,23,42,0.12)',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        New Blog
                    </button>
                </div>

                {/* Filters */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                            color: '#0f172a',
                            fontSize: '14px'
                        }}
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                            color: '#0f172a',
                            fontSize: '14px'
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Blog Grid */}
                {filteredBlogs.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            margin: '0 0 8px 0',
                            color: 'var(--color-text-primary)'
                        }}>
                            {searchTerm || statusFilter !== 'all' ? 'No blogs found' : 'No blogs yet'}
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            margin: 0
                        }}>
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your filters' 
                                : 'Create your first blog to get started'}
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                    }}>
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                style={{
                                    padding: '18px 20px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '14px',
                                    backgroundColor: '#fff',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 10px 30px rgba(15,23,42,0.04)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '16px'
                                }}>
                                    {/* Blog Info */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '8px'
                                        }}>
                                            <h3 style={{
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                margin: 0,
                                                color: '#0f172a',
                                                cursor: 'pointer'
                                            }}>
                                                {blog.title}
                                            </h3>
                                            <span style={{
                                                padding: '4px 8px',
                                                backgroundColor: getStatusBg(blog.status),
                                                color: getStatusColor(blog.status),
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                borderRadius: '4px',
                                                textTransform: 'uppercase'
                                            }}>
                                                {blog.status}
                                            </span>
                                        </div>
                                        
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#475569',
                                            margin: '0 0 12px 0',
                                            lineHeight: '1.5'
                                        }}>
                                            {blog.excerpt}
                                        </p>
                                        
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            fontSize: '12px',
                                            color: '#64748b'
                                        }}>
                                            <span>By {blog.author}</span>
                                            <span>|</span>
                                            <span>{blog.readTime}</span>
                                            <span>|</span>
                                            <span>
                                                {blog.createdAt 
                                                    ? format(new Date(blog.createdAt), 'MMM dd, yyyy')
                                                    : 'No date'
                                                }
                                            </span>
                                        </div>
                                        
                                        {blog.tags && blog.tags.length > 0 && (
                                            <div style={{
                                                display: 'flex',
                                                gap: '6px',
                                                marginTop: '12px',
                                                flexWrap: 'wrap'
                                            }}>
                                                {blog.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            padding: '2px 8px',
                                                            backgroundColor: '#f8fafc',
                                                            color: '#475569',
                                                            fontSize: '11px',
                                                            borderRadius: '12px',
                                                            border: '1px solid #e2e8f0'
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px'
                                    }}>
                                        <button
                                            onClick={() => onEdit(blog)}
                                            style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'transparent',
                                                color: 'var(--color-text-primary)',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(blog.id)}
                                            style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'transparent',
                                                color: '#ef4444',
                                                border: '1px solid #ef4444',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'var(--color-bg)',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '400px',
                            width: '90%',
                            border: `1px solid var(--color-border)`
                        }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                margin: '0 0 12px 0',
                                color: 'var(--color-text-primary)'
                            }}>
                                Delete Blog
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'var(--color-text-secondary)',
                                margin: '0 0 20px 0',
                                lineHeight: '1.5'
                            }}>
                                Are you sure you want to delete this blog? This action cannot be undone.
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: 'transparent',
                                        color: 'var(--color-text-primary)',
                                        border: `1px solid var(--color-border)`,
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BlogList

