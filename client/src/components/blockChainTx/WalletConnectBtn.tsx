import { useState, useEffect } from "react";
import { KaikasConnect } from "../../utils/KaikasConnect";
import { useConnWalletInfo } from "../../App";

var QRCode = require("qrcode");

const WalletConnectBtn = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const { address, setAddress, setIsMobile, setIsConneted } =
    useConnWalletInfo();

  const kConn = new KaikasConnect();

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const adrr = await kConn.getAddress(reqKey, true);
    if (adrr === null) {
      setAddress(undefined);
      setIsMobile(null);
      setIsConneted(false);
      localStorage.setItem("kaikas_address", JSON.stringify(null));
      localStorage.setItem("kaikas_isMobile", JSON.stringify(true));
    } else {
      setAddress(JSON.stringify(adrr));
      setIsMobile(true);
      setIsConneted(true);
      localStorage.setItem("kaikas_address", JSON.stringify(adrr));
      localStorage.setItem("kaikas_isMobile", JSON.stringify(true));
    }
  };

  const qrConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const qrUrlStr = await generateQRCode(`https://app.kaikas.io/a/${reqKey}`);
    setQrUrl(qrUrlStr);
    setShowQr(true);
    const adrr = await kConn.getAddress(reqKey, false);
    if (adrr === null) {
      setAddress(undefined);
      setIsMobile(null);
      setIsConneted(false);
      localStorage.setItem("kaikas_address", JSON.stringify(undefined));
      localStorage.setItem("kaikas_isMobile", JSON.stringify(false));
    } else {
      setAddress(JSON.stringify(adrr));
      setIsMobile(false);
      setIsConneted(true);
      localStorage.setItem("kaikas_address", JSON.stringify(adrr));
      localStorage.setItem("kaikas_isMobile", JSON.stringify(false));
    }
  };

  const disConnect = () => {
    setAddress(undefined);
    setIsMobile(null);
    setIsConneted(false);
    localStorage.setItem("kaikas_address", JSON.stringify(undefined));
  };

  useEffect(() => {
    return () => {
      setShowQr(false);
      setQrUrl("");
    };
  }, []);

  return (
    <>
      {address === undefined ? (
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
        </>
      ) : (
        <button onClick={disConnect}>지갑 연결 해제</button>
      )}
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
