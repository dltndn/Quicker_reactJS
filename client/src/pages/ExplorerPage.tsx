import styled, { createGlobalStyle, keyframes } from "styled-components";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import { QUICKER_ADDRESS, QUICKER_CONTRACT_ABI } from "../contractInformation";
import { create } from "zustand";
import { useState, useEffect } from "react";
import {
  getQkrwBalance,
  getCommissionRate,
  getOrdersForLatest,
} from "../utils/ExecuteOrderFromBlockchain";
import { changeBalanceToForm, sliceAddress } from "../utils/CalAny";
import { useContractEvent, useAccount } from "wagmi";
import ExplorerTableData from "../components/ExplorerTableData";
import { useVerificationStore } from "../App";
import Lottie from "lottie-react";
import LoadingAni from "../Lottie/144488-transparet-loading-dots.json";

const PLATFORM_ADDRESS = "0xB6C9011d74B1149fdc269530d51b4A594D97Fd04";
const INSUARANCE_ADDRESS = "0x7762DA67fB11335cABb68231B81d1804229E8245";
const CONTRACT_ADDRESS = QUICKER_ADDRESS;

interface ExplorerState {
  blinkOrderArrIndex: number[];
  setBlinkOrderArrIndex: (indexArr: number[]) => void;
}

export const useExplorerState = create<ExplorerState>((set) => ({
  blinkOrderArrIndex: [],
  setBlinkOrderArrIndex: (blinkOrderArrIndex: number[]) => set({blinkOrderArrIndex}),
}));

