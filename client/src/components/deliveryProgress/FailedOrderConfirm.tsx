import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmBtn from "../confirmBtn"
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain"
import { getOrderLawData } from "../../utils/ExecuteOrderFromBlockchain"

interface FailedOrderConfirmProps {
  orderNum: string|undefined;
  isReceived: boolean;
}

export default function FailedOrderConfirm({ orderNum, isReceived }: FailedOrderConfirmProps) {
    const { setTitle } = useClientConfirmState()
    const navigate = useNavigate()

    const confirmLogic = async () => {
      if (isReceived) {
        navigate("/")
        return
      }
      if (orderNum !== undefined) {
        const wttb = new WriteTransactionToBlockchain(orderNum);
        try {
          const reult = await wttb.failedOrder();
          console.log(reult);
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      }
    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    
    return <><div>배송실패</div>
        <div>첨부사진</div>
        <div>실패사유</div>
        <ConfirmBtn
            isDisabled={false}
            content={isReceived? ("확인"):("환불받기")}
            confirmLogic={async() => {
              await confirmLogic();
            }}
          />
    </>
}