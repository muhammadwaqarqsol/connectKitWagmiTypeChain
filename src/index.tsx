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
    infuraId: "e1689fc2aab54b22b47bb44605ea5f2c", // or infuraId
    walletConnectProjectId:"defd8975a6f9bc6507ee6f21828ef65c",
    // Required
    appName: "TestApp",
  }),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
    <ConnectKitProvider>
      <BrowserRouter>
        <App />
    </BrowserRouter>
      </ConnectKitProvider>
      </WagmiConfig>
  </React.StrictMode>
);
reportWebVitals();
