import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "./confirmBtn";
import { useOrderDataStore, useOrderStore } from "../pages/commission";
import {
  getAllowance,
  getLastClientOrder,
} from "../utils/ExecuteOrderFromBlockchain";
import Handler from "../lib/Handler";

//Qkrw token contract information - polygon mumbai network
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

interface Props {
  data: object;
  _orderPrice: string;
  _deadline: string;
}

interface ErrorProps {
  reason: string;
}

export default function CreateNewOrder({
  data,
  _orderPrice,
  _deadline
}: Props) {
  const {
    btnContent,
    setBtnContent,
    setShowAllowance,
    createdOrderNum,
    setCreatedOrderNum,
    setErrorMessage,
    cost,
    deadLine
  } = useOrderStore();
  const [lastOrder, setLastOrder] = useState<string>("")
  const { address } = useAccount();
  const navigate = useNavigate()

  const {orderId, setOrderId} = useOrderDataStore();
  const { config } = usePrepareContractWrite({
    address: Quicker_address,
    abi: Quicker_abi,
    functionName: "createOrder",
    args: [_orderPrice, _deadline],
    onSettled(data: any, error: any) {
      if (error) {
        let result: ErrorProps = JSON.parse(JSON.stringify(error));
        if (
          result.reason ===
          "execution reverted: ERC20: transfer amount exceeds balance"
        ) {
          setErrorMessage("QKRW토큰이 부족합니다.");
        } else if (
          result.reason ===
          "execution reverted: The deadline must later than the current time!"
        ) {
          setErrorMessage("마감기한은 현재시간 이후로 설정해주세요.");
        } else if (
          result.reason ===
          "execution reverted: Order price must bigger than 0!"
        ) {
          setErrorMessage("결제가격을 입력해주세요.");
        } else {
          setErrorMessage("");
          console.log("error")
        }
      }
    },
  });

  const { isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess() {
      getCreatedOrderNum();
    },
    onError(error) {
      console.log(error);
    },
  });

  const writeContract = async () => {

    // 토큰 사용 권한 체크 로직
    const allowanceData: any = await getAllowance(address);
    if (allowanceData._hex === "0x00") {
      setShowAllowance(true);
    }
    write?.();
  };

  const getCreatedOrderNum = async () => {
    const intervalId = setInterval(async () => {
      let newOrderNum = await getLastClientOrder(address);
      if (newOrderNum !== lastOrder) {
        setCreatedOrderNum(newOrderNum);
        console.log("새 오더넘버 탐색 완료")
        clearInterval(intervalId);
      } else {
        console.log("새 오더 번호 감지x")
      }
    }, 1000);
  };

  const getLastOrderFromBlochain = async () => {
    const result = await getLastClientOrder(address);
    if (result !== undefined) {
      setLastOrder(result)
    }
  }

  useEffect(() => {
    getLastOrderFromBlochain()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      if (createdOrderNum !== undefined) {
        // db 데이터 저장 로직 수행
        (() => {
          console.log("db 데이터 저장 로직");
          console.log("db에 저장할 오더번호: " + createdOrderNum);
          setOrderId(parseInt(createdOrderNum));
          // 로직 마지막은 프로필 오더 내역으로 리다이렉트
        })()
      } else {
        console.log("createdOrderNum is null");
      }
    }
  }, [createdOrderNum]);

  useEffect(() => {
    if (orderId !== 0) {
      console.log("호출됨")
      Handler.post(data, "http://localhost:9000/request");
      setOrderId(0)
      navigate("/")
    }
  }, [orderId]);

  useEffect(() => {
    if (isLoading) {
      setBtnContent("지갑서명 대기중...");
    }
  }, [isLoading]);

  useEffect(() => {
    setErrorMessage("")
  }, [cost])

  useEffect(() => {
    setErrorMessage("")
  }, [deadLine])


  return (
    <>
      <ConfirmBtn content={btnContent} confirmLogic={() => writeContract()} />
    </>
  );
}
