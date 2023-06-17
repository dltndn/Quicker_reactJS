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
