import { useState, useEffect } from "react";
import { KaikasConnect } from "../../utils/KaikasConnect";
import { useConnWalletInfo } from "../../App";
import { useVerificationStore } from "../../App";
import styled from "styled-components";

const Bt1 = styled.button`
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #000;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    border-color: #000;
    color: #fff;
  }
`;

const Bt2 = styled.button`
  width: 70px;
  height: 30px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #ffffff;
  background-color:  #00eeff;
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0px 6px 0px 6px;

  &:hover {
    background-color: #ffffff;
    border: 1px solid #00eeff;
    color: #00eeff;
  }
`;

const Bt3 = styled.button`
  width: 70px;
  height: 30px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #ffffff;
  background-color:  #4873ff;
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0px 6px 0px 6px;

  &:hover {
    background-color: #ffffff;
    border: 1px solid #4873ff;
    color: #4873ff;
  }
`;

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
            <img
              src={qrUrl}
              onClick={() => setShowQr(false)}
              alt="Qr_wallet_connect"
            />
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
