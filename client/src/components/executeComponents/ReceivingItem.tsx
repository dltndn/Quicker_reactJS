import ConfirmBtn from "../confirmBtn"

export default function ReceivingItem() {
    const receivedRogic = () => {

    }
    return(
        <>
            <div>물품 인계</div>
            <div>물품을 인계받으면 확인버튼을 눌러주세요</div>
            
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
              receivedRogic();
            }}
          />
        </>
    )
}