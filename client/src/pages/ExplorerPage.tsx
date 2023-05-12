import { createGlobalStyle } from "styled-components";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import { QUICKER_ADDRESS } from "../contractInformation";
import { create } from "zustand";
import { useState, useEffect } from "react";
import { getQkrwBalance } from "../utils/ExecuteOrderFromBlockchain";
import { changeBalanceToForm } from "../utils/CalAny";

const PLATFORM_ADDRESS = "0xB6C9011d74B1149fdc269530d51b4A594D97Fd04"
const INSUARANCE_ADDRESS = "0x7762DA67fB11335cABb68231B81d1804229E8245"
const CONTRACT_ADDRESS = QUICKER_ADDRESS

interface ExplorerState {

}

export const useExplorerState = create<ExplorerState>((set) => ({

}))

export default function ExplorerPage() {
    const navigate = useNavigate()
    const [feeDepositTrigger, setFeeDepositTrigger] = useState<boolean>(true)
    const [contractBalTrigger, setContractBalTrigger] = useState<boolean>(true)
    const [transactTrigger, setTransactTrigger] = useState<boolean>(false)
    const [contractBal, setContractBal] = useState<string>("0")
    const [platformBal, setPlatformBal] = useState<string>("0")
    const [insuaBal, setInsuaBal] = useState<string>("0")
    
      const getQkrwBalanceFunc = async (address: string) => {
        const result:any = await getQkrwBalance(address)
        const balance = changeBalanceToForm(BigInt(result._hex))
        switch (address) {
            case CONTRACT_ADDRESS:
                setContractBal(balance)
                break
            case PLATFORM_ADDRESS:
                setPlatformBal(balance)
                break
            case INSUARANCE_ADDRESS:
                setInsuaBal(balance)
                break
            default:
                console.log("error")
        }
      }

      useEffect(() => {
        if(feeDepositTrigger) {
            getQkrwBalanceFunc(PLATFORM_ADDRESS)
            getQkrwBalanceFunc(INSUARANCE_ADDRESS)
            setFeeDepositTrigger(false)
        }
      }, [feeDepositTrigger])

      useEffect(() => {
        if(contractBalTrigger) {
            getQkrwBalanceFunc(CONTRACT_ADDRESS)
            setContractBalTrigger(false)
        }
      }, [contractBalTrigger])

      useEffect(() => {

      }, [transactTrigger])

      useEffect(() => {
        
      }, [])

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
      <div>플랫폼</div><div>수수료</div><br />
      <div>보험</div><div>수수료</div><br />
      <div>보증금</div><div>수수료</div><br />
      <div>Contract지갑</div><div>address</div><br />
      <div>{contractBal}원</div><br />
      <div>플랫폼지갑</div><div>address</div><br />
      <div>{platformBal}원</div><br />
      <div>보험지갑</div><div>address</div><br />
      <div>{insuaBal}원</div><br />
      <br />
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
            {/* component화 */}
            <tr>
                <td>12</td>
                <td>0x1233ef123...</td>
                <td>0x1e1864802...</td>
                <td>125,000</td>
                <td>state</td>
            </tr>
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
