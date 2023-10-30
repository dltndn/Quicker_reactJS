import { Buffer } from "buffer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import { create } from "zustand";
import Lottie from "lottie-react";
import LoadingAni from "./Lottie/mainLoading.json";
import { getOrderList, MANY_REQUEST_ERROR } from "./utils/ExecuteOrderFromBlockchain";
import Handler from "./lib/Handler";
import styled from "styled-components";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const MainPage = lazy(() => import('./pages/mainPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ChattingPage = lazy(() => import('./pages/ChattingPage'));
const CommissionPage = lazy(() => import('./pages/commission'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TestPage2 = lazy(() => import('./pages/TestPage2'));
const ProfileSettingPage = lazy(() => import('./pages/Profile_settingPage'));
const ProfileNoticePage = lazy(() => import('./pages/Profile_noticePage'));
const ProfileNoticeWritePage = lazy(() => import('./pages/Profile_notice_writePage'));
const OrderLogPage = lazy(() => import('./pages/OrderLogPage'));
const Notification = lazy(() => import('./components/Notification'));
const ExecutionPage = lazy(() => import('./pages/ExecutionPage'));
const ClientConfirmPage = lazy(() => import('./pages/ClientConfirmPage'));
const ExplorerPage = lazy(() => import('./pages/ExplorerPage'));
const ReceipientPage = lazy(() => import('./pages/ReceipientPage'));
const ChatcssPage = lazy(() => import('./components/ChatcssPage'));
const StakingPage = lazy(() => import('./pages/StakingPage'));
const FeeGovernorPage = lazy(() => import('./pages/FeeGovernorPage'));
const QR = lazy(() => import('./pages/QR'));
const NftSettingPage = lazy(() => import('./pages/NftSettingPage'));
const QRCode = lazy(() => import('./pages/QRCode'));

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
    if (clientOrderNumsArr === MANY_REQUEST_ERROR || quickerOrderNumsArr === MANY_REQUEST_ERROR) {
      alert('MANY_REQUEST_ERROR')
      window.location.reload()
    } else {
      setClientOrderNums(clientOrderNumsArr);
      setQuickerOrderNums(quickerOrderNumsArr);
    }
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
  
  // test commit

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

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LotDiv><Lottie animationData={LoadingAni}/></LotDiv>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chatting" element={<ChattingPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test2" element={<TestPage2 />} />
            <Route path="/profile/setting" element={<ProfileSettingPage />} />
            <Route path="/profile/notice" element={<ProfileNoticePage />} />
            <Route
              path="/profile/notice/write"
              element={<ProfileNoticeWritePage />}
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}
//temp

export default App;


const LotDiv = styled.div`
  position: absolute;
  width: 100px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;