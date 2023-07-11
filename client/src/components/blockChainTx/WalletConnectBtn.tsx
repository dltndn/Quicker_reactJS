import { useState, useEffect } from "react";
import { KaikasConnect } from "../../utils/KaikasConnect";

var QRCode = require("qrcode");

const WalletConnectBtn = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [address, setAddress] = useState<unknown>("");

  const kConn = new KaikasConnect();

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const adrr = await kConn.getAddress(reqKey, true)
    setAddress(adrr)
  }

  const qrConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const qrUrlStr = await generateQRCode(
        `https://app.kaikas.io/a/${reqKey}`
    );
    setQrUrl(qrUrlStr);
    setShowQr(true);
    const adrr = await kConn.getAddress(reqKey, false)
    console.log(adrr)
    setAddress(adrr)
  };

  useEffect(() => {
    return () => {
        setShowQr(false)
        setQrUrl("")
        setAddress("")
    }
  }, []);

  return (
    <>
      <button onClick={mobileConnect}>모바일 연결</button>
      <button onClick={qrConnect}>큐알 연결</button>
      {showQr && (
        <img
          src={qrUrl}
          onClick={() => setShowQr(false)}
          alt="Qr_wallet_connect"
        />
      )}
      {address}
    </>
  );
};

export default WalletConnectBtn;

const generateQRCode = async (url: string) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    return null;
  }
};
