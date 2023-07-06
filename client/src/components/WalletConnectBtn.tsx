import { useState, useEffect } from "react";
import { KlipSdk } from "../utils/KlipSdk";
import axios from "axios";

var QRCode = require("qrcode");

const WalletConnectBtn = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [address, setAddress] = useState<unknown>("");

  const klip = new KlipSdk();

  const mobileConnect = async () => {
    const reqKey = await klip.getKlipReqKey();
    const adrr = await klip.getAddress(reqKey, 1)
    setAddress(adrr)
  }

  const qrConnect = async () => {
    const reqKey = await klip.getKlipReqKey();
    const qrUrlStr = await generateQRCode(
      `https://klipwallet.com/?target=/a2a?request_key=${reqKey}`
    );
    setQrUrl(qrUrlStr);
    setShowQr(true);
    const adrr = await klip.getAddress(reqKey, 2)
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
