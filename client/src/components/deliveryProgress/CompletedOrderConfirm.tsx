import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect } from "react"
import ConfirmBtn from "../confirmBtn"

export default function CompletedOrderConfirm({ orderNum }: ExecutionComponentProps) {
    const { setTitle } = useClientConfirmState()

    const confirmLogic = async () => {

    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    
    return <><div>배송완료</div>
        <div>배송완료 애니메이션</div>
        <ConfirmBtn
            content="확인"
            confirmLogic={async() => {
              await confirmLogic();
            }}
          />
    </>
}