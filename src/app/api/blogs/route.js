import { getAllBlogs, getBlogById } from '@/lib/blogManager'
import connectToDatabase from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const blog = await getBlogById(id)
        if (!blog) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }
        return new Response(JSON.stringify({ blog }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const blogs = await getAllBlogs()
    return new Response(JSON.stringify({ blogs }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { title, content, excerpt, author, status = 'draft', tags = [], featuredImage = '' } = body

        if (!title || !content) {
            return new Response(JSON.stringify({ error: 'Title and content are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const client = await connectToDatabase()
        const db = client.db("yashgoswami")
        
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim() + '-' + Date.now()

        const newBlog = {
            documentType: 'blog',
            id: new ObjectId().toString(),
            title,
            slug,
            excerpt: excerpt || content.substring(0, 150) + '...',
            content,
            author: author || 'Admin',
            status,
            tags,
            featuredImage,
            createdAt: new Date(),
            updatedAt: new Date(),
            readTime: Math.ceil(content.split(' ').length / 200) + ' min'
        }

        const result = await db.collection("website").insertOne(newBlog)
        
        return new Response(JSON.stringify({ 
            success: true, 
            blog: { ...newBlog, _id: result.insertedId.toString() }
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error('Error creating blog:', error)
        return new Response(JSON.stringify({ error: 'Failed to create blog' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export async function PUT(request) {
    try {
        const body = await request.json()
        const { id, title, content, excerpt, author, status, tags, featuredImage } = body

        if (!id) {
            return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const client = await connectToDatabase()
        const db = client.db("yashgoswami")
        
        const updateData = {
            updatedAt: new Date()
        }

        if (title) {
            updateData.title = title
            updateData.slug = title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim() + '-' + Date.now()
        }
        if (content) {
            updateData.content = content
            updateData.readTime = Math.ceil(content.split(' ').length / 200) + ' min'
        }
        if (excerpt !== undefined) updateData.excerpt = excerpt
        if (author !== undefined) updateData.author = author
        if (status !== undefined) updateData.status = status
        if (tags !== undefined) updateData.tags = tags
        if (featuredImage !== undefined) updateData.featuredImage = featuredImage

        const result = await db.collection("website").updateOne(
            { id: id, documentType: 'blog' },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const updatedBlog = await db.collection("website").findOne({ id: id, documentType: 'blog' })
        
        return new Response(JSON.stringify({ 
            success: true, 
            blog: { ...updatedBlog, _id: updatedBlog._id.toString() }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error('Error updating blog:', error)
        return new Response(JSON.stringify({ error: 'Failed to update blog' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const client = await connectToDatabase()
        const db = client.db("yashgoswami")
        
        const result = await db.collection("website").deleteOne({ id: id, documentType: 'blog' })

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Blog not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error('Error deleting blog:', error)
        return new Response(JSON.stringify({ error: 'Failed to delete blog' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
