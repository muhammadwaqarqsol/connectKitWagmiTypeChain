import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from "wagmi/providers/infura";
import { Chain, WagmiConfig,configureChains,createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { polygonMumbai } from 'wagmi/chains';
import { BrowserRouter } from 'react-router-dom';
const supportedChains: Chain[] = [polygonMumbai]; 

const { webSocketPublicClient, publicClient, chains } = configureChains(
  supportedChains,
  [
     infuraProvider({ apiKey: "e1689fc2aab54b22b47bb44605ea5f2c" }),
    jsonRpcProvider({
      rpc: (chain) => {
        const supportedChain = supportedChains.find(supported => supported.id === chain.id);
        if (supportedChain) {
          const { http, webSocket } = chain.rpcUrls.default;
          return { http: http[0], webSocket: webSocket ? webSocket[0] : undefined };
        }
        return null;
      },
    }),
  ]
);

const config = createConfig(
  getDefaultConfig({
    publicClient,
    webSocketPublicClient,
    chains,
    // Required API Keys
    infuraId: process.env.REACT_APP_PUBLIC_INFURA_ID, // or infuraId
    walletConnectProjectId: process.env.REACT_APP_PUBLIC_WALLETCONNECT_PROJECT_ID || "", // Assign an empty string if it's undefined
    // Required
    appName: "TestApp",
  }),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
    <WagmiConfig config={config}>
    <ConnectKitProvider  customTheme={{
          "--ck-accent-color": "#00D54B",
          "--ck-accent-text-color": "#ffffff",
        }} mode="dark">
        <App />
      </ConnectKitProvider>
      </WagmiConfig>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
