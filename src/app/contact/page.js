import { getPortfolioConfig } from '@/lib/portfolioConfig'
import ContactPageClient from '@/components/Portfolio/ContactPageClient'

export const dynamic = 'force-dynamic'

export default async function Contact() {
  const data = await getPortfolioConfig()
  return <ContactPageClient data={data} />
}

