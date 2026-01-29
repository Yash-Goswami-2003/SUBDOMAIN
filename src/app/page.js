import HeroSection from '@/components/Portfolio/HeroSection'
import QuickStats from '@/components/Portfolio/QuickStats'
import AboutMe from '@/components/Portfolio/AboutMe'
import FeaturedProject from '@/components/Portfolio/FeaturedProject'
import Footer from '@/components/Portfolio/Footer'
import { getPortfolioConfig } from '@/lib/portfolioConfig'

export const dynamic = 'force-static'

export default async function Home() {
  const data = await getPortfolioConfig()

  return (
    <main className="page-transition">
      <HeroSection data={data} />
      <QuickStats data={data} />
      <AboutMe data={data} />
      <FeaturedProject />
      <Footer data={data} />
    </main>
  )
}

