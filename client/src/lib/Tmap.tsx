// @ts-ignore
const { Tmapv3 } = window;

class Tmap {
  map: any;
  tMapMarker: any;

  constructor(mapId: string, height: string) {
    this.map = new Tmapv3.Map(mapId, {
      center: new Tmapv3.LatLng(37.5652045, 126.98702028),
      width: "100%",
      height,
      zoom: 15,
    });
  }

  async getDistance(startPosition: coordination, arrivePosition: coordination) {
    const headers = { appKey: process.env.REACT_APP_TMAP_API_KEY ?? "" };

    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/routes/distance?version=1&format=json&callback=result&startX=${startPosition.X}&startY=${startPosition.Y}&endX=${arrivePosition.X}&endY=${arrivePosition.Y}&reqCoordType=WGS84GEO`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  createMarker(lat: number, lon: number) {
    this.tMapMarker = new Tmapv3.Marker({
      position: new Tmapv3.LatLng(lat, lon),
      map: this.map,
    });
  }

  moveMarker(lat: number, lon: number) {
    try {
      this.tMapMarker.setPosition(this.createLatLng(lat, lon))
    } catch(e) {
      console.log(e)
    }
  }

  setViewMap(LatLng: any) {
    this.map.setCenter(LatLng);
    this.map.setZoom(16);
  }

  createLatLng(lat: number, lon: number) {
    return new Tmapv3.LatLng(lat, lon);
  }

  panTo(latLng: any) {
    this.map.panTo(latLng);
  }

  autoZoom(centerLatLng: any, startLatLon: any, arriveLatLon: any) {
    let latlngBounds = new Tmapv3.LatLngBounds(centerLatLng);
    latlngBounds.extend(startLatLon);
    latlngBounds.extend(arriveLatLon);
    this.map.fitBounds(latlngBounds, 50);
  }

  getRoutePlanJson(startLatLon: any, arriveLatLon: any) {
    let tData = new Tmapv3.extension.TData();
    let jsonObject = new Tmapv3.extension.GeoJSON();

    let params = {
      onComplete: () => {
        let jsonForm = jsonObject.rpTrafficRead(tData._responseData);
        let trafficColors = {
          trafficDefaultColor: "#000000",
          trafficType1Color: "#009900",
          trafficType2Color: "#7A8E0A",
          trafficType3Color: "#8E8111",
          trafficType4Color: "#FF0000",
        };
        jsonObject.drawRouteByTraffic(this.map, jsonForm, trafficColors);
      },
      onProgress: () => {},
      onError: () => {
        console.error("error");
      },
    };

    let optionObj = {
      reqCoordType: "WGS84GEO",
      resCoordType: "WGS84GEO",
      trafficInfo: "Y",
    };

    tData.getRoutePlanJson(startLatLon, arriveLatLon, optionObj, params);
  }

  reverseGeo(lon: number, lat: number, APIKEY: string) {
    fetch(
      "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
      {
        method: "GET",
        headers: { APIKEY },
        body: JSON.stringify({
          coordType: "WGS84GEO",
          addressType: "A10",
          lon: lon,
          lat: lat,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

export default Tmap;

interface coordination {
  X: number;
  Y: number;
}
