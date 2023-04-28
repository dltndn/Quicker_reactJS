import { useExecutionState } from "../../pages/ExecutionPage"
import { useEffect } from "react"

export default function WaitClientConfirm() {
    const { setTitle } = useExecutionState()

    useEffect(() => {
        setTitle("물품전달")
    }, [])
    return (<>
        수취인 및 의뢰인이 확인중입니다...
    </>)
}