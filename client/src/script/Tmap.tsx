// @ts-ignore
const { Tmapv3 } = window;
// @ts-ignore
const { Tmapv2 } = window;

const Tmap = {
    initTmap: () => {
        return new Tmapv3.Map("TMapApp", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "300px",	// 지도의 넓이
            height: "300px",	// 지도의 높이
            zoom: 15	// 지도 줌레벨
        });
    },

    Marker: (map: any, lat: number, lon: number) => {
        return new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lon),
            map: map
        });
    },

    setViewMap: (map: any, lat: number, lon: number) => {
        map.setCenter(new Tmapv3.LatLng(lat, lon));
        map.setZoom(16);
    },

    LatLng: (lat: number, lon: number) => {
        return new Tmapv3.LatLng(lat, lon)
    },

    autoZoom: (map: any, centerLatLng: any, startLatLon: any, arriveLatLon: any) => {

        let latlngBounds = new Tmapv3.LatLngBounds(centerLatLng);

        latlngBounds.extend(startLatLon);
        latlngBounds.extend(arriveLatLon);

        map.fitBounds(latlngBounds, 50);
    },

    // MEMO : 나중에 사용 할 수도 있기 때문에 보류

    // getBounds: (map: any) => {
    //     return map.getBounds();
    // },

    // Bounds: (l: number, b: number, r: number, t: number) => {
    //     return new Tmapv3.Bounds(l, b, r, t)
    // },

    // fitBounds: (map: any, latLngBounds: any, margin: number) => {
    //     map.fitBounds(latLngBounds, margin)
    // },


    // test


    // 1. 지도 띄우기

    testingobject: (map : any) => {


        var s_latlng = new Tmapv3.LatLng (37.553756, 126.925356);
		var e_latlng = new Tmapv3.LatLng (37.554034, 126.975598);
        var tData = new Tmapv3.extension.TData();

        console.log(tData)
        var params = {
            onComplete: (tData: any) => {console.log(tData._responseData); //json으로 데이터를 받은 정보들을 콘솔창에서 확인할 수 있습니다.
	 
            var jsonObject = new Tmapv3.extension.GeoJSON();
            var jsonForm = jsonObject.rpTrafficRead(tData._responseData);
        
            //교통정보 표출시 생성되는 LineColor 입니다.
            var trafficColors = {
        
                // 사용자가 임의로 색상을 설정할 수 있습니다.
                // 교통정보 옵션 - 라인색상
                trafficDefaultColor:"#000000", //교통 정보가 없을 때
                trafficType1Color:"#009900", //원할
                trafficType2Color:"#7A8E0A", //서행
                trafficType3Color:"#8E8111",  //정체
                trafficType4Color:"#FF0000"  //정체
            };
            jsonObject.drawRouteByTraffic(map, jsonForm, trafficColors);
            map.setCenter(new Tmapv3.LatLng(37.55676159947993,126.94734232774672));
            map.setZoom(13);},
            onProgress: () => {console.log("progress")},
            onError: () => {console.log("error")}
        }

        var optionObj = {
            reqCoordType:"WGS84GEO", //요청 좌표계 옵셥 설정입니다.
			resCoordType:"WGS84GEO",  //응답 좌표계 옵셥 설정입니다.
			trafficInfo:"Y"
        }
	
		// TData 객체의 경로요청 함수
		tData.getRoutePlanJson(s_latlng, e_latlng, optionObj, params);
    }


}

export default Tmap;