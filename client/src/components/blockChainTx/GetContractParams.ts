/* eslint-disable import/no-anonymous-default-export */
import { SendTokenTxType } from "../../utils/KaikasConnect"
import { to18decimals } from "../../utils/CalAny";
import { QKRW_ADDRESS_KLAYTN } from "../../contractInformation";

export default {
    SendQkrwToken: (reciever: string, ammount: number): SendTokenTxType => {
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
    },
}