
export const calQuickerIncomeNum = (orderPrice: number, commissionRate: string[]): number => {
    if (orderPrice === 0) {
        return 0
    }
    const platformFee = orderPrice * Number(commissionRate[0]) / 1000
    const insuranceFee = orderPrice * Number(commissionRate[1]) / 1000
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result)
}

export const calSecurityDepositNum = (orderPrice: number, commissionRate: string[]): number => {
    if (orderPrice === 0) {
        return 0
    }
    let result = orderPrice * Number(commissionRate[2]) / 1000
    return Math.floor(result)
}

export const calQuickerIncome = (orderPrice: number, commissionRate: string[]): string => {
    if (orderPrice === 0) {
        return "0"
    }
    const platformFee = orderPrice * Number(commissionRate[0]) / 1000
    const insuranceFee = orderPrice * Number(commissionRate[1]) / 1000
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result).toLocaleString()
}
export const calSecurityDeposit = (orderPrice: number, commissionRate: string[]): string => {
    if (orderPrice === 0) {
        return "0"
    }
    let result = orderPrice * Number(commissionRate[2]) / 1000
    return Math.floor(result).toLocaleString()
}

export const extractNumber = (priceChar: string) => {
    const numStr = priceChar.replace(/[^\d]/g, ''); 
    return parseInt(numStr, 10);
  }

export const changeBalanceToForm = (balance: BigInt):string => {
    if (Number(balance) === 0) 
        return "0"
    let result = parseInt(balance.toString().slice(0, -18))
    return result.toLocaleString()
  }

export const sliceAddress = (address: string):string => {
    return address.slice(0, 8) + "..."
}

export const to18decimals = (amm: number): string => {
    const res = amm * 10 ** 18
    return res.toString()
}

// 해당 이미지 id 경로 반환
export const getNftImgPath = (id: string) => {
  return `/NftImg/${id}.png`;
};