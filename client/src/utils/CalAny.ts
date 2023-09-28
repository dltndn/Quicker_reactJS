import axios from "axios"
const platformFeeRate = 0.02
const insuranceFeeRate = 0.02
const securityDepositRate = 0.1

const getCommissionRate = async () => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}caver/getCommissionRate`);
        return data.data
      } catch (e) {
        console.log(e)
        return null
      }
}

export const calQuickerIncomeNum = async(orderPrice: number): Promise<number> => {
    if (orderPrice === 0) {
        return 0
    }
    const commissionRate = await getCommissionRate()
    const platformFee = orderPrice * Number(commissionRate[0]) / 1000
    const insuranceFee = orderPrice * Number(commissionRate[1]) / 1000
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result)
}

export const calSecurityDepositNum =async(orderPrice: number): Promise<number> => {
    if (orderPrice === 0) {
        return 0
    }
    const commissionRate = await getCommissionRate()
    let result = orderPrice * Number(commissionRate[2]) / 1000
    return Math.floor(result)
}

export const calQuickerIncome = async(orderPrice: number): Promise<string> => {
    if (orderPrice === 0) {
        return "0"
    }
    const commissionRate = await getCommissionRate()
    const platformFee = orderPrice * Number(commissionRate[0]) / 1000
    const insuranceFee = orderPrice * Number(commissionRate[1]) / 1000
    let result = orderPrice - platformFee - insuranceFee
    return Math.floor(result).toLocaleString()
}
export const calSecurityDeposit = async(orderPrice: number): Promise<string> => {
    if (orderPrice === 0) {
        return "0"
    }
    const commissionRate = await getCommissionRate()
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