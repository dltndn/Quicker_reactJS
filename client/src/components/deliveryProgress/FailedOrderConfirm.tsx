import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect } from "react"
import ConfirmBtn from "../confirmBtn"

export default function FailedOrderConfirm({ orderNum }: ExecutionComponentProps) {
    const { setTitle } = useClientConfirmState()

    const confirmLogic = async () => {

    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    
    return <><div>배송실패</div>
        <div>첨부사진</div>
        <div>실패사유</div>
        <ConfirmBtn
            content="확인"
            confirmLogic={async() => {
              await confirmLogic();
            }}
          />
    </>
}