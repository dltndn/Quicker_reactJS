import { WagmiConfig, createClient, configureChains, useAccount, useContractEvent } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { alchemyProvider } from 'wagmi/providers/alchemy'
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
import Profile_noticePage from "./pages/Profile_noticePage";
import ExplorerPage from "./pages/ExplorerPage";
import ReceipientPage from "./pages/ReceipientPage";
import ChatcssPage from "./components/ChatcssPage";
import QR from "./pages/QR"
import { create } from 'zustand'

import { QUICKER_ADDRESS, QUICKER_CONTRACT_ABI } from "./contractInformation";
import { SendDataToAndroid } from "./utils/SendDataToAndroid";
import { getOrderList } from "./utils/ExecuteOrderFromBlockchain";
import Handler from "./lib/Handler";
import QRCode from "./pages/QRCode";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const chains = [polygonMumbai];
const projectId = process.env.REACT_APP_PROJECTID

const { provider } = configureChains(chains, [
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY ?? "" }),
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

interface UseUserOrderStateType {
  clientOrderNums: string[];
  setClientOrderNums: (data: string[]) => void;
  quickerOrderNums: string[];
  setQuickerOrderNums: (data: string[]) => void;
  userOrderNumStateTrigger: number;
  setUserOrderNumStateTrigger: (data: number) => void;
}

export const UseUserOrderState = create<UseUserOrderStateType>((set) => ({
  clientOrderNums: [],
  setClientOrderNums: (clientOrderNums: string[]) => set({clientOrderNums}),
  quickerOrderNums: [],
  setQuickerOrderNums: (quickerOrderNums: string[]) => set({quickerOrderNums}),
  userOrderNumStateTrigger: 0,
  setUserOrderNumStateTrigger: (userOrderNumStateTrigger: number) => set({userOrderNumStateTrigger}),
}))

function App() {
  const { theme, setTheme } = useWeb3ModalTheme();
  const { address } = useAccount()
  const { isMember, setIsMember, setUserName } = useVerificationStore();
  const { clientOrderNums, setClientOrderNums, quickerOrderNums, setQuickerOrderNums, userOrderNumStateTrigger} = UseUserOrderState()

  setTheme({
    themeMode: "dark",
    themeColor: "default",
    themeBackground: "gradient",
  });

  const getUserInfo = async () => {
    const result = await Handler.post({walletAddress: address}, process.env.REACT_APP_SERVER_URL + "user/name")
    if (Object.keys(result).length !== 0) {
      setIsMember(true)
      setUserName(result.name)
    }
  }

  const getAndSetOrders = async () => {
    const clientOrderNumsArr = await getOrderList(address, true)
    const quickerOrderNumsArr = await getOrderList(address, false)
    setClientOrderNums(clientOrderNumsArr)
    setQuickerOrderNums(quickerOrderNumsArr)
  }

  const sdta = new SendDataToAndroid(address)
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "AcceptedOrderNumber",
    async listener(node: any, label: any) {
      const logArr = (await label.getTransactionReceipt()).logs
      const orderNum = Number(logArr[logArr.length-2].data)
      console.log(orderNum)
      for (const element of clientOrderNums) {
        if (element === orderNum.toString()) {
          sdta.sendIsMatchedOrder(true)
          break
        }
      }
    },
  });

  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "deliveredOrderNumber",
    async listener(node: any, label: any, owner) {
      const logArr = (await label.getTransactionReceipt()).logs
      const orderNum = Number(logArr[logArr.length-2].data)
      for (const element of clientOrderNums) {
        if (element === orderNum.toString()) {
          sdta.sendIsDeliveredOrder(true)
          break
        }
      }
    },
  });

  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "completedOrderNumber",
    async listener(node: any, label: any ,log: any) {
      const logArr = (await label.getTransactionReceipt()).logs
      const orderNum = Number(logArr[logArr.length-2].data)
      for (const element of quickerOrderNums) {
        if (element === orderNum.toString()) {
          sdta.sendIsCompletedOrder(true)
          break
        }
      }
    },
  });

  useEffect(() => {
    // 지갑주소 유저 여부 조회
    console.log("changed user wallet")
    console.log(address)
    getUserInfo()
    getAndSetOrders()
  }, [address])

  useEffect(() => {
    getAndSetOrders()
    console.log("userOrderNumStateTrigger 직동")
  }, [userOrderNumStateTrigger])

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
            <Route path="/profile/setting" element={<Profile_settingPage />} />
            <Route path="/profile/notice" element={<Profile_noticePage />} />
            <Route path="/orderlist" element={<OrderLogPage isClient={true} />} />
            <Route path="/fulfillmentlist" element={<OrderLogPage isClient={false} />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/execution/:orderNumber" element={<ExecutionPage />} />
            <Route path="/client_confirm/:orderNumber" element={<ClientConfirmPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/receipient" element={<ReceipientPage />}/>
            <Route path="/chatcss" element={<ChatcssPage />}/>
            <Route path="/testQR" element={<QR />}/>
          </Routes>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId ?? ""}
        ethereumClient={ethereumClient}
        themeBackground={theme.themeBackground}
        // themeVariables={{"--w3m-text-xsmall-bold-weight": "bold"}}
      />
    </>
  );
}
//temp

export default App;
