import ConfirmBtn from "../confirmBtn"
import { useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";

export default function CompletedDelivery() {
    const { setTitle } = useExecutionState()
    const deliveredRogic = () => {

    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    return(
        <>
            <div>배송완료</div>
            <div>입금 애니메이션</div>
            <div>수익 </div>
            <div>반환보증금 </div>
            <div>입금금액 </div>
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
                deliveredRogic();
            }}
          />
        </>
    )
}