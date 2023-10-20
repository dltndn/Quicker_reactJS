import { getDateFromTimestamp } from "./ConvertTimestampToDate";
import axios from "axios";

const env = process.env;

// 최신순 오더 배열 반환(delivery)
export const getOrdersForLatest = async (amount: string) => {
  let result: any[] = [];
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrdersForLatest`, {
      amount,
    });
    if (data.status === 204) {
      return []
    }
    data.data.forEach((element: any) => result.push(TemplateOrder(element)));
    return result;
  } catch (e) {
    console.log(e)
    return [];
  }
};

// 수수료 조회(delivery)
export const getCommissionRate = async () => {
  try {
    const data = await axios.get(`${env.REACT_APP_SERVER_URL}caver/getCommissionRate`);
    if (data.status === 204) {
      return null
    }
    return data.data; // type: number[]
  } catch (e) {
    return null;
  }
};

// QKRW balance 확인(qkrw)
export const getQkrwBalance = async (address: string | undefined) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getQkrwBalance`, {
      owner: address,
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: number
  } catch (e) {
    return null;
  }
};

// QKRW token 권한 확인(qkrw)
export const getAllowance = async (address: string | undefined) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getAllowance`, {
      owner: address,
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: number
  } catch (e) {
    return null;
  }
};

// 오더 객체 배열 반환(delivery)
export const getOrders = async (orderNumList: string[]) => {
  let orderList: any[] = [];
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrders`, {
      orderNumList,
    });
    if (data.status === 204) {
      return []
    }
    data.data.map((value: any) => orderList.push(TemplateOrder(value)));
    return orderList; // type: object[]
  } catch (e) {
    return orderList;
  }
  // getOrders 백엔드 처리
};

// 오더 객체 반환(delivery)
export const getOrder = async (orderNum: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrder`, {
      orderNum,
    });
    if (data.status === 204) {
      return null
    }
    return TemplateOrder(data.data); // type: object
  } catch (e) {
    return null;
  }
};

// 오더 객체 반환(블록체인 raw 값)(delivery)
export const getOrderRawData = async (orderNum: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrder`, {
      orderNum,
    });
    if (data.status === 204) {
      return null
    }
    return TemplateOrderRaw(data.data); // type: object
  } catch (e) {
    return null;
  }
};

// 오더 내역 번호 배열 반환(delivery)
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
    if (data.status === 204) {
      return []
    }
    dataRes = data.data; // type: number
  } catch(e) {
    console.log(e)
    dataRes = []
  }
  let result: string[] = [];
  dataRes.forEach((element: any) => result.push(BigInt(element).toString()));
  return result;
};

// 의뢰인 마지막 오더 번호 반환(delivery)
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

// 배송원 배송 여부 확인(delivery)
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

// 오더 상태에 해당하는 오더정보 배열 반환(delivery)
// 오더 상태별 오더 데이터들 배열로 반환
//     created -> 0
//     matched -> 1
//     completed -> 2
//     failed -> 3
//     canceled -> 4
export const getOrdersForState = async (_state: number) => {
  let dataRes;
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getOrdersForState`, {
      stateNum: _state, 
    });
    if (data.status === 204) {
      dataRes = []
    }
    dataRes = data.data; // type: number
  } catch(e) {
    console.log(e)
    dataRes = []
  }
  let result: any[] = [];
  dataRes.forEach((element: any) => result.push(TemplateOrder(element)));
  return result;
};

// (staking)
export const getStakingInfo = async (address: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getStakingInfo`, {
      address, 
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: json
  } catch (e) {
    console.log(e)
    return null
  }
}

// (Quicker token)
export const getQtokenAllowance =async (address: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getQtokenAllowance`, {
      address, 
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: string
  } catch (e) {
    console.log(e)
    return null
  }
}

// (FeeGovernor)
export const getFeeGovernorInfo = async (address: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getCurrentFeeGovernorInfo`, {
      address, 
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: json
  } catch (e) {
    console.log(e)
    return null
  }
}

// (FeeGovernor)
// 특정 라운드부터 index갯수의 과거 기록 불러오기
// startRound === undefined -> 현재 라운드부터
export const getRoundLogs = async (index: string, startRound: string | undefined) => {
  try {
    let data: any = null
    if (startRound) {
      data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getFeeGovernorRoundLogs`, {
        index,
        startRound 
      });
    } else {
      data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/getFeeGovernorRoundLogs`, {
        index
      });
    }
    if (data.status === 204) {
      return null
    }
    return data.data; // type: json
  } catch (e) {
    console.log(e)
    return null
  }
}

// (ERC-1155 컨트랙)
// 유저가 보유하고 있는 NFT ID 조회
export const hasNftIdList = async (address: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/hasNftIdList`, {
      address,
    });
    if (data.status === 204) {
      return []
    }
    return data.data; // type: string[]
  } catch (e) {
    console.log(e)
    return []
  }
}

// (ERC-1155 컨트랙)
// NFT 민팅
export const mintNft = async (address: string, tokenId: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/mintNft`, {
      address,
      tokenId
    });
    if (data.status === 204) {
      return false
    }
    return data.data; // type: boolean
  } catch (e) {
    console.log(e)
    return false
  }
}

// (delivery 컨트랙)
// 유저 의뢰금, 배송금 총액
export const sumOrderPrice = async (address: string) => {
  try {
    const data = await axios.post(`${env.REACT_APP_SERVER_URL}caver/sumOrderPrice`, {
      address,
    });
    if (data.status === 204) {
      return null
    }
    return data.data; // type: object
  } catch (e) {
    console.log(e)
    return null
  }
}

// export class WriteTransactionToBlockchain {
//   private orderNum: string;
//   private writeTransaction = async (funcName: string) => {
//     const config = await prepareWriteContract({
//       address: Quicker_address,
//       abi: Quicker_abi,
//       functionName: funcName,
//       args: [this.orderNum],
//     });
//     const data = await writeContract(config);
//     return data;
//   };
//   constructor(orderNum: string) {
//     this.orderNum = orderNum;
//   }

//   // 의뢰인 오더 취소 함수
//   public cancelOrder = async () => {
//     const result = await this.writeTransaction("cancelOrder");
//     return result;
//   };

//   // 배송원 오더 수락 함수
//   public acceptOrder = async () => {
//     const result = await this.writeTransaction("acceptOrder");
//     return result;
//   };

//   // 배송원 배달 완료 함수
//   public deliveredOrder = async () => {
//     const result = await this.writeTransaction("deliveredOrder");
//     return result;
//   };

//   // 의뢰인 계약 확정 함수
//   public completeOrder = async () => {
//     const result = await this.writeTransaction("completeOrder");
//     return result;
//   };

//   // 배송원 정산 함수
//   public withdrawFromOrder = async () => {
//     const result = await this.writeTransaction("withdrawFromOrder");
//     return result;
//   };

//   // 의뢰인 배송 실패오더 환불 함수
//   public failedOrder = async () => {
//     const result = await this.writeTransaction("failedOrder");
//     return result;
//   };
// }

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
