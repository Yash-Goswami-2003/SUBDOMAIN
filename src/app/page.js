import HeroSection from '@/components/Portfolio/HeroSection'
import QuickStats from '@/components/Portfolio/QuickStats'
import AboutMe from '@/components/Portfolio/AboutMe'
import FeaturedProject from '@/components/Portfolio/FeaturedProject'
import LatestInsights from '@/components/Portfolio/LatestInsights'
import Footer from '@/components/Portfolio/Footer'
import { getPortfolioConfig } from '@/lib/portfolioConfig'
import { getAllBlogs } from '@/lib/blogManager'
import ConfigProvider from '@/components/Providers/ConfigProvider'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const data = await getPortfolioConfig()
  const blogs = await getAllBlogs()

  return (
    <ConfigProvider initialData={data}>
      <main className="page-transition">
        <HeroSection data={data} />
        <QuickStats data={data} />
        <AboutMe data={data} />
        <FeaturedProject data={data} />
        <LatestInsights blogs={blogs} />
        <Footer data={data} />
      </main>
    </ConfigProvider>
  )
}
