import { getPortfolioConfig } from '@/lib/portfolioConfig'

export async function GET() {
  const config = await getPortfolioConfig()

  return new Response(JSON.stringify({ config }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

