import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect } from "react"

export default function DeliveryStatus({ orderNum }: ExecutionComponentProps) {
    const { setTitle } = useClientConfirmState()

    useEffect(() => {
        setTitle("배송현황")
    }, [])

    return <>실시간 배송원 위치 조회 컴포넌트</>
}