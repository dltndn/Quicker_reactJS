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
import OrderLogPage from "./pages/OrderLogPage";
import Profile_settingPage from "./pages/Profile_settingPage";
import React, { useEffect } from "react";
import Notification from "./components/Notification";
import ExecutionPage from "./pages/ExecutionPage";
import ClientConfirmPage from "./pages/ClientConfirmPage";
import Notice from "./components/Notice";
import { create } from 'zustand'

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

interface UseVerifiaction {
  isMember: boolean;
  setIsMember: (newIsMember:boolean) => void;
  userName: string | null;
  setUserName: (newUserName:string) => void;
}

export const useVerificationStore = create<UseVerifiaction>((set) => ({
  isMember: false,
  setIsMember: (isMember: boolean) => set({isMember}),
  userName: null,
  setUserName: (userName: string) => set({userName}),
}))

function App() {
  const { theme, setTheme } = useWeb3ModalTheme();
  const { address } = useAccount()
  const { isMember, setIsMember, setUserName } = useVerificationStore();

  setTheme({
    themeMode: "dark",
    themeColor: "default",
    themeBackground: "gradient",
  });

  useEffect(() => {
    // 지갑주소 유저 여부 조회
    console.log("changed user wallet")
    console.log(address)
    setUserName("유저이름")
    setIsMember(true)
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
            <Route path="/profile/:setting" element={<Profile_settingPage />} />
            <Route path="/profile/:notice" element={<Notice />} />
            <Route path="/orderlist" element={<OrderLogPage isClient={true} />} />
            <Route path="/fulfillmentlist" element={<OrderLogPage isClient={false} />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/execution/:orderNumber" element={<ExecutionPage />} />
            <Route path="/client_confirm/:orderNumber" element={<ClientConfirmPage />} />
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