import { useState, useEffect } from "react";
import { KaikasConnect } from "../../utils/KaikasConnect";
import { useConnWalletInfo } from "../../App";
import { useVerificationStore } from "../../App";
import styled from "styled-components";
import Modal from "./QrModal";
import { WalletConnectBtnStyle } from "../../StyleCollection";

const {Bt1, Bt2, Bt3} = new WalletConnectBtnStyle()

var QRCode = require("qrcode");

const WalletConnectBtn = () => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const { address, setAddress, setIsMobile, setIsConneted } = useConnWalletInfo();
  const { setIsMember, setUserName} = useVerificationStore()

  const kConn = new KaikasConnect();

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const adrr = await kConn.getAddress(reqKey, true);
    if (adrr === null) {
      disConnect();
      localStorage.setItem("kaikas_isMobile", true.toString());
    } else {
      connect(adrr, true)
    }
  };

  const qrConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyAuth();
    const qrUrlStr = await generateQRCode(`https://app.kaikas.io/a/${reqKey}`);
    setQrUrl(qrUrlStr);
    setShowQr(true);
    const adrr = await kConn.getAddress(reqKey, false);
    if (adrr === null) {
      disConnect();
      localStorage.setItem("kaikas_isMobile", false.toString());
    } else {
      connect(adrr, false)
    }
  };

  const connect = (address: unknown, isMobile: boolean) => {
    setAddress(address?.toString());
    setIsMobile(isMobile);
    setIsConneted(true);
    // @ts-ignore
    localStorage.setItem("kaikas_address", address);
    localStorage.setItem("kaikas_isMobile", isMobile.toString());
  };

  const disConnect = () => {
    setAddress(undefined);
    setIsMobile(null);
    setIsConneted(false);
    setIsMember(false)
    setUserName(null)
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
          <Bt2 onClick={mobileConnect}>앱연결</Bt2>
          <Bt3 onClick={qrConnect}>큐알연결</Bt3>
          {showQr && (
            <Modal isOpen={showQr} onClose={() => setShowQr(false)} imageUrl={qrUrl} />
          )}
        </>
      ) : (
        <Bt1 onClick={disConnect}>연결해제</Bt1>
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
