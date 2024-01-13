import "@mantine/core/styles.css";
import { Inter } from 'next/font/google'
import { LensProvider } from '@/app/lens-provider'
import { Web3ModalProvider } from '@/app/web3modal-provider'
import { MantineProvider } from "@mantine/core";
import { MantineAppShell } from '@/components/AppShell/MantineAppShell';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <MantineProvider>
          <Web3ModalProvider>
            <LensProvider>
              <MantineAppShell>
              {children}
              </MantineAppShell>
            </LensProvider>
          </Web3ModalProvider>
          </MantineProvider>
      </body>
    </html>
  )
}

