import {
  readContract,
  readContracts,
  prepareWriteContract,
  writeContract,
} from "@wagmi/core";
import {
  QKRW_CONTRACT_ABI,
  QKRW_ADDRESS,
  QUICKER_ADDRESS,
  QUICKER_CONTRACT_ABI,
} from "../contractInformation";
import { getDateFromTimestamp } from "./ConvertTimestampToDate";
import axios from "axios";

const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

const env = process.env;

// 최신순 오더 배열 반환
export const getOrdersForLatest = async (amount: string) => {
  let result: any[] = [];
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrdersForLatest`, {
      amount,
    });
    data.data.forEach((element: any) => result.push(TemplateOrder(element)));
    return result;
  } catch (e) {
    console.log(e)
    return [];
  }
};

// 수수료 조회
export const getCommissionRate = async () => {
  try {
    const data = await axios.get(`${env.REACT_APP_SERVER_URL}caver/getCommissionRate`);
    return data.data; // type: string[]
  } catch (e) {
    return null;
  }
};

// QKRW balance 확인
export const getQkrwBalance = async (address: string | undefined) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getQkrwBalance`, {
      owner: address,
    });
    return data.data; // type: number
  } catch (e) {
    return null;
  }
};

// QKRW token 권한 확인
export const getAllowance = async (address: string | undefined) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getAllowance`, {
      owner: address,
    });
    return data.data; // type: number
  } catch (e) {
    return null;
  }
};

// 오더 객체 배열 반환
export const getOrders = async (orderNumList: string[]) => {
  let orderList: any[] = [];
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrders`, {
      orderNumList,
    });
    data.data.map((value: any) => orderList.push(TemplateOrder(value)));
    return orderList; // type: object[]
  } catch (e) {
    return orderList;
  }
  // getOrders 백엔드 처리
};

// 오더 객체 반환
export const getOrder = async (orderNum: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrder`, {
      orderNum,
    });
    return TemplateOrder(data.data); // type: object
  } catch (e) {
    return null;
  }
};

// 오더 객체 반환(블록체인 raw 값)
export const getOrderRawData = async (orderNum: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrder`, {
      orderNum,
    });
    return TemplateOrderRaw(data.data); // type: object
  } catch (e) {
    return null;
  }
};

