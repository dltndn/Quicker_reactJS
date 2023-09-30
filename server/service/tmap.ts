import fetch from "node-fetch";

interface Body {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

interface ExpectType {
  features : {
    properties : { 
      totalDistance : number
    }
  }[]
}

export class TmapApi {
  async requestRouteDistance (body: Body, appKey: string) {
    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${appKey}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
    const data = await response.json() as ExpectType; 
    return data.features[0].properties.totalDistance / 1000;
  };
}