import HeroSection from '@/components/Portfolio/HeroSection'
import QuickStats from '@/components/Portfolio/QuickStats'
import AboutMe from '@/components/Portfolio/AboutMe'
import FeaturedProject from '@/components/Portfolio/FeaturedProject'
import Footer from '@/components/Portfolio/Footer'
import { getPortfolioConfig } from '@/lib/portfolioConfig'
import ConfigProvider from '@/components/Providers/ConfigProvider'

export const revalidate = 60;

export default async function Home() {
  const data = await getPortfolioConfig()

  return (
    <ConfigProvider initialData={data}>
      <main className="page-transition">
        <HeroSection data={data} />
        <QuickStats data={data} />
        <AboutMe data={data} />
        <FeaturedProject data={data} />
        <Footer data={data} />
      </main>
    </ConfigProvider>
  )
}
