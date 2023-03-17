import { WagmiConfig, createClient, configureChains, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme, } from "@web3modal/react";
import { Buffer } from "buffer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommissionPage from "./pages/commission";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import ChattingPage from "./pages/ChattingPage";
import ProfilePage from "./pages/ProfilePage";
import TestPage2 from "./pages/TestPage2";
import OrderlistPage from "./pages/OrderlistPage";
import FulfillmentlistPage from "./pages/FulfillmentlistPage";
import Profile_settingPage from "./pages/Profile_settingPage";
import React, { useEffect } from "react";

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
  const { address } = useAccount()

  setTheme({
    themeMode: "dark",
    themeColor: "default",
    themeBackground: "gradient",
  });

  useEffect(() => {
    console.log("changed user wallet")
    console.log(address)
  }, [address])

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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test2" element={<TestPage2 />} />
            <Route path="/orderlist" element={<OrderlistPage />} />
            <Route path="/fulfillmentlist" element={<FulfillmentlistPage />} />
            <Route path="/profile/setting" element={<Profile_settingPage />} />
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
//temp

export default App;