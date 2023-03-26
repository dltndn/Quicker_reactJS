import { Console } from "console";
import { start } from "repl";

// @ts-ignore
const { Tmapv3 } = window;

const Tmap = {
    initTmap: () => {
        return new Tmapv3.Map("TMapApp", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "100%",	// 지도의 넓이
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
    },

    reverseGeo : (lon : number, lat : number, APIKEY : string) => {
        
        fetch("https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result", {
            method : "GET",
            headers : {APIKEY},
            body: JSON.stringify(
                {
                    "coordType": "WGS84GEO",
                    "addressType": "A10",
                    "lon": lon,
                    "lat": lat
                }
            ),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        },
        // $.ajax({
        //         method : "GET",
        //         headers : APIKEY,
        //         url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
        //         async : false,
        //         data : {
        //             "coordType" : "WGS84GEO",
        //             "addressType" : "A10",
        //             "lon" : lon,
        //             "lat" : lat
        //         },
        //         success : (response : Response) => {
        //             // 3. json에서 주소 파싱
        //             // @ts-ignore
        //             let arrResult = response.addressInfo;

        //             //법정동 마지막 문자 
        //             let lastLegal = arrResult.legalDong
        //                     .charAt(arrResult.legalDong.length - 1);

        //             // 새주소
        //             let newRoadAddr = arrResult.city_do + ' '
        //                     + arrResult.gu_gun + ' ';

        //             if (arrResult.eup_myun == ''
        //                     && (lastLegal == "읍" || lastLegal == "면")) {//읍면
        //                 newRoadAddr += arrResult.legalDong;
        //             } else {
        //                 newRoadAddr += arrResult.eup_myun;
        //             }
        //             newRoadAddr += ' ' + arrResult.roadName + ' '
        //                     + arrResult.buildingIndex;

        //             // 새주소 법정동& 건물명 체크
        //             if (arrResult.legalDong != ''
        //                     && (lastLegal != "읍" && lastLegal != "면")) {//법정동과 읍면이 같은 경우

        //                 if (arrResult.buildingName != '') {//빌딩명 존재하는 경우
        //                     newRoadAddr += (' (' + arrResult.legalDong
        //                             + ', ' + arrResult.buildingName + ') ');
        //                 } else {
        //                     newRoadAddr += (' (' + arrResult.legalDong + ')');
        //                 }
        //             } else if (arrResult.buildingName != '') {//빌딩명만 존재하는 경우
        //                 newRoadAddr += (' (' + arrResult.buildingName + ') ');
        //             }

        //             // 구주소
        //             let jibunAddr = arrResult.city_do + ' '
        //                     + arrResult.gu_gun + ' '
        //                     + arrResult.legalDong + ' ' + arrResult.ri
        //                     + ' ' + arrResult.bunji;
        //             //구주소 빌딩명 존재
        //             if (arrResult.buildingName != '') {//빌딩명만 존재하는 경우
        //                 jibunAddr += (' ' + arrResult.buildingName);
        //             }

                    

        //         },
        //         error : function(request :Request, status : string, error: Error) {
        //             // @ts-ignore
        //             console.log("code:" + request.status, "message:" + request.responseText, "error:" + error);
        //         }
        //     });

    // }

}

export default Tmap;