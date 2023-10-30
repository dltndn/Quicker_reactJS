import { create } from "zustand";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBarOthers from "../components/topBarOthers";
import { LoadingExecution } from "../components/LoadingAnimation";
import { getOrderRawData } from "../utils/ExecuteOrderFromBlockchain";
import { calQuickerIncomeNum, calSecurityDepositNum } from "../utils/CalAny";
import SuspenseComponent from "../components/SuspenseComponent";
import { getCommissionRate, MANY_REQUEST_ERROR } from "../utils/ExecuteOrderFromBlockchain";

interface ExecutionState {
  title: string;
  setTitle: (newData: string) => void;
  showComponent: JSX.Element;
  setShowComponent: (newData: JSX.Element) => void;
}

export interface ExecutionComponentProps {
  orderNum: string | undefined;
}

export const useExecutionState = create<ExecutionState>((set) => ({
  title: "물품 인계",
  setTitle: (title: string) => set({title}),
  showComponent: <></>,
  setShowComponent: (showComponent: JSX.Element) => set({showComponent}),
}));

// 상대 지갑주소는 확인 가능 필요한 것 은 인증 정보들만 필요함

export default function ExecutionPage() {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const { title, showComponent, setShowComponent} = useExecutionState()

  const [commisstionRate, setCommissionRate] = useState<string[]>([])

  const ReceivingItem = lazy(() => import("../components/executeComponents/ReceivingItem"))
  const DeliveredItem = lazy(() => import("../components/executeComponents/DeliveredItem"))
  const CompletedDelivery = lazy(() => import("../components/executeComponents/CompletedDelivery"))
  const FailedDelivery = lazy(() => import("../components/executeComponents/FailedDelivery"))
  const WaitClientConfirm = lazy(() => import("../components/executeComponents/WaitClientConfirm"))

  const currentTime = Math.floor(Date.now() / 1000)
  const twelveHoursToSec = 12 * 60 * 60

  const init = async() => {
    const commissionResult = await getCommissionRate()
    if (commissionResult === MANY_REQUEST_ERROR) {
      alert('MANY_REQUEST_ERROR')
      navigate('/')
    } else {
      setCommissionRate(commissionResult)
    }
  }

  const isClientConfirmBefore = (order: any) => {
    if (order.state === "1" && Number(order.deliveredTime) !== 0)
      return true

    return false
  }

  const isDeliveryFailed = (order: any) => {
    if (Number(order.deliveredTime) === 0 && (Number(order.limitedTime) + twelveHoursToSec) < currentTime)
      return true

    return false
  }

  const isCLientConfirm = (order: any) => {
    if (order.state === "2" || (Number(order.deliveredTime) !== 0 && (Number(order.limitedTime) + twelveHoursToSec) < currentTime))
      return true
    
    return false
  }

  const isDeliveryItemReceived = async () => {
    // 물품인계 여부 확인 후 boolean 반환
    // 물품인계 완료 -> true
    // 물품인계 x -> false
    await timeOutFunc() // test용
    return true
  }

  const timeOutFunc = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
        console.log("timeout 내부")
      }, 3000)
    })
  }

  const setComponentLogic = async () => {
    if (orderNumber !== undefined) {
      try {
        const blockchainOrder: any = await getOrderRawData(orderNumber)
        if (isCLientConfirm(blockchainOrder)) {
          let securityDeposit: number
          let isReceived: boolean = false
          if (Number(blockchainOrder.deliveredTime) > Number(blockchainOrder.limitedTime)) {
            securityDeposit = 0
          } else {
            securityDeposit = calSecurityDepositNum(Number(blockchainOrder.orderPrice), commisstionRate)
          }
          const income = calQuickerIncomeNum(Number(blockchainOrder.orderPrice), commisstionRate)
          if(Number(blockchainOrder.securityDeposit) === 0) {
            isReceived = true
          }
          setShowComponent(<SuspenseComponent component={<CompletedDelivery orderNum={orderNumber} income={income} securityDeposit={securityDeposit} isReceived={isReceived}/>}/>)
          return
        } else if (isDeliveryFailed(blockchainOrder)) {
          setShowComponent(<SuspenseComponent component={<FailedDelivery orderNum={orderNumber}/>} />)
          return
        } else if (isClientConfirmBefore(blockchainOrder)) {
          setShowComponent(<SuspenseComponent component={<WaitClientConfirm />} />)
          return
        }
      } catch(e) {
        console.log(e)
      }
      // isDeliveryItemReceived() 테스트 할 때 try, catch 블록 주석처리
      if (await isDeliveryItemReceived()) {
        setShowComponent(<SuspenseComponent component={<DeliveredItem orderNum={orderNumber}/>} />)
        return
      } else {
        setShowComponent(<SuspenseComponent component={<ReceivingItem orderNum={orderNumber}/>} />)
        return
      }
    }
  }

  useEffect(() => {
    setShowComponent(<LoadingExecution />)
    init()
  }, [])

  useEffect(() => {
    if (commisstionRate.length !== 0) {
      setComponentLogic()
    }
  }, [commisstionRate])
  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title={title}
        redirectLogic={function () {
          navigate("/fulfillmentlist");
        }}
      ></TopBarOthers>
      {showComponent}
      {/* <button onClick={() => setShowComponent(<ReceivingItem orderNum={orderNumber}/>)}>물품인계 확인 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<DeliveredItem orderNum={orderNumber}/>)}>물품전달 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<WaitClientConfirm />)}>의뢰인 확인 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<CompletedDelivery orderNum={orderNumber} income={9800} securityDeposit={0} isReceived={false}/>)}>배송완료 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<FailedDelivery orderNum={orderNumber}/>)}>배송실패 컴포넌트 이동</button> */}
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

