import ConfirmBtn from "../confirmBtn"
import { useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";

export default function FailedDelivery() {
    const { setTitle } = useExecutionState()
    const deliveredRogic = () => {

    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    return(
        <>
            <div>배송실패</div>
            <div>사진첨부공간</div>
            <div>배송실패사유</div>
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
                deliveredRogic();
            }}
          />
        </>
    )
}