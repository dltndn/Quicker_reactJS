import { KaikasConnect } from "../../utils/KaikasConnect";
import { useState, useEffect } from "react";
import { generateQRCode } from "../../utils/GenerateQr";
import { SendTxType } from "../../utils/KaikasConnect";

type SendTokenProps = {
  param: SendTxType;
  successFunc: () => void;
};

const SendTxK = ({ param, successFunc }: SendTokenProps) => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [txHash, setTxHash] = useState<unknown>("");

  const kConn = new KaikasConnect();

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyTx(param);
    try {
      const res = await kConn.getTxResult(reqKey, true);
      setTxHash(res);
      successFunc()
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
      const res = await kConn.getTxResult(reqKey, false);
      setTxHash(res);
      setShowQr(false);
      setQrUrl("");
      successFunc()
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return () => {
      setShowQr(false);
      setQrUrl("");
      setTxHash("");
    };
  }, []);

  return (
    <>
      <button onClick={mobileConnect}>모바일에서 실행</button>
      <button onClick={qrConnect}>데탑에서 실행</button>
      {showQr && (
        <img
          src={qrUrl}
          onClick={() => setShowQr(false)}
          alt="Qr_wallet_connect"
        />
      )}
      {txHash}
    </>
  );
};

export default SendTxK;
