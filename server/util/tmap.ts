interface Body {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

export const requestTmapAPIRouteInfo = async (body: Body, appKey: string) => {
  const response = await fetch(
    `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${appKey}`,
    {
      method: "POST",
      body: JSON.stringify(body), // 빈 객체 또는 필요한 데이터 객체로 변경
    },
  );
  const data = await response.json();
  return data.features[0].properties.totalDistance / 1000;
};
