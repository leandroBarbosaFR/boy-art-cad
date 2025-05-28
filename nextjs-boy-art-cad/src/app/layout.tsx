import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import {ThemeProvider} from 'next-themes'
import Header from '../app/components/Header'
import Footer from '../app/components/Footer'

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
  title: 'BOY ART CAD ',
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
       <Header />
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
