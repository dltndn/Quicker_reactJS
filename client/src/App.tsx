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
import Profile_notice_writePage from "./pages/Profile_notice_writePage";
import ExplorerPage from "./pages/ExplorerPage";
import ReceipientPage from "./pages/ReceipientPage";
import ChatcssPage from "./components/ChatcssPage";
import StakingPage from "./pages/StakingPage";
import FeeGovernorPage from "./pages/FeeGovernorPage";
import NftSettingPage from "./pages/NftSettingPage";
import QR from "./pages/QR";
import { create } from "zustand";
import { getOrderList } from "./utils/ExecuteOrderFromBlockchain";
import Handler from "./lib/Handler";
import QRCode from "./pages/QRCode";


Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

interface UseConnWalletInfoType {
  address: string | undefined;
  setAddress: (data: string | undefined) => void;
  isMobile: boolean | null;
  setIsMobile: (data: boolean | null) => void;
  isConnected: boolean;
  setIsConneted: (data: boolean) => void;
}

export const useConnWalletInfo = create<UseConnWalletInfoType>((set) => ({
  address: undefined,
  setAddress: (address: string | undefined) => set({ address }),
  isMobile: null,
  setIsMobile: (isMobile: boolean | null) => set({ isMobile }),
  isConnected: false,
  setIsConneted: (isConnected: boolean) => set({ isConnected }),
}));

interface UseVerifiaction {
  isMember: boolean | null;
  setIsMember: (newIsMember: boolean) => void;
  userName: string | null;
  setUserName: (newUserName: string | null) => void;
}

export const useVerificationStore = create<UseVerifiaction>((set) => ({
  isMember: null,
  setIsMember: (isMember: boolean) => set({ isMember }),
  userName: null,
  setUserName: (userName: string | null) => set({ userName }),
}));

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
  setClientOrderNums: (clientOrderNums: string[]) => set({ clientOrderNums }),
  quickerOrderNums: [],
  setQuickerOrderNums: (quickerOrderNums: string[]) =>
    set({ quickerOrderNums }),
  userOrderNumStateTrigger: 0,
  setUserOrderNumStateTrigger: (userOrderNumStateTrigger: number) =>
    set({ userOrderNumStateTrigger }),
}));

function App() {
  const { address, setAddress, setIsConneted, setIsMobile } =
    useConnWalletInfo();
  const { isMember, setIsMember, setUserName } = useVerificationStore();
  const {
    clientOrderNums,
    setClientOrderNums,
    quickerOrderNums,
    setQuickerOrderNums,
    userOrderNumStateTrigger,
  } = UseUserOrderState();

  const getUserInfo = async (address: string | undefined) => {
    try {
      const result = await Handler.get(process.env.REACT_APP_SERVER_URL + `user/name/?walletAddress=${address}`)
      if (result) {
        setIsMember(true);
        setUserName(result.name);
      }
    } catch(e) {
      console.log(e)
    }
  };

  const getAndSetOrders = async (address: string | undefined) => {
    const clientOrderNumsArr = await getOrderList(address, true);
    const quickerOrderNumsArr = await getOrderList(address, false);
    setClientOrderNums(clientOrderNumsArr);
    setQuickerOrderNums(quickerOrderNumsArr);
  };

  // useContractEvent({
  //   address: QUICKER_ADDRESS,
  //   abi: QUICKER_CONTRACT_ABI,
  //   eventName: "AcceptedOrderNumber",
  //   async listener(node: any, label: any) {
  //     const logArr = (await label.getTransactionReceipt()).logs
  //     const orderNum = Number(logArr[logArr.length-2].data)
  //     console.log(orderNum)
  //     for (const element of clientOrderNums) {
  //       if (element === orderNum.toString()) {
  //         sdta.sendIsMatchedOrder(true)
  //         break
  //       }
  //     }
  //   },
  // });

  // useContractEvent({
  //   address: QUICKER_ADDRESS,
  //   abi: QUICKER_CONTRACT_ABI,
  //   eventName: "deliveredOrderNumber",
  //   async listener(node: any, label: any, owner) {
  //     const logArr = (await label.getTransactionReceipt()).logs
  //     const orderNum = Number(logArr[logArr.length-2].data)
  //     for (const element of clientOrderNums) {
  //       if (element === orderNum.toString()) {
  //         sdta.sendIsDeliveredOrder(true)
  //         break
  //       }
  //     }
  //   },
  // });

  // useContractEvent({
  //   address: QUICKER_ADDRESS,
  //   abi: QUICKER_CONTRACT_ABI,
  //   eventName: "completedOrderNumber",
  //   async listener(node: any, label: any ,log: any) {
  //     const logArr = (await label.getTransactionReceipt()).logs
  //     const orderNum = Number(logArr[logArr.length-2].data)
  //     for (const element of quickerOrderNums) {
  //       if (element === orderNum.toString()) {
  //         sdta.sendIsCompletedOrder(true)
  //         break
  //       }
  //     }
  //   },
  // });

  useEffect(() => {
    const storedAddress = localStorage.getItem("kaikas_address");
    const storedIsMobile = localStorage.getItem("kaikas_isMobile");
    if (storedAddress === "undefined") {
      setAddress(undefined);
      setIsConneted(false);
    } else if (storedAddress !== null) {
      setAddress(storedAddress);
      setIsConneted(true);
      // 지갑주소 유저 여부 조회
      console.log("changed user wallet");
      console.log(storedAddress);
      getUserInfo(storedAddress);
      getAndSetOrders(storedAddress);
      if (storedIsMobile === "true") {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, []);

  useEffect(() => {
    if (address) {
      // 지갑주소 유저 여부 조회
      console.log("changed user wallet");
      console.log(address);
      getUserInfo(address);
      getAndSetOrders(address);
    }
  }, [address]);

  useEffect(() => {
    getAndSetOrders(address);
    console.log("userOrderNumStateTrigger 직동");
  }, [userOrderNumStateTrigger]);

  console.log("app")
  return (
    <>
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
          <Route
            path="/profile/notice/write"
            element={<Profile_notice_writePage />}
          />
          <Route path="/orderlist" element={<OrderLogPage isClient={true} />} />
          <Route
            path="/fulfillmentlist"
            element={<OrderLogPage isClient={false} />}
          />
          <Route path="/notification" element={<Notification />} />
          <Route path="/execution/:orderNumber" element={<ExecutionPage />} />
          <Route
            path="/client_confirm/:orderNumber"
            element={<ClientConfirmPage />}
          />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/receipient" element={<ReceipientPage />} />
          <Route path="/chatcss" element={<ChatcssPage />} />
          <Route path="/testQR" element={<QR />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/feeGovernor" element={<FeeGovernorPage />} />
          <Route path="/nftSetting" element={<NftSettingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
//temp

export default App;
