import { KaikasConnect } from "../../utils/KaikasConnect";
import { useState, useEffect } from "react";
import { generateQRCode } from "../../utils/GenerateQr";
import { SendTxType, SendTxDelegationType } from "../../utils/KaikasConnect";
import { useConnWalletInfo } from "../../App";
import styled from "styled-components";

const LoadButton = styled.button`
  position: fixed;
  bottom: 0.5rem;
  width: 98%;
  height: 3.125rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border: 0;
  outline: #efefef;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;

const Container = styled.section`
  padding: calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
`

type SendTokenProps = {
  param: SendTxType | SendTxDelegationType;
  successFunc: () => void;
};

const SendTxK = ({ param, successFunc }: SendTokenProps) => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const { isMobile } = useConnWalletInfo();

  const kConn = new KaikasConnect();

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyTx(param);
    try {
      // @ts-ignore
      if (param.fee_delegated) {
        await kConn.getTxResultFeeDeligation(reqKey, true)
      } else {
        await kConn.getTxResult(reqKey, true);
      }
      successFunc();
    } catch (e) {
      console.log(e);
    }
  };

  const qrConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyTx(param);
    const qrUrlStr = await generateQRCode(`https://app.kaikas.io/a/${reqKey}`);
    setQrUrl(qrUrlStr);
    setShowQr(true);
    try {
      // @ts-ignore
      if (param.fee_delegated) {
        await kConn.getTxResultFeeDeligation(reqKey, false)
      } else {
        await kConn.getTxResult(reqKey, false);
      }
      setShowQr(false);
      setQrUrl("");
      successFunc();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      setShowQr(false);
      setQrUrl("");
    };
  }, []);

  return (
    <>
      {isMobile === null ? (<>로그아웃 상태입니다</>):(
        <>
          {isMobile ? (
            <Container>
            <LoadButton onClick={mobileConnect}>서명</LoadButton>
            </Container>
          ) : (
            <>
            <Container>
            <LoadButton onClick={qrConnect}>서명</LoadButton>
            </Container>
              {showQr && (
                <Img
                  src={qrUrl}
                  onClick={() => setShowQr(false)}
                  alt="Qr_wallet_connect"
                  margin-left="auto"
                  margin-right="auto"
                  margin-top="auto"
                  margin-bottom="auto"
                />
                
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SendTxK;
