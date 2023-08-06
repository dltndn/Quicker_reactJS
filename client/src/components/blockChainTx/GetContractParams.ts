/* eslint-disable import/no-anonymous-default-export */
import { SendTxType, SendTxDelegationType } from "../../utils/KaikasConnect";
import { to18decimals } from "../../utils/CalAny";
import {
  QKRW_ADDRESS_KLAYTN,
  QUICKER_TOKEN_ADDRESS_KLAYTN,
  QUICKER_DLVR_ADDRESS_KLAYTN,
  QUICKER_STAKING_ADDRESS_KLAYTN,
  QUICKER_FEE_GOVERNOR_ADDRESS_KLAYTN
} from "../../contractInformation";

export default {
  SendQkrwToken: (reciever: string, ammount: number): SendTxType => {
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
      params: `["${reciever}", "${amm}"]`,
    };
  },
  IncreaseAllowanceQkrw: (): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
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
      params: `["${QUICKER_DLVR_ADDRESS_KLAYTN}", "100000000000000000000000000"]`,
      fee_delegated: true
    };
  },
  CreateOrder: (orderPrice: string, deadLine: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_limitedTime",
            "type": "uint256"
          }
        ],
        "name": "createOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderPrice}", "${deadLine}"]`,
      fee_delegated: true
    };
  },
  AcceptOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "acceptOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  DeliveredOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "deliveredOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  WithdrawFromOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "withdrawFromOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  CompleteOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "completeOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  CancelOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "cancelOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  FailedOrder: (orderNum: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderNum",
            "type": "uint256"
          }
        ],
        "name": "failedOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderNum}"]`,
      fee_delegated: true
    }
  },
  stakeQuicker: (amount: string, period: string): SendTxType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_period",
            "type": "uint256"
          }
        ],
        "name": "stakeQuicker",
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
      to: QUICKER_STAKING_ADDRESS_KLAYTN,
      params: `["${amount}", "${period}"]`
    }
  },
  increaseAllowanceQuicker_staking: (): SendTxType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
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
      to: QUICKER_TOKEN_ADDRESS_KLAYTN,
      params: `["${QUICKER_STAKING_ADDRESS_KLAYTN}", "10000000000000000000000000000"]`,
    };
  },
  // staking contract 이자 정산 함수
  claimPendingRewards: (): SendTxType => {
    return {
      abi: `{
        "inputs": [],
        "name": "claimPendingRewards",
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
      to: QUICKER_STAKING_ADDRESS_KLAYTN,
      params: `[]`,
    };
  },
  // FeeGovernor contract 이자 정산 함수
  claimRewards: (): SendTxType => {
    return {
      abi: `{
        "inputs": [],
        "name": "claimRewards",
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
      to: QUICKER_FEE_GOVERNOR_ADDRESS_KLAYTN,
      params: `[]`,
    };
  },
  // FeeGovernor contract 투표 함수
  castVote: (feeIndex: string, secuIndex: string, votePower: string): SendTxType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint8",
            "name": "_treasury",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "_treasuryVoteAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "_securityDeposit",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "_secuVoteAmount",
            "type": "uint256"
          }
        ],
        "name": "castVote",
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
      to: QUICKER_FEE_GOVERNOR_ADDRESS_KLAYTN,
      params: `["${feeIndex}", "${votePower}", "${secuIndex}", "${votePower}"]`,
    };
  },
  // test
  CreateOrderTest: (orderPrice: string, deadLine: string): SendTxDelegationType => {
    return {
      abi: `{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_orderPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_limitedTime",
            "type": "uint256"
          }
        ],
        "name": "createOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }`,
      value: "0",
      to: QUICKER_DLVR_ADDRESS_KLAYTN,
      params: `["${orderPrice}", "${deadLine}"]`,
      fee_delegated: true
    };
  },
};
