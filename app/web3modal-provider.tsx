'use client'

import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

export function Web3ModalProvider({ children }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider 
      theme="retro" 
      customTheme={{
        "--ck-overlay-background": "rgba(212, 177, 250, 0.68)",
        "--ck-body-background": "rgba(212, 177, 250, 0.68)",
        "--ck-overlay-backdrop-filter": "blur(16px)",
        "--ck-primary-button-hover-background": "rgba(212, 177, 250, 0.68)",
        "--ck-secondary-button-hover-background": "rgba(212, 177, 250, 0.68)",
        "--ck-secondary-button-color": "#373737",
        "--ck-connectbutton-hover-background": "rgba(212, 177, 250, 0.68)",
      }}
      options={{
          embedGoogleFonts: true,
        }}
      debugMode>
      {children}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}