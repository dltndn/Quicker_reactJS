import { SetStateAction } from "react"
import Handler from "../../lib/Handler"
import { getNameInterface } from "./getNameInterface"

const getName = async ({ blockchainElement, address, setState }: getNameInterface) => {
    if (blockchainElement.client === address) {
        const data = await Handler.post({ walletAddress: blockchainElement.quicker }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
    else {
        const data = await Handler.post({ walletAddress: blockchainElement.client }, process.env.REACT_APP_SERVER_URL + "getUserNameUseByWalletAddress")
        isMember(data, setState)
    }
}

const isNameNull = (data: { name: null | string; }): boolean => {
    if (data.name === null) {
        return true
    }
    else {
        return false
    }
}

const isMember = (data: { name: string | null }, setState: React.Dispatch<SetStateAction<string>>): void => {
    if (isNameNull(data)) {
        setState("탈퇴한 회원입니다.");
    } else if (data.name) {
        setState(data.name);
    }
}

export default getName