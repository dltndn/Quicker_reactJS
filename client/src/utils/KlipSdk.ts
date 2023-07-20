import {
  prepare,
  request as klipRequest,
  getResult as getKlipResult,
  //@ts-ignore
} from "klip-sdk";
import axios, { AxiosResponse } from "axios";

var QRCode = require("qrcode");

const MAIN_URL = "http://localhost:3000/";
const APP_NAME = "Quicker";

export class KlipSdk {
  constructor() {}

  public getKlipReqKeyAuth = async (isMobile: boolean) => {
    const mobilePara = {
      bappName: APP_NAME,
      successLink: MAIN_URL,
      failLink: MAIN_URL,
    };

    const para = {
      bapp: { name: APP_NAME },
      callback: {
        success: "mybapp://klipwallet/success",
        fail: "mybapp://klipwallet/fail",
      },
      type: "auth",
    };

    try {
      if (isMobile) {
        const response = await prepare.auth(mobilePara);
        return response.request_key;
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_TEMP_SERVER_URL}getRequestKey`,
          { data: para }
        );
        return response.data;
      }
    } catch (e) {
      return null;
    }
  };

  public getKlipReqKeySendToken = async (toAddress: string, amount: string) => {
    const bappName = 'Quicker'
    const from = ''
    const to = toAddress
    const successLink = MAIN_URL
    const failLink = MAIN_URL
    try {
      const res = await prepare.sendKLAY({ bappName, from, to, amount, successLink, failLink })
      return res.request_key
    } catch (e) {
      alert(JSON.stringify(e))
      return null
    }
  }

  public getAddress = async (request_key: string, isMobile: boolean) => {
    const para = request_key;
    return new Promise(async (resolve) => {
      if (isMobile) {
        klipRequest(request_key);
      }
      const timerId = setInterval(async () => {
        if (isMobile) {
          const res = await axios.get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          );
          const currentTime = Math.floor(Date.now() / 1000);
          if (res.data.status === "completed") {
            clearInterval(timerId);
            resolve(res.data.result.klaytn_address);
          } else if (currentTime > res.data.expiration_time) {
            clearInterval(timerId);
          }
        } else {
          const res = await axios.post(
            `${process.env.REACT_APP_TEMP_SERVER_URL}getResult`,
            { data: para }
          );
          const currentTime = Math.floor(Date.now() / 1000);
          if (res.data.status === "completed") {
            clearInterval(timerId);
            resolve(res.data.result.klaytn_address);
          } else if (currentTime > res.data.expiration_time) {
            clearInterval(timerId);
          }
        }
      }, 1000);
    });
  };

  public getTxHash = async (request_key: string) => {
    klipRequest(request_key);
    return new Promise(async (resolve) => {
      const timerId = setInterval(async () => {
        const data = await getKlipResult(request_key)
        const currentTime = Math.floor(Date.now() / 1000);
        if (data.status === "completed") {
          resolve(data.result.tx_hash)
          clearInterval(timerId);
        } else if (currentTime > data.expiration_time) {
          clearInterval(timerId);
        }
      }, 1000)
    })
  }

  public sendKlay = async (
    from: string,
    to: string,
    amount: number,
    isMobile: boolean
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (isMobile) {
        const response = await prepare.sendToken({
          bappName: APP_NAME,
          from,
          to,
          amount: amount.toString(),
          contract: "0x0000000000000000000000000000000000000000",
          successLink: MAIN_URL,
          failLink: MAIN_URL,
        });
        resolve(await this.reqAndGetRes(response.request_key, 3));
      } else {

      }
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
          switch (caseNum) {
            case 1:
              resolve(data.result.klaytn_address);
              break;
            case 3:
              resolve(data.result.tx_hash);
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
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    return null;
  }
};
