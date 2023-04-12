import ConfirmBtn from "../confirmBtn"
import { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import FaceToFaceDelivery from "./FaceToFaceDelivery";
import RemoteDelivery from "./RemoteDelivery";

export default function DeliveredItem() {
    const { setTitle, setShowComponent } = useExecutionState()
    const [isFace, setIsFace] = useState<boolean>(true)
    const deliveredRogic = () => {

    }

    useEffect(() => {
        setTitle("물품전달")
    }, [])
    return(
        <>
            <button onClick={() => setIsFace(true)}>대면</button>
            <button onClick={() => setIsFace(false)}>비대면</button>
            {isFace ? (<FaceToFaceDelivery />):(<RemoteDelivery />)}
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
                deliveredRogic();
            }}
          />
        </>
    )
}