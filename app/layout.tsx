import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/app/theme-provider"
import { LensProvider } from '@/app/lens-provider'
import { Web3ModalProvider } from '@/app/web3modal-provider'
import { Nav } from '@/components/nav'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <LensProvider>
              <Nav />
              {children}
            </LensProvider>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