// 오더 내역 번호 배열 반환
export const getOrderList = async (
  address: string | undefined,
  isClient: boolean
) => {
  if (address === undefined) {
    return [];
  }
  let functionName = "";
  if (isClient) {
    functionName = "getClientOrderList";
  } else {
    functionName = "getQuickerOrderList";
  }
  let dataRes;
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrderList`, {
      owner: address, 
      funcName: functionName
    });
    dataRes = data.data; // type: number
  } catch(e) {
    console.log(e)
    dataRes = []
  }
  let result: string[] = [];
  dataRes.forEach((element: any) => result.push(BigInt(element).toString()));
  return result;
};

// 의뢰인 마지막 오더 번호 반환
export const getLastClientOrder = async (address: string | undefined) => {
  if (address === undefined) {
    return undefined;
  }
  try {
    const orderList = await getOrderList(address, true);
    if (orderList.length === 0) {
      return undefined;
    }
    const result = orderList[orderList.length - 1];
    return result;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

// 배송원 배송 여부 확인
export const checkIsDelivering = async (address: string | undefined) => {
  let orderNumArr: string[] | undefined;
  try {
    orderNumArr = await getOrderList(address, false);
    if (orderNumArr) {
      if (orderNumArr?.length !== 0) {
        const orderArr: any[] = await getOrders(orderNumArr);
        return orderArr.some((element: any) => element.state === "matched");
      }
    }
    return false;
  } catch (e) {
    console.log(e);
  }
  return false;
};

// 오더 상태에 해당하는 오더정보 배열 반환
// 오더 상태별 오더 데이터들 배열로 반환
//     created -> 0
//     matched -> 1
//     completed -> 2
//     failed -> 3
//     canceled -> 4
export const getOrdersForState = async (_state: number) => {
  const data: any = await readContract({
    address: Quicker_address,
    abi: Quicker_abi,
    functionName: "getOrdersForState",
    args: [_state.toString()],
  });
  let result: any[] = [];
  data.forEach((element: any) => result.push(TemplateOrder(element)));
  return result;
};

export class WriteTransactionToBlockchain {
  private orderNum: string;
  private writeTransaction = async (funcName: string) => {
    const config = await prepareWriteContract({
      address: Quicker_address,
      abi: Quicker_abi,
      functionName: funcName,
      args: [this.orderNum],
    });
    const data = await writeContract(config);
    return data;
  };
  constructor(orderNum: string) {
    this.orderNum = orderNum;
  }

  // 의뢰인 오더 취소 함수
  public cancelOrder = async () => {
    const result = await this.writeTransaction("cancelOrder");
    return result;
  };

  // 배송원 오더 수락 함수
  public acceptOrder = async () => {
    const result = await this.writeTransaction("acceptOrder");
    return result;
  };

  // 배송원 배달 완료 함수
  public deliveredOrder = async () => {
    const result = await this.writeTransaction("deliveredOrder");
    return result;
  };

  // 의뢰인 계약 확정 함수
  public completeOrder = async () => {
    const result = await this.writeTransaction("completeOrder");
    return result;
  };

  // 배송원 정산 함수
  public withdrawFromOrder = async () => {
    const result = await this.writeTransaction("withdrawFromOrder");
    return result;
  };

  // 의뢰인 배송 실패오더 환불 함수
  public failedOrder = async () => {
    const result = await this.writeTransaction("failedOrder");
    return result;
  };
}

// caver-js
const TemplateOrder = (data: any) => {
  let obj = {
    orderNum: data[0],
    client: data[1],
    quicker: data[2],
    state: ConvertStateData(Number(data[3])),
    orderPrice: ConvertCostData(data[4]),
    securityDeposit: ConvertCostData(data[5]),
    limitedTime: ConvertDateData(data[6]),
    createdTime: ConvertDateData(data[7]),
    matchedTime: ConvertDateData(data[8]),
    deliveredTime: ConvertDateData(data[9]),
    completedTime: ConvertDateData(data[10]),
  };
  return obj;
};

const TemplateOrderRaw = (data: any) => {
  let obj = {
    orderNum: data[0],
    client: data[1],
    quicker: data[2],
    state: data[3],
    orderPrice: data[4],
    securityDeposit: data[5],
    limitedTime: data[6],
    createdTime: data[7],
    matchedTime: data[8],
    deliveredTime: data[9],
    completedTime: data[10],
  };
  return obj;
};

const ConvertCostData = (cost: string): string | null => {
  let result: string | null;
  if (cost === "0") {
    result = null;
  } else {
    result = Number(cost).toLocaleString() + "원";
  }
  return result;
};

const ConvertDateData = (timestamp: string) => {
  if (timestamp === "0") {
    return null;
  } else {
    const { year, month, day, hours, minutes } =
      getDateFromTimestamp(Number(timestamp));
    const result = {
      year,
      month,
      day,
      hours,
      minutes,
    };
    return result;
  }
};

// wagmi
// const TemplateOrder = (data: any) => {
//   let obj = {
//     orderNum: BigInt(data[0]._hex).toString(),
//     client: JSON.stringify(data[1]),
//     quicker: JSON.stringify(data[2]),
//     state: ConvertStateData(data[3]),
//     orderPrice: ConvertCostData(data[4]),
//     securityDeposit: ConvertCostData(data[5]),
//     limitedTime: ConvertDateData(data[6]),
//     createdTime: ConvertDateData(data[7]),
//     matchedTime: ConvertDateData(data[8]),
//     deliveredTime: ConvertDateData(data[9]),
//     completedTime: ConvertDateData(data[10]),
//   };
//   return obj;
// };

const ConvertStateData = (state: number): string => {
  const stateArr = ["created", "matched", "completed", "failed", "canceled"];

  const result = stateArr[state];
  return result;
};

// const ConvertCostData = (cost: any): string | null => {
//   let result: string | null;
//   if (cost == 0) {
//     result = null;
//   } else {
//     result = BigInt(cost._hex).toLocaleString() + "원";
//   }
//   return result;
// };

// const ConvertDateData = (timestamp: any) => {
//   if (timestamp == 0) {
//     return null;
//   } else {
//     const { year, month, day, hours, minutes } =
//       getDateFromTimestamp(timestamp);
//     const result = {
//       year,
//       month,
//       day,
//       hours,
//       minutes,
//     };
//     return result;
//   }
// };
