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

import { headers } from 'next/headers'
import Navbar from '@/components/Navbar'

export default async function RootLayout({ children }) {
  const themes = await getThemes()

  // Check if this is a subdomain request
  const headersList = headers()
  const host = headersList.get('host') || ''
  const hostname = host.split(':')[0]
  const parts = hostname.split('.')
  const isSubdomain = (hostname.endsWith('.localhost') && parts[0] !== 'localhost') ||
    (parts.length > 2 && parts[0] !== 'www')

  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider initialThemes={themes}>
          {!isSubdomain && (
            <>
              <Navbar />
              <div style={{ paddingTop: '80px' }}>
                {children}
              </div>
            </>
          )}
          {isSubdomain && children}
        </ThemeProvider>
      </body>
    </html>
  )
}
