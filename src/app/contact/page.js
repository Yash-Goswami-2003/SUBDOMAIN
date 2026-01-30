import { getPortfolioConfig } from '@/lib/portfolioConfig'
import ContactPageClient from '@/components/Portfolio/ContactPageClient'

export const revalidate = 60;

export default async function Contact() {
  const data = await getPortfolioConfig()
  return <ContactPageClient data={data} />
}

