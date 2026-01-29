import { getPortfolioConfig } from '@/lib/portfolioConfig'
import ProjectsPageClient from '@/components/Portfolio/ProjectsPageClient'

export const dynamic = 'force-static'

export default async function Projects() {
  const data = await getPortfolioConfig()
  return <ProjectsPageClient data={data} />
}

