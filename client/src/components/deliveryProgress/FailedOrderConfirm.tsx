import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmBtn from "../confirmBtn"
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain"
import { getOrderLawData } from "../../utils/ExecuteOrderFromBlockchain"

export default function FailedOrderConfirm({ orderNum }: ExecutionComponentProps) {
    const { setTitle } = useClientConfirmState()
    const [returned, setReturned] = useState<boolean>(false)
    const navigate = useNavigate()

    const confirmLogic = async () => {
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

    const isReturned = async () => {
      if (orderNum !== undefined) {
        try {
          const blockchainOrder: any = await getOrderLawData(orderNum)
          if(blockchainOrder.securityDeposit.toNumber() === 0) {
            setReturned(true)
          }
        } catch(e) {
          console.log(e)
        }
      }
    }

    useEffect(() => {
        setTitle("배송결과")
        isReturned()
    }, [])
    
    return <><div>배송실패</div>
        <div>첨부사진</div>
        <div>실패사유</div>
        <ConfirmBtn
            isDisabled={returned}
            content="확인"
            confirmLogic={async() => {
              await confirmLogic();
            }}
          />
    </>
}