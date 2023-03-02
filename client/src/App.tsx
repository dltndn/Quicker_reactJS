import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import { Buffer } from "buffer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommissionPage from "./pages/commission";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import ChattingPage from "./pages/ChattingPage";
import TestPage2 from "./pages/TestPage2";
import ImformationPage from "./pages/ImformationPage";
import OrderlistPage from "./pages/OrderlistPage";
import FulfillmentlistPage from "./pages/FulfillmentlistPage";
import React from "react";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const chains = [polygonMumbai];
const projectId = process.env.REACT_APP_PROJECTID

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId ?? "" }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: "1",
    appName: "web3Modal",
    chains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  const { theme, setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "dark",
    themeColor: "default",
    themeBackground: "gradient",
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chatting" element={<ChattingPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/imformation" element={<ImformationPage />} />
            <Route path="/test2" element={<TestPage2 />} />
            <Route path="/orderlist" element={<OrderlistPage />} />
            <Route path="/fulfillmentlist" element={<FulfillmentlistPage />} />
          </Routes>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId ?? ""}
        ethereumClient={ethereumClient}
        themeBackground={theme.themeBackground}
      />
    </>
  );
}

export default App;