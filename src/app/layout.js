import './globals.css'
// import { Inter, Poppins, Playfair_Display } from 'next/font/google' // Disabled due to network timeouts
import { getThemes } from '@/lib/themeData'
import { ThemeProvider } from '@/context/ThemeContext'

// Fallback fonts
const inter = { className: 'font-sans' }
const poppins = { variable: 'font-poppins' }
const playfair = { variable: 'font-serif' }

/* 
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
*/

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
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
