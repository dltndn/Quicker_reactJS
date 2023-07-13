import { Request, Response } from "express";
import axios from "axios";
import { config } from "dotenv";
import Caver from "caver-js";
import { QKRW_CONTRACT_ABI_KLAYTN, QKRW_ADDRESS_KLAYTN, QUICKER_DLVR_ABI_KLAYTN, QUICKER_DLVR_ADDRESS_KLAYTN } from "./ContractInfo";
const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);
config();

// @ts-ignore
const qkrw_token_contract = caver.contract.create(QKRW_CONTRACT_ABI_KLAYTN, QKRW_ADDRESS_KLAYTN);

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
};
