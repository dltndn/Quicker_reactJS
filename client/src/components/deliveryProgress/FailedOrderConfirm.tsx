import { ExecutionComponentProps } from "../../pages/ExecutionPage"
import { useClientConfirmState } from "../../pages/ClientConfirmPage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmBtn from "../confirmBtn"
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain"
import Handler from "../../lib/Handler"

interface FailedOrderConfirmProps extends ExecutionComponentProps{
  isReceived: boolean;
}

export default function FailedOrderConfirm({ orderNum, isReceived }: FailedOrderConfirmProps) {
    const { setTitle } = useClientConfirmState()
    const [base64String, setBase64String] = useState("");
    const [reason, setReason] = useState("");
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

  const getImage = async () => {


    // 암호화
    // const { createHmac } = await import('node:crypto');

    // const secret = process.env.REACT_APP_CRYPTO_KEY;
    // let hashCode;
    // if (secret !== undefined && orderNum !== undefined) {
    //   hashCode = createHmac('sha256', secret).update(orderNum).digest('hex');
    // }

    // 배송시ㄹ패 사진 불러오기
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `order-fail-image/?orderNum=${orderNum}`)
    const json = await response.json();
    const bufferImage = json.imageBuffer.data

    const base64Image = Buffer.from(bufferImage).toString('base64');

    // 이미지 src로 설정합니다.
    setBase64String(`data:image/png;base64, ${base64Image}`);
    setReason(json.reason)
  }

    useEffect(() => {
      (async()=> {
        setTitle("배송결과")
        await getImage()
      })()
    }, [])
    
    return <><div>배송실패</div>
        <div>
          <img src={base64String} alt="uploaded photo" />
        </div>
        <div>
        {reason}실패 사유
        </div>
        <ConfirmBtn
            isDisabled={false}
            content={isReceived? ("확인"):("환불받기")}
            confirmLogic={async() => {
              await confirmLogic();
            }}
          />
    </>
}