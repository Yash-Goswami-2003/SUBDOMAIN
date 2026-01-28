'use client'

import HeroSection from '@/components/Portfolio/HeroSection'
import QuickStats from '@/components/Portfolio/QuickStats'
import AboutMe from '@/components/Portfolio/AboutMe'
import FeaturedProject from '@/components/Portfolio/FeaturedProject'
import Footer from '@/components/Portfolio/Footer'
import Loader from '@/components/Portfolio/Loader'
import { useProfileData } from '@/context/ProfileDataContext'

export default function Home() {
  const { data, loading, error } = useProfileData()

  if (loading) return <Loader />

  if (error) {
    return (
      <main className="page-transition" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ color: 'var(--color-error)' }}>Error loading portfolio data</div>
        <button onClick={() => window.location.reload()} className="button">Retry</button>
      </main>
    )
  }

  if (!data) return null

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


