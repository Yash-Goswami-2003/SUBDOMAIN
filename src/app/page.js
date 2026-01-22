import HeroSection from '@/components/Portfolio/HeroSection'
import Footer from '@/components/Portfolio/Footer'
import { portfolioData } from '@/data/portfolio'

export default function Home() {
  return (
    <main className="page-transition">
      <HeroSection data={portfolioData} />
      <Footer />
    </main>
  )
}

