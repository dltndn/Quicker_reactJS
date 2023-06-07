// @ts-ignore
const { Tmapv3 } = window;

const Tmap = {
    initTmap: (mapId : string, height : string) => {
        return new Tmapv3.Map(mapId, {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "100%",	// 지도의 넓이
            height: height,	// 지도의 높이
            zoom: 15	// 지도 줌레벨
        });
    },

    Marker: (map: any, lat: number, lon: number) => {
        return new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lon),
            map: map
        });
    },

    setViewMap: (map: any, LatLng : any) => {
        map.setCenter(LatLng);
        map.setZoom(16);
    },

    LatLng: (lat: number, lon: number) => {
        return new Tmapv3.LatLng(lat, lon)
    },

    panTo: (map : any, latLng : any) => {
        map.panTo(latLng);
    },

    autoZoom: (map: any, centerLatLng: any, startLatLon: any, arriveLatLon: any) => {

        let latlngBounds = new Tmapv3.LatLngBounds(centerLatLng);

        latlngBounds.extend(startLatLon);
        latlngBounds.extend(arriveLatLon);

        map.fitBounds(latlngBounds, 50);
    },

    getRoutePlanJson : (map: any, startLatLon: any, arriveLatLon: any) => {

        let tData = new Tmapv3.extension.TData();        
        
        let onComplete = () => {
            let jsonObject = new Tmapv3.extension.GeoJSON();
            let jsonForm = jsonObject.rpTrafficRead(tData._responseData);
    
            //교통정보 표출시 생성되는 LineColor 입니다.
            let trafficColors = {
                // 사용자가 임의로 색상을 설정할 수 있습니다.
                // 교통정보 옵션 - 라인색상
                trafficDefaultColor: "#000000", //교통 정보가 없을 때
                trafficType1Color: "#009900", //원할
                trafficType2Color: "#7A8E0A", //서행
                trafficType3Color: "#8E8111",  //정체
                trafficType4Color: "#FF0000"  //정체
            };
            
            jsonObject.drawRouteByTraffic(map, jsonForm, trafficColors)
        },
    
        onProgress = () => {
    
        },
    
        onError = () => {
            console.error("error")   
        }

        let params = {
            onComplete: onComplete,
            onProgress: onProgress,
            onError: onError
        }
        
        let optionObj = {
            reqCoordType: "WGS84GEO", //요청 좌표계 옵셥 설정입니다.
            resCoordType: "WGS84GEO",  //응답 좌표계 옵셥 설정입니다.
            trafficInfo: "Y"
        }
        
        // TData 객체의 경로요청 함수
        tData.getRoutePlanJson(startLatLon, arriveLatLon, optionObj, params);
    }

}

export default Tmap;