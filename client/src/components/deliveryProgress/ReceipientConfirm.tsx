import styled from "styled-components";
import QRCode from "../../pages/QRCode";
import ConfirmBtn from "../confirmBtn";
import { useState, useEffect } from "react";

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
            <Btwal_1>QR코드</Btwal_1> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
            <QRCode validationInfos={{orderNum : orderNum, validationInfo : validationInfo}}></QRCode>
            </Div2>
        </Divback>
        <Div3>
        <Div5>
            <Span01>
            배송원에게 QR코드를 보여주세요
            </Span01>
        </Div5>
        </Div3>
        </>
      ) : (
        <>
         <Div0>
            <Div1>
            <Btwal>배송완료</Btwal> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
              <img src={base64String} alt="uploaded photo" width="100%"/>
            </Div2>
        </Divback>
        <Div3>
        <Div5>
            <Span01>
              배송이 완료되었습니다.
            </Span01>
        </Div5>
        </Div3>
        </>
      )}
    </>
  );
}


const Div0 = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 100%;
`;

const Divback = styled(Div0)`
    height: auto;
    justify-content: center;
`;

const Div3 = styled.div`
    display: flex;
    justify-content: center;
`;

const Div2 = styled.div`
    display: flex;
    height: 600px;
    width: 95%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
`

const Btwal = styled.button`
    width: 100%;
    height: 3.25rem;
    font-size: var(--font-md);
    font-weight: bold;
    border: 0rem;
    outline: #efefef;
    background-color: #ffffff;
    padding-left: 0.625rem;
    text-align: center;
    color: #28A745;
`;
const Btwal_1 = styled.button`
    width: 100%;
    height: 3.25rem;
    font-size: var(--font-md);
    font-weight: bold;
    border: 0rem;
    outline: #efefef;
    background-color: #ffffff;
    padding-left: 0.625rem;
    text-align: center;
    
`;


const Span01 = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #828282;
`;

const Div5 = styled.div`
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: #0D6EFD;
    font-weight: bold;
    text-align: center;
    background-color: #ffffff;
    width: 95%;
    padding: 10px 20px 20px 20px;
    border-radius: 0 0 10px 10px;
`;