export default function ExplorerPage() {
  const navigate = useNavigate();
  const [feeDepositTrigger, setFeeDepositTrigger] = useState<boolean>(true);
  const [contractBalTrigger, setContractBalTrigger] = useState<boolean>(true);
  const [transactTrigger, setTransactTrigger] = useState<boolean>(true);
  const [contractBal, setContractBal] = useState<string>("0");
  const [platformBal, setPlatformBal] = useState<string>("0");
  const [insuaBal, setInsuaBal] = useState<string>("0");
  const [feeArr, setFeeArr] = useState<string[]>(["0", "0", "0"]);
  const [orderArr, setOrderArr] = useState<any[]>([]);
  const [showOrders, setShowOrders] = useState<any>([])
  const [isBlink, setIsBlink] = useState<boolean>(false)
  const [isBlinkPI, setIsBlinkPI] = useState<boolean>(false)
  const [isBlinkCo, setIsBlinkCo] = useState<boolean>(false)

  const { setBlinkOrderArrIndex } = useExplorerState()
  const { isMember } = useVerificationStore();

  const getQkrwBalanceFunc = async (address: string) => {
    try {
      const result: any = await getQkrwBalance(address);
      const balance = changeBalanceToForm(BigInt(result._hex));
      switch (address) {
        case CONTRACT_ADDRESS:
          setContractBal(balance);
          break;
        case PLATFORM_ADDRESS:
          setPlatformBal(balance);
          break;
        case INSUARANCE_ADDRESS:
          setInsuaBal(balance);
          break;
        default:
          console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCommissionLateFunc = async () => {
    let arr: string[] = [];
    try {
      const result: any = await getCommissionRate();
      for (const element of result) {
        arr.push(formatCommissionRate(element));
      }
      setFeeArr(arr);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrders = async (amount: number) => {
    if (Number.isInteger(amount) && amount >= 1) {
      try {
        const result: any = await getOrdersForLatest(amount.toString());
        // 바뀐 부분 확인
        const newOrderArr = result.slice()
        let changedIndex:number[] = []
        for (const [index, element] of newOrderArr.entries()) {
          if (orderArr[index] !== undefined) {
            console.log(index)
            if (orderArr[index].orderNum !== element.orderNum) {
              changedIndex.push(index);
              console.log("new order");
              break; // 중간에 종료
            } else if (orderArr[index].state !== element.state) {
              console.log("changed state -> " + index)
              changedIndex.push(index);
            } else {
              console.log("변경x")
            }
          }
        }
        setBlinkOrderArrIndex(changedIndex)
        console.log("changedIndex: " + changedIndex)
        setOrderArr(newOrderArr);
        console.log(newOrderArr)
      } catch (e) {
        console.log(e);
      }
    }
    return [];
  };

  // 배송원 정산, 의뢰인 정산시 동작
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "DepositedFee",
    async listener(node: any, label: any, owner) {
      setFeeDepositTrigger(true);
      await setBlinkState(setIsBlinkPI);
    },
  });

  // contract QKRW토큰 입출금시 동작
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "ChangedBalance",
    async listener(node: any, label: any, owner) {
      setContractBalTrigger(true);
      await setBlinkState(setIsBlinkCo);
    },
  });

  // contract 오더관련 함수 실행 성공시 동작
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "OrderResult",
    async listener(node: any, label: any, owner) {
      setTransactTrigger(true);
      await setBlinkState(setIsBlink);
    },
  });

  useEffect(() => {
    if (feeDepositTrigger) {
      getQkrwBalanceFunc(PLATFORM_ADDRESS);
      getQkrwBalanceFunc(INSUARANCE_ADDRESS);
      setFeeDepositTrigger(false);
    }
  }, [feeDepositTrigger]);

  useEffect(() => {
    if (contractBalTrigger) {
      getQkrwBalanceFunc(CONTRACT_ADDRESS);
      setContractBalTrigger(false);
    }
  }, [contractBalTrigger]);

  useEffect(() => {
    if (transactTrigger) {
      getOrders(20);
      setTransactTrigger(false);
    }
  }, [transactTrigger]);

  useEffect(() => {
    setShowOrders(orderArr)
  }, [orderArr]);
  

  useEffect(() => {
    getCommissionLateFunc();
  }, []);

  const setBlinkState = async (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    await new Promise((resolve) => {const timeId =  setTimeout(resolve, 1000); return () => clearTimeout(timeId);});
    setter(false);
  };

  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title="실시간 거래현황"
        redirectLogic={function () {
          navigate("/");
        }}
      ></TopBarOthers>
      <Container>
        <Box>
          <div>
            <ReqFont>수수료 현황</ReqFont>
          </div>
          <Div1>
            <Dvi1_1>플랫폼</Dvi1_1>
            <Dvi1_1>보험</Dvi1_1>
            <Dvi1_1>보증금</Dvi1_1>
          </Div1>
          <Div1>
            <Dvi1_3>{feeArr[0]}%</Dvi1_3>
            <Dvi1_3>{feeArr[1]}%</Dvi1_3>
            <Dvi1_3>{feeArr[2]}%</Dvi1_3>
          </Div1>
        </Box>
      </Container>

      <Container>
        <Box>
          <div>
            <ReqFont>잔액 현황</ReqFont>
          </div>
          <Div0>
            <span>컨트랙트</span>
            <div>({sliceAddress(QUICKER_ADDRESS)})</div>
            <Sp1>{isBlinkCo ? (<BlinkDiv>{contractBal}원</BlinkDiv>):(<>{contractBal}원</>)}</Sp1>
          </Div0>
          <Div0>
            <span>플랫폼</span>
            <span>({sliceAddress(PLATFORM_ADDRESS)})</span>
            
            <Sp1>{isBlinkPI ? (<BlinkDiv>{platformBal}원</BlinkDiv>):(<>{platformBal}원</>)}</Sp1>
            
          </Div0>
          <Div0>
            <span>보험</span>
            <span>({sliceAddress(INSUARANCE_ADDRESS)})</span>
            <Sp1>{isBlinkPI ? (<BlinkDiv>{insuaBal}원</BlinkDiv>):(<>{insuaBal}원</>)}</Sp1>
          </Div0>
        </Box>
      </Container>
      <Container>
        <Box>
          <div>
            <ReqFont>거래 현황</ReqFont>
          </div>
              <Div1>
            <Dvi1_1>오더번호</Dvi1_1>
            <Dvi1_1>의뢰인</Dvi1_1>
            <Dvi1_1>배송원</Dvi1_1>
            <Dvi1_1>의뢰금</Dvi1_1>
            <Dvi1_1>상태</Dvi1_1>
          </Div1>
          {showOrders.length !== 0 ? (
            <>
              {showOrders.map((element: any, index: number) => (
                <ExplorerTableData
                  key={index}
                  orderNum={element.orderNum}
                  clientAddress={element.client}
                  quickerAddress={element.quicker}
                  orderPrice={element.orderPrice}
                  state={element.state}
                  blinkIndex={index}
                />
              ))}
            </>
          ) : (
            <Lottie animationData={LoadingAni}/>
          )}
        </Box>
      </Container>
    </>
  );
}

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkDiv = styled.div`
  animation: ${blinkAnimation} 1s;
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

const formatCommissionRate = (rate: number): string => {
  const result = (rate / 10).toString();
  return result;
};

const Div1 = styled.div`
  display: flex;
  background-color: var(--white-color);
  padding: 10px;
  border-radius: 0.313rem;
`;

const Dvi1_1 = styled.div`
  display: flex;
  flex: 1 1 20%;
  justify-content: center;
  font-size: var(--font-md1);
  font-weight: bold;
`;

const Dvi1_3 = styled.div`
  display: flex;
  flex: 1 1 20%;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Div1_2 = styled(Dvi1_1)`
  font-size: 16px;
  align-items: center;
`;

const Box = styled.div`
  margin-top: 0.5rem;
  width: 97%;
  background-color: #ffffff;
  margin: 0.313rem;
  border-radius: 0.313rem !important;
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReqFont = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0px 5px 16px;
`;
const Div0 = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-md1);
  font-weight: bold;
  margin: 10px 16px 10px 16px;
`;
const Sp0 = styled.div`
  margin-left: auto;
  margin-right: 0.625rem;
`;

const Sp1 = styled(Sp0)`
  font-size: var(--font-md1);
  font-weight: bold;
`;

const Divnum = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-md1);
  font-weight: bold;
  margin: 10px 16px 10px 16px;
`;
