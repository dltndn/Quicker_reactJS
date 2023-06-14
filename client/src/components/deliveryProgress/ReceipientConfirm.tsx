import ConfirmBtn from "../confirmBtn";
import { useState, useEffect } from "react";

interface ReceipientConfirmProp {
  orderNum: string | undefined;
}
export default function ReceipientConfirm({ orderNum }: ReceipientConfirmProp) {
  const [hasImg, setHasImg] = useState<boolean>(false);
  const [base64String, setBase64String] = useState("");

  const getPicture = async () => {
    // 암호화
    // const { createHmac } = await import('node:crypto');

    // const secret = process.env.REACT_APP_CRYPTO_KEY;
    // let hashCode;
    // if (secret !== undefined && orderNum !== undefined) {
    //   hashCode = createHmac('sha256', secret).update(orderNum).digest('hex');
    // }

    // 배송완료 사진 불러오기
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL +
          `order-complete-image/?orderNum=${orderNum}`
      );
      const buffer = await response.json();
      const bufferImage = buffer.imageBuffer.data;

      const base64Image = Buffer.from(bufferImage).toString("base64");

      // 이미지 src로 설정합니다.
      setBase64String(`data:image/png;base64, ${base64Image}`);

      // 불러온 후 setHasImg(true)
      setHasImg(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPicture();
  }, []);

  return (
    <>
      {!hasImg ? (
        <>
          <div>QR코드</div>
          <div>배송원에게 QR코드를 보여주세요</div>
        </>
      ) : (
        <>
          <img src={base64String} alt="uploaded photo" />
          <div>배송원이 배송을 완료했어요</div>
        </>
      )}
    </>
  );
}
