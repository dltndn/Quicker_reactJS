import { createGlobalStyle } from "styled-components";
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
import { useContractEvent } from "wagmi";
import ExplorerTableData from "../components/ExplorerTableData";

const PLATFORM_ADDRESS = "0xB6C9011d74B1149fdc269530d51b4A594D97Fd04";
const INSUARANCE_ADDRESS = "0x7762DA67fB11335cABb68231B81d1804229E8245";
const CONTRACT_ADDRESS = QUICKER_ADDRESS;

interface ExplorerState {}

export const useExplorerState = create<ExplorerState>((set) => ({}));

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
        setOrderArr(result.slice().reverse());
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
    },
  });

  // contract QKRW토큰 입출금시 동작
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "ChangedBalance",
    async listener(node: any, label: any, owner) {
      setContractBalTrigger(true);
    },
  });

  // contract 오더관련 함수 실행 성공시 동작
  useContractEvent({
    address: QUICKER_ADDRESS,
    abi: QUICKER_CONTRACT_ABI,
    eventName: "OrderResult",
    async listener(node: any, label: any, owner) {
      setTransactTrigger(true);
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
    getCommissionLateFunc();
  }, []);

  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title="실시간 거래현황"
        redirectLogic={function () {
          navigate("/profile");
        }}
      ></TopBarOthers>
      <div>현재 수수료</div>
      <div>플랫폼</div>
      <div>{feeArr[0]}</div>
      <br />
      <div>보험</div>
      <div>{feeArr[1]}</div>
      <br />
      <div>보증금</div>
      <div>{feeArr[2]}</div>
      <br />
      <div>Contract지갑</div>
      <div>({sliceAddress(QUICKER_ADDRESS)})</div>
      <br />
      <div>{contractBal}원</div>
      <br />
      <div>플랫폼지갑</div>
      <div>({sliceAddress(PLATFORM_ADDRESS)})</div>
      <br />
      <div>{platformBal}원</div>
      <br />
      <div>보험지갑</div>
      <div>({sliceAddress(INSUARANCE_ADDRESS)})</div>
      <br />
      <div>{insuaBal}원</div>
      <br />
      <div>거래현황</div>
      <table>
        <thead>
          <tr>
            <th>오더번호</th>
            <th>Client</th>
            <th>Quicker</th>
            <th>의뢰금액</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {orderArr.length !== 0 ? (
            <>
              {orderArr.map((element: any) => (
                <ExplorerTableData
                  orderNum={element.orderNum}
                  clientAddress={element.client}
                  quickerAddress={element.quicker}
                  orderPrice={element.orderPrice}
                  state={element.state}
                />
              ))}
            </>
          ) : (
            <>로딩컴포넌트</>
          )}
        </tbody>
      </table>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

const formatCommissionRate = (rate: number): string => {
  const result = (rate / 10).toString();
  return result + "%";
};
