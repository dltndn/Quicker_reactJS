// 필요한 import
import Caver from "caver-js";
import { Op } from "sequelize";

import SequelizeConnector from "../../Maria/Connectors/SequelizeConnector";
import {
  AverageOfCostAttributes,
  CacheMatchedOrder,
  Order,
  initModels,
} from "../../Maria/Models/init-models";

import {
  QUICKER_DLVR_PROXY_ABI,
  QUICKER_DLVR_PROXY_ADDRESS,
} from "../../klaytnApi/ContractInfo";

import keys from "../../config/keys";
import { requestTmapAPIRouteInfo } from "../../util/tmap";
import { averageInstance, cacheOrderInstance, locationInstance } from "../../Maria/Commands";

// 설정
initModels(SequelizeConnector);

const caver = new Caver(process.env.KLAYTN_BAOBAB_PROVIDER);

const quicker_drvr_contract = caver.contract.create(
  // @ts-ignore
  QUICKER_DLVR_PROXY_ABI,
  QUICKER_DLVR_PROXY_ADDRESS,
);

if (keys.tmap.apiKey === undefined) {
  throw new Error('tmap api .env 확인 필요')
}

const appKey = keys.tmap.apiKey

const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 1);
startDate.setDate(1);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);

const endDate = new Date();
endDate.setMonth(endDate.getMonth());
endDate.setDate(1);
endDate.setHours(0);
endDate.setMinutes(0);
endDate.setSeconds(0);

// api 요청함수
const unCoverOrderIds = (result : CacheMatchedOrder[]) => {
  const orderIds: number[] = [];
  result.map((element) => {
    orderIds.push(element.id);
  });
  return orderIds;
}

const filteringOrderId = async () => {
  const option = { 
    date: {
      [Op.gte]: startDate,
      [Op.lte]: endDate,
    }
  }

  const coveredOrderIds = await cacheOrderInstance.findAll(option)
  console.log(coveredOrderIds)
  return unCoverOrderIds(coveredOrderIds)
}

const requestTmapAPIRouteDistances = async (locations : Order[]) => {
  const filter = (distances: PromiseSettledResult<{orderId: number; km: number; }>[] ) => {
    return distances.map((element) => {
      if (element.status === "fulfilled") {
        return element.value;
      }
    });
  };
  const distances = await Promise.allSettled(
    locations.map(async (element) => {
      const body = {
        startX: element.Departure.X.toString(),
        startY: element.Departure.Y.toString(),
        endX: element.Destination.X.toString(),
        endY: element.Destination.Y.toString(),
      };
      const result = await requestTmapAPIRouteInfo(body, appKey);
      return {
        orderId: element.id,
        km: result,
      };
    }),
  );
  return filter(distances)
}


  
const getOrderPrices = async (locations: Order[]) => {
  const filter = (blockChainData : PromiseSettledResult<{orderNumber: number; price: number;}>[]) => {
    return blockChainData.map((element) => {
      if (element.status === "fulfilled") {
        return element.value;
      }
    })
  }
  
  const prices = await Promise.allSettled(
    locations.map(async (element) => {
      const order = await quicker_drvr_contract.call("orderList", element.id);
      return {
        orderNumber: parseInt(order.orderNumber),
        price: parseInt(order.orderPrice),
      };
    }),
  );
  return filter(prices)
};


type Kms = ({
  orderId: number;
  km: number;
} | undefined)[]

type BlockChainData = ({
  orderNumber: number;
  price: number;
} | undefined)[]


const combine = (kms : Kms , blockChainData : BlockChainData) => {
  const result = [];
  for (const distance of kms) {
    for (const price of blockChainData) {
      if (distance?.orderId === price?.orderNumber) {
        result.push({
          ...distance,
          price: price?.price,
        });
        break;
      }
    }
  }
  return result;
};

type Distance = "5KM" | "10KM" | "15KM" | "20KM" | "25KM" | "30KM" | "40KM" | "50KM" | "60KM" | "60+KM"

const calculateAverage = (counter : AverageOfCostAttributes, calculated : AverageOfCostAttributes) => {
  for (const key in counter) {
    if (key !== "date") {
      const unitKey = key as Distance;
      if (counter[unitKey] > 0) {
        // @TODO 수정해야함
        calculated[unitKey] = Math.round(calculated[unitKey] / counter[unitKey]);
      }
    }
  }
  return calculated
}

const generate = (combinedData : {
  price: number | undefined;
  orderId?: number | undefined;
  km?: number | undefined;
}[]) => {
  const calculated: AverageOfCostAttributes = {
    date: new Date().toISOString(),
    "5KM": 0,
    "10KM": 0,
    "15KM": 0,
    "20KM": 0,
    "25KM": 0,
    "30KM": 0,
    "40KM": 0,
    "50KM": 0,
    "60KM": 0,
    "60+KM": 0,
  };

  const counter: AverageOfCostAttributes = Object.assign({}, calculated);

  // @TODO 중복제거, 문제 있다
  const classifyDistance = (km : number, price : number) => {
    const listDistance = [5, 10, 15, 20, 25, 30, 40, 50, 60]
    for (const distance of listDistance) {
      if (km > 60) {
        const unit = "60+KM"
        calculated[unit] += price;
        counter[unit] += 1;
        break;
      }
      else if (km <= distance) {
        const unit = (distance + "KM") as Distance
        calculated[unit] += price;
        counter[unit] += 1;
        break;
      }
    }
  }

  for (const element of combinedData) {
    const km = element.km as number;
    const price = element.price as number
    classifyDistance(km, price)
  }
  return {counter, calculated}
}

export const main = async () => {
  const orderIds = await filteringOrderId()
  const locations = await locationInstance.findAll(orderIds);
  const distances = await requestTmapAPIRouteDistances(locations)
  const prices = await getOrderPrices(locations)

  const combinedData = combine(distances, prices);
  const {counter, calculated} = generate(combinedData)

  const result = calculateAverage(counter, calculated)

  averageInstance.create(result);
};