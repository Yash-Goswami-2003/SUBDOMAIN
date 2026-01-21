import HeroSection from '@/components/Portfolio/HeroSection'
import ExperienceTimeline from '@/components/Portfolio/ExperienceTimeline'
import SkillsShowcase from '@/components/Portfolio/SkillsShowcase'
import CTASection from '@/components/Portfolio/CTASection'
import Footer from '@/components/Portfolio/Footer'
import { portfolioData } from '@/data/portfolio'

export default function Home() {
  return (
    <main className="bg-slate-900 text-white">
      <HeroSection data={portfolioData} />
      <ExperienceTimeline experiences={portfolioData.experienceDetails} />
      <SkillsShowcase skills={portfolioData.skills} />
      <CTASection />
      <Footer />
    </main>
  )
}
