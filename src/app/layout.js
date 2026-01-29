import './globals.css'
import { Inter, Poppins, Playfair_Display } from 'next/font/google'
import { getThemes } from '@/lib/themeData'
import { ThemeProvider } from '@/context/ThemeContext'

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

export default async function RootLayout({ children }) {
  const themes = await getThemes()

  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider initialThemes={themes}>
          <Navbar />
          <div style={{ paddingTop: '80px' }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
