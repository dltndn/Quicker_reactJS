
const platformFeeRate = 0.01
const insuranceFeeRate = 0.01
const securityDepositRate = 0.1

export const calQuickerIncomeNum = (orderPrice: number): number => {
    if (orderPrice === 0) {
        return 0
    }
    const platformFee = orderPrice * platformFeeRate
    const insuranceFee = orderPrice * insuranceFeeRate 
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result)
}

export const calSecurityDepositNum = (orderPrice: number): number => {
    if (orderPrice === 0) {
        return 0
    }
    let result = orderPrice * securityDepositRate
    return Math.floor(result)
}

export const calQuickerIncome = (orderPrice: number): string => {
    if (orderPrice === 0) {
        return "0"
    }
    const platformFee = orderPrice * platformFeeRate
    const insuranceFee = orderPrice * insuranceFeeRate 
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result).toLocaleString()
}
export const calSecurityDeposit = (orderPrice: number): string => {
    if (orderPrice === 0) {
        return "0"
    }
    let result = orderPrice * securityDepositRate
    return Math.floor(result).toLocaleString()
}

export const extractNumber = (priceChar: string) => {
    const numStr = priceChar.replace(/[^\d]/g, ''); 
    return parseInt(numStr, 10);
  }

export const changeBalanceToForm = (balance:BigInt):string => {
    if (Number(balance) === 0) 
        return "0"
    let result = parseInt(balance.toString().slice(0, -18))
    return result.toLocaleString()
  }

export const sliceAddress = (address: string):string => {
    return address.slice(0, 8) + "..."
}