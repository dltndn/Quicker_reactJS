import { OrderObj } from "../../../pages/SearchPage";

export interface OnePointRoute {
  name: string;
  x: number;
  y: number;
  coordType: "wgs84";
}

export interface TwoPointRoute extends OnePointRoute {
  sX: number;
  sY: number;
}

export interface NMapBtnProps {
  address: `0x${string}` | undefined;
  order: OrderObj | undefined;
  isUsingCurrent: boolean;
}