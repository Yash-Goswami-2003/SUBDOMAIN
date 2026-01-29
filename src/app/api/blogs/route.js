import { getAllBlogs, getBlogById } from '@/lib/blogManager'

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
