import { readContract, readContracts, } from '@wagmi/core'
import { QKRW_CONTRACT_ABI,
  QKRW_ADDRESS, QUICKER_ADDRESS, QUICKER_CONTRACT_ABI } from '../contractInformation'
import { getDateFromTimestamp } from './ConvertTimestampToDate';

const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

export const getAllowance =async (address:`0x${string}` | undefined) => {
  const data = await readContract({
    address: Qkrw_address,
    abi: Qkrw_abi,
    functionName: "allowance",
    args: [address, Quicker_address],
  })
  return data
}

export const getOrders = async (orderNumList:string[]) => {
  const quickerContract = {
    address: Quicker_address,
    abi: Quicker_abi
  }

  const orderNumListToObjList = (orderNumList:string[]) => {
    let objList:object[] = []
    orderNumList.map((value) => (objList.push({
      ...quickerContract,
      functionName: 'getOrder',
      args: [value]
    })))
    return objList
  }

  const data = await readContracts({
    contracts: orderNumListToObjList(orderNumList) as any
  })

  let orderList:any[] = []

  data.map((value) => (orderList.push(TemplateOrder(value))))
  return orderList
}

export const getOrder = async(orderNum:string) => {
  const data = await readContract({
      address: Quicker_address,
      abi: Quicker_abi,
      functionName: "getOrder",
      args: [orderNum],
    })
    return TemplateOrder(data)
}

export const getLastClientOrder = async (address:`0x${string}` | undefined) => {
  if (address === undefined){
    return undefined
  }
  let orderList = await getClientOrderList(address)
  if (orderList === undefined) {
    return undefined
  }
  let result = orderList[orderList.length - 1]
  return result
}

export const getClientOrderList = async(address:`0x${string}` | undefined) => {
  if (address === undefined){
    return undefined
  }
  const data:any = await readContract({
    address: Quicker_address,
    abi: Quicker_abi,
    functionName: "getClientOrderList",
    args: [address],
  })
  let result:string[] = []
  data.forEach((element: any) => result.push(BigInt(element._hex).toString()));  
  return result
}

const TemplateOrder = (data: any) => {
    let obj = {orderNum: BigInt(data[0]._hex).toString(),
    client: JSON.stringify(data[1]),
    quicker: JSON.stringify(data[2]),
    state: ConvertStateData(data[3]),
    orderPrice: ConvertCostData(data[4]),
    securityDeposit: ConvertCostData(data[5]),
    limitedTime: ConvertDateData(data[6]),
    createdTime: ConvertDateData(data[7]),
    matchedTime: ConvertDateData(data[8]),
    deliveredTime: ConvertDateData(data[9]),
    completedTime: ConvertDateData(data[10]),}
    return obj
  };
  
  const ConvertStateData = (state: number): string => {
    const stateArr = ["created", "matched", "completed", "failed", "canceled"];
  
    const result = stateArr[state];
    return result;
  };
  
  const ConvertCostData = (cost: any): string|null => {
    let result:string|null
    if (cost == 0) {
      result = null
    } else {
      result = BigInt(cost._hex).toLocaleString() + '원';
    }
    return result;
  };
  
  const ConvertDateData = (timestamp: any) => {
    if (timestamp == 0) {
      return null
    } else {
      const { year, month, day, hours, minutes } = getDateFromTimestamp(timestamp)
      const result = {
        year,
        month,
        day,
        hours,
        minutes
      }
      return (result)
    }
  }