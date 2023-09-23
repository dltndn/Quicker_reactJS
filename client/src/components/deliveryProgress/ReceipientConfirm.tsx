import QRCode from "../../pages/QRCode";
import { useState, useEffect } from "react";
import { ReceipentConfirmStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, Div3, Div4, Divback, Bt0, Bt1, Span01} = new ReceipentConfirmStyle()

interface ReceipientConfirmProp {
  orderNum: string | undefined;
  validationInfo : string | null;
}
export default function ReceipientConfirm({ orderNum ,validationInfo}: ReceipientConfirmProp) {
  const [hasImg, setHasImg] = useState<boolean>();
  const [base64String, setBase64String] = useState("");
  const getPicture = async () => {
    // 배송완료 사진 불러오기
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL +
          `order/image/complete/?orderNum=${orderNum}`
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
          <Div0>
            <Div1>
            <Bt1>QR코드</Bt1> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
            <QRCode validationInfos={{orderNum : orderNum, validationInfo : validationInfo}}></QRCode>
            </Div2>
        </Divback>
        <Div3>
        <Div4>
            <Span01>
            배송원에게 QR코드를 보여주세요
            </Span01>
        </Div4>
        </Div3>
        </>
      ) : (
        <>
         <Div0>
            <Div1>
            <Bt0>배송완료</Bt0> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
              <img src={base64String} alt="uploaded photo" width="100%"/>
            </Div2>
        </Divback>
        <Div3>
        <Div4>
            <Span01>
              배송이 완료되었습니다.
            </Span01>
        </Div4>
        </Div3>
        </>
      )}
    </>
  );
}

