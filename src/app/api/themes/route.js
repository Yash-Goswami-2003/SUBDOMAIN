import { themes } from '@/data/themes'

export async function GET() {
    return new Response(JSON.stringify({ themes }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
