import axios from "axios";

const MAIN_URL = "http://localhost:3000/";
const APP_NAME = "Quicker";
const CHAIN_ID = 1001 // mainnet: 8217

export class KaikasConnect {
  constructor() {}

  public getKaikasReqKeyAuth = async () => {
    const para = {
      type: "auth",
      chain_id: CHAIN_ID,
      bapp: {
        name: APP_NAME,
        // callback: {
        //   success: MAIN_URL,
        //   fail: MAIN_URL,
        // },
      },
    };
    try {
      const res = await axios.post(
        "https://api.kaikas.io/api/v1/k/prepare",
        para,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.request_key;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  public getKaikasReqKeyTx = async (tx: SendTokenTxType) => {
    const para = {
        type: "execute_contract",
        chain_id: CHAIN_ID,
        bapp: {
          name: APP_NAME,
        //   callback: {
        //     success: "https://www.google.com/search?q=success",
        //     fail: "https://www.google.com/search?q=fail"
        //   }
        },
        transaction: tx
      };
    
    try {
      const res = await axios.post(
        "https://api.kaikas.io/api/v1/k/prepare",
        para,
        { headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
      return res.data.request_key;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  public getAddress = async (reqKey: string, isMobile: boolean) => {
    if (isMobile) {
        window.location.href = `kaikas://wallet/api?request_key=${reqKey}`
    }
    return new Promise(async (resolve) => {
      const timerId = setInterval(async () => {
        const res = await axios.get(
          `https://api.kaikas.io/api/v1/k/result/${reqKey}`
        );
        const currentTime = Math.floor(Date.now() / 1000);
        if (res.data.status === "completed") {
          clearInterval(timerId);
          resolve(res.data.result.klaytn_address);
        } else if (currentTime > res.data.expiration_time) {
          clearInterval(timerId);
        }
      }, 1000);
    });
  };

  public getTxResult = async (reqKey: string, isMobile: boolean) => {
    if (isMobile) {
        window.location.href = `kaikas://wallet/api?request_key=${reqKey}`
    }
    return new Promise(async (resolve) => {
        const timerId = setInterval(async () => {
          const res = await axios.get(
            `https://api.kaikas.io/api/v1/k/result/${reqKey}`
          );
          console.log(res)
          const currentTime = Math.floor(Date.now() / 1000);
          if (res.data.status === "completed") {
            clearInterval(timerId);
            resolve(res.data.result.tx_hash);
          } else if (currentTime > res.data.expiration_time) {
            clearInterval(timerId);
          }
        }, 1000);
      });
  }
}

export interface SendTokenTxType {
    abi: string;
    value: string;
    to: string;
    params: string;
}
