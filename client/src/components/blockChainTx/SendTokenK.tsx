import { KaikasConnect } from "../../utils/KaikasConnect";
import { useState, useEffect } from "react";
import { generateQRCode } from "../../utils/GenerateQr";
import { SendTokenTxType } from "../../utils/KaikasConnect";

import { QKRW_ADDRESS_KLAYTN } from "../../contractInformation";
import { to18decimals } from "../../utils/CalAny";

type SendTokenProps = {
  recieverAddress: string;
  amm: number;
};

const SendToken = ({ recieverAddress, amm }: SendTokenProps) => {
  const [showQr, setShowQr] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [txHash, setTxHash] = useState<unknown>("");

  const kConn = new KaikasConnect();

  const getParams = (reciever: string, ammount: number): SendTokenTxType => {
    const amm = to18decimals(ammount);
    return {
      abi: `{
          "inputs": [
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "transfer",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }`,
      value: "0",
      to: QKRW_ADDRESS_KLAYTN,
      params: `[${reciever}, ${amm}]`,
    };
  };

  const mobileConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyTx(
      getParams(recieverAddress, amm)
    );
    const adrr = await kConn.getTxResult(reqKey, true);
    setTxHash(adrr);
  };

  const qrConnect = async () => {
    const reqKey = await kConn.getKaikasReqKeyTx(
      getParams(recieverAddress, amm)
    );
    const qrUrlStr = await generateQRCode(`https://app.kaikas.io/a/${reqKey}`);
    setQrUrl(qrUrlStr);
    setShowQr(true);
    try {
      const adrr = await kConn.getTxResult(reqKey, false);
      setTxHash(adrr);
      setShowQr(false);
      setQrUrl("");
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

export default SendToken;
