import './globals.css'
import { Inter, Poppins, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})
const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata = {
  title: 'Yash Goswami - Full Stack Developer Portfolio',
  description: 'Creative full stack developer portfolio showcasing 11 months of experience with modern web technologies',
  keywords: 'Full Stack Developer, React, Next.js, JavaScript, Web Development',
  authors: [{ name: 'Yash Goswami' }],
  openGraph: {
    title: 'Yash Goswami - Full Stack Developer',
    description: 'Crafting elegant digital solutions with modern web technologies',
    type: 'website',
  }
}

import Navbar from '@/components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-slate-900 text-white overflow-x-hidden`}>
        <Navbar />
        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
