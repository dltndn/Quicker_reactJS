import { useState, useEffect } from "react";
import { KlipSdk } from "../utils/KlipSdk";
import axios from "axios";
import { useNavigate } from "react-router-dom";

var QRCode = require("qrcode");

const WalletConnectBtn = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const klip = new KlipSdk();

  const nav = useNavigate();

  const qrConnect = async () => {
    const reqKey = await klip.getKlipReqKey();

    const qrUrlStr = await generateQRCode(
      `https://klipwallet.com/?target=/a2a?request_key=${reqKey}`
    );
    setQrUrl(qrUrlStr);
    setShowQr(true);

    const timerId = setInterval(async () => {
      const data = await axios.get(
        `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${reqKey}`
      );
      const currentTime = Math.floor(Date.now() / 1000);
      if (data.data.status === "completed") {
        clearInterval(timerId);
        console.log(data.data.result.klaytn_address);
        setQrUrl("");
        setShowQr(false);
        setAddress(data.data.result.klaytn_address);
      } else if (currentTime === data.data.expiration_time) {
        setQrUrl("");
        setShowQr(false);
        clearInterval(timerId);
      }
    }, 1000);
  };

  useEffect(() => {}, [showQr]);
  return (
    <>
      <button>모바일 연결</button>
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
