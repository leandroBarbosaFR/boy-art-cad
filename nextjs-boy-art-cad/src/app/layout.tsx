import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import CookieModal from '../app/components/CookieModal'
import Footer from '../app/components/Footer'
import Header from '../app/components/Header'
import './globals.css'

const geistSans = Poppins({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: '300',
})

const geistMono = Poppins({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: '700',
})

export const metadata: Metadata = {
  title: 'PURE PLATINE ',
  description: 'Marseille',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <CookieModal />
        <ThemeProvider
          // attribute="class"
          // defaultTheme="system"
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
