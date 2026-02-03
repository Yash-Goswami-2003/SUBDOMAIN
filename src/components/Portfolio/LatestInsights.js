'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export default function LatestInsights({ blogs = [] }) {
    const latestBlogs = blogs.slice(0, 3)
    const [blogBaseUrl, setBlogBaseUrl] = useState('')

    useEffect(() => {
        // Generate subdomain URL based on current host
        const currentHost = window.location.host
        const protocol = window.location.protocol

        // Handle localhost development
        if (currentHost.includes('localhost')) {
            const port = currentHost.includes(':') ? ':' + currentHost.split(':')[1] : ''
            setBlogBaseUrl(`${protocol}//blogs.localhost${port}`)
        } else {
            // Handle production domain (e.g., yashgoswami.com -> blogs.yashgoswami.com)
            const parts = currentHost.split('.')
            // If already on a subdomain, get the root domain
            const rootDomain = parts.length > 2 ? parts.slice(-2).join('.') : currentHost
            setBlogBaseUrl(`${protocol}//blogs.${rootDomain}`)
        }
    }, [])

    if (latestBlogs.length === 0) {
        return null
    }

    return (
        <section className="insights-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Latest Insights</h2>
                    <a href={blogBaseUrl || '#'} className="view-all">View all →</a>
                </div>

                <div className="blogs-grid">
                    {latestBlogs.map((blog, index) => (
                        <a
                            key={blog.id || index}
                            href={blogBaseUrl ? `${blogBaseUrl}?blogID=${blog.id}` : '#'}
                            className="blog-card"
                        >
                            <span className="blog-date">
                                {blog.date ? format(new Date(blog.date), 'MMM dd') : 'No date'}
                            </span>
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-excerpt">{blog.excerpt || blog.description}</p>
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .insights-section {
                    padding: 2.5rem 0;
                    border-top: 1px solid var(--color-border);
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                .view-all {
                    font-size: 0.8125rem;
                    color: var(--color-text-secondary);
                }

                .view-all:hover {
                    color: var(--color-text-primary);
                }

                .blogs-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }

                .blog-card {
                    display: block;
                    padding: 1rem;
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    transition: border-color var(--transition-fast);
                }

                .blog-card:hover {
                    border-color: var(--color-text-muted);
                }

                .blog-date {
                    font-size: 0.6875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    color: var(--color-text-muted);
                }

                .blog-title {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    margin: 0.375rem 0;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .blog-excerpt {
                    font-size: 0.8125rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @media (max-width: 768px) {
                    .blogs-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    )
}
