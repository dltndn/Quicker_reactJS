import { SetStateAction } from "react"
import Handler from "../../lib/Handler"
import { getNameInterface } from "./interface/getNameInterface"
import delelteDoubleQuote from "../../lib/DeleteDoubleQuote"

const getName = async ({ blockchainElement, address, setState }: getNameInterface) => {
    let clientWalletAddress = delelteDoubleQuote(blockchainElement.client)
    if (clientWalletAddress === address) {
        const walletAddress = delelteDoubleQuote(blockchainElement.quicker)
        const data = await Handler.post({ walletAddress: walletAddress }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
    else {
        const walletAddress = delelteDoubleQuote(blockchainElement.client)
        const data = await Handler.post({ walletAddress: walletAddress }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
}

const isMember = (data: { name: string | null }, setState: React.Dispatch<SetStateAction<string>>): void => {
    if (isNameNull(data)) {
        setState("탈퇴한 회원입니다.");
    } else if (data.name) {
        setState(hideCharacters(data.name));
    }
}

const isNameNull = (data: { name: null | undefined | string; }): boolean => {
    if (data.name === null || data.name === undefined) {
        return true
    }
    else {
        return false
    }
}

const hideCharacters = (str: string) => {
    let result = str;
    if (str.length === 2) {
      result = str.charAt(0) + '*' + str.charAt(2);
    } else if (str.length === 3) {
      result = str.charAt(0) + '*' + str.charAt(2);
    } else if (str.length === 4) {
      result = str.charAt(0) + '**' + str.slice(3);
    }
    return result;
  }
  

export default getName