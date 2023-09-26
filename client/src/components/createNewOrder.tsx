import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "./confirmBtn";
import { useOrderDataStore, useOrderStore } from "../pages/commission";
import {
  getAllowance,
  getLastClientOrder,
} from "../utils/ExecuteOrderFromBlockchain";
import Handler from "../lib/Handler";
import { useDivHandler } from "../pages/commission";
import { useOrderState } from "./ShowOrders";
import { UseUserOrderState } from "../App";
import { useConnWalletInfo } from "../App";
import { getQkrwBalance } from "../utils/ExecuteOrderFromBlockchain";
import SendTxK from "./blockChainTx/SendTxK";
import GetContractParams from "./blockChainTx/GetContractParams";
import { CreateNewOrderStyle } from "../StyleCollection";

const {Margin_1} = new CreateNewOrderStyle()

interface Props {
  data: object;
  _orderPrice: string;
  _deadline: string;
}


export default function CreateNewOrder({
  data,
  _orderPrice,
  _deadline,
}: Props) {
  const {
    btnContent,
    setBtnContent,
    setShowAllowance,
    createdOrderNum,
    setCreatedOrderNum,
    setErrorMessage,
    cost,
    deadLine,
  } = useOrderStore();
  const [lastOrder, setLastOrder] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showTxBtn, setShowTxBtn] = useState<boolean>(false);
  const { address } = useConnWalletInfo();
  const navigate = useNavigate();

  const { orderId, setOrderId } = useOrderDataStore();
  const { setShowCommissionPage } = useDivHandler();
  const { setRefreshOrder } = useOrderState();
  const { userOrderNumStateTrigger, setUserOrderNumStateTrigger } =
    UseUserOrderState();

  const getQkrwBal = async () => {
    try {
      const result = await getQkrwBalance(address);
      // const bal = changeBalanceToForm(BigInt(result));
      let balance: number
      if (Number(result) === 0) {
        return 0
      } else {
        balance = parseInt(BigInt(result).toString().slice(0, -18))
        return balance;
      }
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const validateInput = async () => {
    try {
      // 토큰 사용 권한 체크 로직
      const allowanceData: any = await getAllowance(address);
      if (allowanceData === 0) {
        setShowAllowance(true);
        return;
      }
      // 결제 가격 체크
      if (Number.isNaN(Number(_orderPrice))) {
        setErrorMessage("결제가격을 입력해주세요.");
        return;
      }
      // QKRW토큰 체크
      if (Number(_orderPrice) > (await getQkrwBal())) {
        setErrorMessage("QKRW토큰이 부족합니다.");
        return;
      }
      // 마감기한 체크
      if (Number(_deadline) <= Math.floor(Date.now() / 1000)) {
        setErrorMessage("마감기한은 현재시간 이후로 설정해주세요.");
        return;
      }
      setShowTxBtn(true)
    } catch (e) {
      console.log(e);
      alert("의뢰가 실패되었습니다.");
      setShowCommissionPage(true);
      navigate("/");
    }
  };

  const getCreatedOrderNum = async () => {
    const intervalId = setInterval(async () => {
      let newOrderNum = await getLastClientOrder(address);
      if (newOrderNum !== lastOrder) {
        setCreatedOrderNum(newOrderNum);
        console.log("새 오더넘버 탐색 완료");
        setUserOrderNumStateTrigger(userOrderNumStateTrigger + 1);
        clearInterval(intervalId);
        navigate("/");
      } else {
        console.log("새 오더 번호 감지x");
      }
    }, 500);
  };

  const getLastOrderFromBlochain = async () => {
    const result = await getLastClientOrder(address);
    if (result !== undefined) {
      setLastOrder(result);
    }
  };

  useEffect(() => {
    getLastOrderFromBlochain();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (createdOrderNum !== undefined) {
        // db 데이터 저장 로직 수행
        (() => {
          console.log("db 데이터 저장 로직");
          console.log("db에 저장할 오더번호: " + createdOrderNum);
          setOrderId(parseInt(createdOrderNum));
          setIsSuccess(false)
          // 로직 마지막은 프로필 오더 내역으로 리다이렉트
        })();
      } else {
        console.log("createdOrderNum is null");
      }
    }
  }, [createdOrderNum]);

  useEffect(() => {
    if (orderId !== 0) {
      console.log("호출됨");
      Handler.post(data, process.env.REACT_APP_SERVER_URL + "order");
      setOrderId(0);
      setRefreshOrder(true);
      setShowCommissionPage(true);
      navigate("/");
    }
  }, [orderId]);

  useEffect(() => {
    setErrorMessage("");
  }, [cost]);

  useEffect(() => {
    setErrorMessage("");
  }, [deadLine]);

  return (
    <>
      {!showTxBtn ? (
        <ConfirmBtn
          isDisabled={false}
          content={btnContent}
          confirmLogic={async () => await validateInput()}
        />
      ) : (
        <>
        <SendTxK
          param={GetContractParams.CreateOrder(_orderPrice, _deadline)}
          successFunc={async () => {setIsSuccess(true); await getCreatedOrderNum()}}
          
        />
                <Margin_1></Margin_1>
        </>
      )}
    </>
  );
}

