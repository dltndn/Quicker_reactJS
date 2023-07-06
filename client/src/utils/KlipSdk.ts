import {
  prepare,
  request as klipRequest,
  getResult as getKlipResult,
  //@ts-ignore
} from "klip-sdk";
import axios from "axios";

var QRCode = require('qrcode')

const MAIN_URL = "http://localhost:3000/";
const APP_NAME = "Sentudy";

export class KlipSdk {
  constructor() {}

  public connectToQr = async () => {
    const response = await prepare.auth({
            bappName: "Quicker",
            successLink: MAIN_URL,
            failLink: MAIN_URL,
          });
    generateQRCode(`https://klipwallet.com/?target=/a2a?request_key=${response.request_key}`)
    
  }

  public getKlipReqKey = async () => {
    const response = await prepare.auth({
      bappName: "Quicker",
      successLink: MAIN_URL,
      failLink: MAIN_URL,
    });
    return response.request_key
  }

  public getAddress = async (request_key: string) => {
    const timerId = setInterval(async () => {
      const data = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
      if (data.data.status === "completed") {
        clearInterval(timerId)
        console.log(data.data.result.klaytn_address)
        return data.data.result.klaytn_address
      }
    }, 1000);
  }

  public getAddress_old = async (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const response = await prepare.auth({
        bappName: APP_NAME,
        successLink: MAIN_URL,
        failLink: MAIN_URL,
      });
      alert(response.request_key)
      resolve(await this.reqAndGetRes(response.request_key, 1))
    });
  };

  public sendKlay = async (
    from: string,
    to: string,
    amount: number
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const response = await prepare.sendToken({
        bappName: APP_NAME,
        from,
        to,
        amount: amount.toString(),
        contract: "0x0000000000000000000000000000000000000000",
        successLink: MAIN_URL,
        failLink: MAIN_URL,
      });
      resolve(await this.reqAndGetRes(response.request_key, 3))
    });
  };

  // caseNum -> 1: Auth요청, 2: Sign Message 요청, 3: 이외의 요청
  private reqAndGetRes = async (
    request_key: any,
    caseNum: number
  ): Promise<string> => {
    return new Promise(async (resolve) => {
      klipRequest(request_key);
      const timerId = setInterval(async () => {
        const data = await getKlipResult(request_key);
        if (data.status === "completed") {
          switch(caseNum) {
            case 1:
                resolve(data.result.klaytn_address)
                break;
            case 3:
                resolve(data.result.tx_hash)
                break;
          }
          return () => clearInterval(timerId);
        }
      }, 1000);
    });
  };
}

const generateQRCode = async (url: string) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    return qrCodeDataUrl
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    return null
  }
};