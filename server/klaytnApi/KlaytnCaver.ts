import { Request, Response } from "express";
import { config } from "dotenv";
import Caver from "caver-js";
import {
  QKRW_CONTRACT_ABI_KLAYTN,
  QKRW_ADDRESS_KLAYTN,
  QUICKER_TOKEN_ADDRESS_KLAYTN,
  VQUICKER_TOKEN_ADDRESS_KLAYTN,
  QUICKER_DLVR_ABI_KLAYTN,
  QUICKER_DLVR_ADDRESS_KLAYTN,
  QUICKER_STAKING_ABI_KLAYTN,
  QUICKER_STAKING_ADDRESS_KLAYTN,
  QUICEKR_FEE_GOVERNOR_ABI_KLAYTN,
  QUICKER_FEE_GOVERNOR_ADDRESS_KLAYTN,
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
// @ts-ignore
const quicker_fee_governor_contract = caver.contract.create(QUICEKR_FEE_GOVERNOR_ABI_KLAYTN,
  QUICKER_FEE_GOVERNOR_ADDRESS_KLAYTN
);
const quicker_token = new caver.kct.kip7(QUICKER_TOKEN_ADDRESS_KLAYTN)
const vQuicker_token = new caver.kct.kip7(VQUICKER_TOKEN_ADDRESS_KLAYTN)

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
  getStakingInfo: async (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      let quickerTotalSuupply = (await quicker_token.totalSupply()).toString()
      quickerTotalSuupply = floorDecimals(caver.utils.convertFromPeb(quickerTotalSuupply, 'KLAY')) 
      let quickerTotalStakingAmount = (await quicker_token.balanceOf(QUICKER_STAKING_ADDRESS_KLAYTN)).toString()
      quickerTotalStakingAmount = floorDecimals(caver.utils.convertFromPeb(quickerTotalStakingAmount, 'KLAY')) 
      let userVQuickerBal = (await vQuicker_token.balanceOf(address)).toString()
      userVQuickerBal = floorDecimals(caver.utils.convertFromPeb(userVQuickerBal, 'KLAY'))
      let userQuickerBal = (await quicker_token.balanceOf(address)).toString()
      userQuickerBal = floorDecimals(caver.utils.convertFromPeb(userQuickerBal, 'KLAY')) 
      const userStakedQuickerBal = await quicker_staking_contract.call("stakerAmounts", address)
      const interestRate = await quicker_staking_contract.call("interestRate")
      let rewardRate = (Number(userVQuickerBal) / Number(userStakedQuickerBal) * Number(interestRate) * 3.65).toString()
      const endBlockNum = await quicker_staking_contract.call("endAt", address)
      let pendingRewards = await quicker_staking_contract.call("getPendingReqwards", address);
      pendingRewards = caver.utils.convertFromPeb(pendingRewards, 'KLAY')
  
      let currentBlockNumS = await caver.rpc.klay.getBlockNumber()
      const currentBlockNum = caver.utils.hexToNumber(currentBlockNumS)
      const index = Number(endBlockNum) - currentBlockNum
      const currentTimeStamp = new Date().getTime() / 1000;
      let endTimeStamp = currentTimeStamp + index

      if (userVQuickerBal === "0") {
        endTimeStamp = 0
        rewardRate = ""
      }
      const result = {
        quickerTotalSuupply,
        quickerTotalStakingAmount,
        rewardRate,
        endTimeStamp,
        pendingRewards,
        userStakedQuickerBal,
        userQuickerBal,
      }
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getQtokenAllowance: async (req: Request, res: Response) => {
    try {
      const { address } = req.body;
      const allowance = await quicker_token.allowance(address, QUICKER_STAKING_ADDRESS_KLAYTN)
      res.send(allowance);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getFeeGovernorRoundLogs: async (req: Request, res: Response) => {
    try {
      let { index } = req.body
      let currentRound = await quicker_fee_governor_contract.call("currentRound"); // string
      index = Number(index)
      currentRound = Number(currentRound)
      let resultArr: any[] = []
      if (currentRound - index < 0) {
        for(let i=currentRound; i>0; --i) {
          const result = await quicker_fee_governor_contract.call("roundLog", i);
          resultArr.push(result)
        }
      } else {
        for(let i=currentRound; i>(currentRound-index); --i) {
          const result = await quicker_fee_governor_contract.call("roundLog", i);
          resultArr.push(result)
        }
      }
      res.send(resultArr);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  getCurrentFeeGovernorInfo: async (req: Request, res: Response) => {
    const calRewards = async (roundNum: string, votedbal: number) => {
      const roundInfo = await quicker_fee_governor_contract.call("roundLog", roundNum)
      let totalIncome = roundInfo.totalIncome 
      totalIncome = floorDecimals(caver.utils.convertFromPeb(totalIncome, 'KLAY')) // 해당 라운드 수익
      let totalVotePower = 0 // 전체 투표량
      for (let i=0; i<roundInfo.treasuryFee.length/2; i++) {
        totalVotePower += Number(roundInfo.treasuryFee[i])
      }
      return Number(totalIncome) * (votedbal / totalVotePower) 
    }
    try {
      let { address } = req.body
      let userVotePower = (await vQuicker_token.balanceOf(address)).toString()
      userVotePower = floorDecimals(caver.utils.convertFromPeb(userVotePower, 'KLAY')) // 보유 투표권
      const votedInfo = await quicker_fee_governor_contract.call("voters", address)
      let votedBal = 0 // 유저 이번 라운드 투표량
      
      const currentRound = await quicker_fee_governor_contract.call("currentRound")
      let userRewards = "0"
      if (votedInfo.lastVoteRound !== currentRound && votedInfo.lastVoteRound !== "0") {
        for (let i=0; i<votedInfo.treasuryFee.length/2; i++) {
          votedBal += Number(votedInfo.treasuryFee[i])
        }
        userRewards = String(await calRewards(votedInfo.lastVoteRound, votedBal))
        userRewards = floorDecimals(caver.utils.convertFromPeb(userRewards, 'KLAY')) // 유저 수익
      }
      const userVoteEnable = String(Number(userVotePower) - votedBal) // 가용 투표권

      const roundInfo = await quicker_fee_governor_contract.call("roundLog", currentRound) // 현재 라운드 정보 
      let totalIncome = roundInfo.totalIncome 
      totalIncome = floorDecimals(caver.utils.convertFromPeb(totalIncome, 'KLAY'))
      let totalVoted = 0 // 전체 투표량
      for (let i=0; i<roundInfo.treasuryFee.length/2; i++) {
        totalVoted += Number(roundInfo.treasuryFee[i])
      }
      const totalVotePower = totalVoted.toString()
      const currentCommissionRate = await quicker_drvr_contract.call("getCommissionRate");
      const currentFee = String(Number(currentCommissionRate[0]) / 10) // 현재 거래 수수료
      const currentSecuDepo = String(Number(currentCommissionRate[2]) / 10) // 현재 배송원 보증금

      // 거래 수수료 득표량
      const increaseFee = roundInfo.treasuryFee[0]
      const freezeFee = roundInfo.treasuryFee[1]
      const decreaseFee = roundInfo.treasuryFee[2]

      // 배송원 보증금 득표량
      const increaseSecuDepo = roundInfo.securityDepositFee[0]
      const freezeSecuDepo = roundInfo.securityDepositFee[1]
      const decreaseSecuDepo = roundInfo.securityDepositFee[2]
      
      const result = {
        userVotePower,
        userVoteEnable,
        userRewards,
        totalIncome,
        totalVotePower,
        currentFee,
        increaseFee,
        freezeFee,
        decreaseFee,
        currentSecuDepo,
        increaseSecuDepo,
        freezeSecuDepo,
        decreaseSecuDepo,
      }
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
  // function call test
  getOwner: async (req: Request, res: Response) => {
    try {
      // const userStakedQuickerBal = await quicker_staking_contract.call("stakerAmounts", "0xCddac757405Eb41D080334B0A72264b35a2e5f08")
      // const allowance = await quicker_token.allowance("0x4068f9E751954D162ab858276f2F208D79f10930", QUICKER_STAKING_ADDRESS_KLAYTN)
      const currentRound = await quicker_fee_governor_contract.call("currentRound");
      console.log(typeof(currentRound))
      res.send(currentRound);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },
};

const floorDecimals = (para: string) => {
  const index = para.indexOf(".");
  const result = index !== -1 ? para.substring(0, index + 2) : para;
  return result;
}