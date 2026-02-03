import { fetchServerConfig } from './serverConfig';
import { blogData } from '@/data/blogs'; // Fallback data

export async function getAllBlogs() {
    try {
        const allDocs = await fetchServerConfig();
        const blogs = allDocs.filter(doc => doc.documentType === 'blog');

        // Sort by createdAt descending (newest first)
        const sortedBlogs = blogs.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });

        // Return MongoDB data if available, otherwise fallback to static
        if (sortedBlogs.length > 0) {
            return sortedBlogs;
        }
        return blogData;
    } catch (error) {
        console.error('Failed to fetch blogs from MongoDB:', error);
        return blogData; // Fallback to static data
    }
}

export async function getBlogById(id) {
    const blogs = await getAllBlogs();
    return blogs.find(b => b.id === id);
}
