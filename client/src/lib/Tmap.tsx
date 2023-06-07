import boxIcon from "../image/boxHigh.png";
import axios from 'axios';
// @ts-ignore
const { Tmapv3 } = window;

class Tmap {
  map: any;
  deliveryMarker: any;
  departureMarker: any;
  destinationMarker: any;

  constructor(mapId: string, height: string) {
    this.map = new Tmapv3.Map(mapId, {
      center: new Tmapv3.LatLng(37.5652045, 126.98702028),
      width: "100%",
      height,
      zoom: 15,
    });
  }

  private boxMarkerStyle = ` width: 3em;
    height: 3em;
    background-image: url(${boxIcon});
    background-size: cover;
    background-position: center;
    `;

  private markerHtml = (markerId: string) => {
    return `<div id=${markerId} style="${this.boxMarkerStyle}"></div>`;
  };

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

  async getRouteData(
    currentPos: coordination,
    depPos: coordination,
    desPos: coordination
  ) {
    const passList = depPos.X.toString() + "," + depPos.Y.toString();
    const appKey = process.env.REACT_APP_TMAP_API_KEY ?? ""
    // const urlStr = `&startX=${currentPos.X}&startY=${currentPos.Y}&endX=${desPos.X}&endY=${desPos.Y}`
    const urlStr = `&endX=${this.convertPos(desPos.X)}&endY=${this.convertPos(desPos.Y)}&startX=${this.convertPos(currentPos.X)}&startY=${this.convertPos(currentPos.Y)}&passList=${passList}&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&angle=172&searchOption=0&trafficInfo=Y`
    const headers = {
      'appKey': appKey
    };
    // const jsonObject = new Tmapv3.extension.GeoJSON()
    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result&appKey=${appKey}${urlStr}`,
        {
          method: "POST",
          headers: headers,
        }
      );
      const result = await response.json();
      console.log(result)
      this.drawTrafficData(result)
      
      return result;
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  }

  async drawTrafficData(data: any) {
    // const jsonObject = new Tmapv3.extension.GeoJSON()
    // // const jsonForm = jsonObject.rpTrafficRead(data);
    // // const jsonForm = jsonObject.jsonForm
    // const jsonForm = data.features
        const trafficColors = {
          trafficDefaultColor: "#000000",
          trafficType1Color: "#009900",
          trafficType2Color: "#7A8E0A",
          trafficType3Color: "#8E8111",
          trafficType4Color: "#FF0000",
        };
    // jsonObject.drawRouteByTraffic(this.map, jsonForm, trafficColors);
    let new_polyLine = []
    let pointId1 = "-1234567";
    let newData = [];
    let ar_line = [];
    let pointArray = []
    let equalData = [];
    console.log(data)
    for (var i = 0; i < data.features.length; i++) {
      var feature = data.features[i];
      //배열에 경로 좌표 저잘
      if (feature.geometry.type === "LineString") {
        // ar_line = [];
        for (let j = 0; j < feature.geometry.coordinates.length; j++) {
          const startPt = new Tmapv3.LatLng(
            feature.geometry.coordinates[j][1],
            feature.geometry.coordinates[j][0]
          );
          ar_line.push(startPt);
          pointArray.push(feature.geometry.coordinates[j]);
        }
        const polyline = new Tmapv3.Polyline({
          path: ar_line,
          strokeColor: "#ff0000",
          strokeWeight: 3,
          map: this.map,
        });
        new_polyLine.push(polyline);
      }
      var pointId2 = feature.properties.viaPointId;
      if (pointId1 !== pointId2) {
        // equalData = [];
        equalData.push(feature);
        newData.push(equalData);
        pointId1 = pointId2;
      } else {
        equalData.push(feature);
      }
    }
  }


  createMarker(lat: number, lon: number, markerNum: number) {
    switch (markerNum) {
      case 1:
        this.departureMarker = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, lon),
          map: this.map,
        });
        break;
      case 2:
        this.destinationMarker = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, lon),
          map: this.map,
        });
        break;
      default:
        this.deliveryMarker = new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lat, lon),
          map: this.map,
        });
    }
  }

  createMarkerWithAni(lat: number, lon: number, markerId: string) {
    this.deliveryMarker = new Tmapv3.Marker({
      position: new Tmapv3.LatLng(lat, lon),
      iconHTML: this.markerHtml(markerId),
      iconSize: Tmapv3.Size(1, 2),
      map: this.map,
    });
  }

  removeDeliveryMarker() {
    if (this.deliveryMarker) this.deliveryMarker.setMap(null);
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

  private convertPos = (data: number) => {
    return (Math.round(data * 1000000)/1000000).toString()
  }
}

export default Tmap;

interface coordination {
  X: number;
  Y: number;
}
