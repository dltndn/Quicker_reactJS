import { SetStateAction } from "react"
import Handler from "../../lib/Handler"
import { getNameInterface } from "./interface/getNameInterface"

const getName = async ({ blockchainElement, address, setState }: getNameInterface) => {
    let clientWalletAddress = delelteDoubleQuote(blockchainElement.client)
    if (clientWalletAddress === address) {
        const walletAddress = delelteDoubleQuote(blockchainElement.quicker)
        console.log("사용자의 접속된 지갑 주소 : " ,address)
        console.log("요청하는 블록체인 지갑 주소 : ", walletAddress)
        const data = await Handler.post({ walletAddress: walletAddress }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
    else {
        const walletAddress = delelteDoubleQuote(blockchainElement.client)
        console.log("사용자의 접속된 지갑 주소 : " ,address)
        console.log("요청하는 블록체인 지갑 주소 : ", walletAddress)
        const data = await Handler.post({ walletAddress: walletAddress }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
}

const isMember = (data: { name: string | null }, setState: React.Dispatch<SetStateAction<string>>): void => {
    console.log("받는 데이터 :",data)
    if (isNameNull(data)) {
        setState("탈퇴한 회원입니다.");
    } else if (data.name) {
        setState(data.name);
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

const delelteDoubleQuote = (blockChainAddress : string) => {
    return blockChainAddress.substring(1,blockChainAddress.length-1)
}

export default getName