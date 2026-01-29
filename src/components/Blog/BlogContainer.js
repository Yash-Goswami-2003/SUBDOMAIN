'use client';

import { useState, useEffect } from 'react';
import BlogListView from './BlogListView';
import BlogDetailView from './BlogDetailView';

export default function BlogContainer({ initialBlogs, initialBlogId }) {
    const [blogs, setBlogs] = useState(initialBlogs || []);
    const [selectedBlogId, setSelectedBlogId] = useState(initialBlogId || null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        if (selectedBlogId) {
            const blog = blogs.find(b => b.id === selectedBlogId);
            setSelectedBlog(blog);
            // Update URL without refresh
            const url = new URL(window.location);
            url.searchParams.set('blogID', selectedBlogId);
            window.history.pushState({}, '', url);
        } else {
            setSelectedBlog(null);
            const url = new URL(window.location);
            url.searchParams.delete('blogID');
            window.history.pushState({}, '', url);
        }
    }, [selectedBlogId, blogs]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setSelectedBlogId(params.get('blogID'));
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (selectedBlog) {
        return (
            <BlogDetailView
                blog={selectedBlog}
                onBack={() => setSelectedBlogId(null)}
            />
        );
    }

    return (
        <BlogListView
            blogs={blogs}
            onSelectBlog={(id) => setSelectedBlogId(id)}
        />
    );
}
