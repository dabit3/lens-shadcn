import './globals.css'
import { Inter } from 'next/font/google'

import { LensProvider } from '@/app/lens-provider'
import { Web3ModalProvider } from '@/app/web3modal-provider'


const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Web3ModalProvider>
            <LensProvider>
              {children}
            </LensProvider>
          </Web3ModalProvider>
 
      </body>
    </html>
  )
}

