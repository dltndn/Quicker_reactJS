import { Request, Response } from "express";
import axios from "axios";
import { config } from "dotenv";
import Caver from "caver-js";
import {
  QKRW_CONTRACT_ABI_KLAYTN,
  QKRW_ADDRESS_KLAYTN,
  QUICKER_DLVR_ABI_KLAYTN,
  QUICKER_DLVR_ADDRESS_KLAYTN,
  QUICKER_STAKING_ABI_KLAYTN,
  QUICKER_STAKING_ADDRESS_KLAYTN,
} from "./ContractInfo";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

// @ts-ignore
const qkrw_token_contract = caver.contract.create(QKRW_CONTRACT_ABI_KLAYTN,
  QKRW_ADDRESS_KLAYTN
);
// @ts-ignore
const quicker_drvr_contract = caver.contract.create(QUICKER_DLVR_ABI_KLAYTN,
  QUICKER_DLVR_ADDRESS_KLAYTN
);
// @ts-ignore
const quicker_staking_contract = caver.contract.create(QUICKER_STAKING_ABI_KLAYTN,
  QUICKER_STAKING_ADDRESS_KLAYTN
);

export default {
  getAllowance: async (req: Request, res: Response) => {
    try {
      const para = req.body.owner;
      const result = await qkrw_token_contract.call(
        "allowance",
        para,
        QUICKER_DLVR_ADDRESS_KLAYTN
      );
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  getQkrwBal: async (req: Request, res: Response) => {
    try {
      const para = req.body.owner;
      const result = await qkrw_token_contract.call("balanceOf", para);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrderList: async (req: Request, res: Response) => {
    try {
      const funcName = req.body.funcName;
      const para = req.body.owner;
      const result = await quicker_drvr_contract.call(funcName, para);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrdersForLatest: async (req: Request, res: Response) => {
    try {
      const para = req.body.amount;
      const result: any = await quicker_drvr_contract.call(
        "getOrdersForLatest",
        para
      );
      let cResult = [];
      for (let i = 0; i < result.length; i++) {
        const ele = result[i].slice(0, 11);
        cResult.push(ele);
      }
      res.send(cResult);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getCommissionRate: async (req: Request, res: Response) => {
    try {
      const result: any = await quicker_drvr_contract.call("getCommissionRate");
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrder: async (req: Request, res: Response) => {
    try {
      const para = req.body.orderNum;
      const result = await quicker_drvr_contract.call("getOrder", para);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrders: async (req: Request, res: Response) => {
    try {
      const orders: any[] = [];
      const orderNums: string[] = req.body.orderNumList;
      for (const val of orderNums) {
        const result = await quicker_drvr_contract.call("getOrder", val);
        orders.push(result);
      }
      res.send(orders);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrdersForState: async (req: Request, res: Response) => {
    try {
      const { stateNum } = req.body;
      const result = await quicker_drvr_contract.call("getOrdersForState", stateNum);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  // function call test
  getOwner: async (req: Request, res: Response) => {
    try {
      const result = await quicker_drvr_contract.call("clientOfOrder", "0");
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
};
