import { blogData } from '@/data/blogs'

export async function getAllBlogs() {
    // Simulate API delay
    return blogData
}

export async function getBlogById(id) {
    return blogData.find(b => b.id === id)
}
