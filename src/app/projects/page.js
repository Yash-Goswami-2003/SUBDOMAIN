import { getPortfolioConfig } from '@/lib/portfolioConfig'
import ProjectsPageClient from '@/components/Portfolio/ProjectsPageClient'

export const revalidate = 60;

export default async function Projects() {
  const data = await getPortfolioConfig()
  return <ProjectsPageClient data={data} />
}

