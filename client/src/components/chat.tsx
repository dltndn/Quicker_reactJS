import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { getOrderList, getOrders, getOrder } from "../utils/ExecuteOrderFromBlockchain";
import Room from "./Room";
export default () => {
  const { address } = useAccount();

  const [blockChainData, setBlockChainData] = useState<any>();
  const [combinedBlockChainData, setCombinedBlockChainData] = useState<ReactNode[] | undefined>();

  const getOrderListFromBlochain = async () => {
    const data = await getOrderList(address, true);
    setBlockChainData(data);
  };

  useEffect(() => {
    getOrderListFromBlochain()
  }, []);

  useEffect(() => {
    if (blockChainData !== undefined) {
      (async () => {
        let combineData = await getOrders(blockChainData)
        setCombinedBlockChainData(combineData);
      })()
    }
  }, [blockChainData]);

  return (
    <div>
      {(combinedBlockChainData !== undefined) ?
        combinedBlockChainData.map((value) => {
          return (<Room roomData={value}></Room>)
        }) : <div></div>}
    </div>
  );
}
