import { Request, Response } from "express";
import axios from "axios";
import { config } from "dotenv";
import Caver from "caver-js";
import { QKRW_CONTRACT_ABI_KLAYTN, QKRW_ADDRESS_KLAYTN, QUICKER_DLVR_ABI_KLAYTN, QUICKER_DLVR_ADDRESS_KLAYTN } from "./ContractInfo";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

// @ts-ignore
const qkrw_token_contract = caver.contract.create(QKRW_CONTRACT_ABI_KLAYTN, QKRW_ADDRESS_KLAYTN);
// @ts-ignore
const quicker_drvr_contract = caver.contract.create(QUICKER_DLVR_ABI_KLAYTN, QUICKER_DLVR_ADDRESS_KLAYTN)

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
      const result = await qkrw_token_contract.call(
        "balanceOf",
        para
      );
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getOrderList: async (req: Request, res: Response) => {
    try {
      const funcName = req.body.funcName
      const para = req.body.owner;
      const result = await quicker_drvr_contract.call(
        funcName,
        para
      );
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
};
