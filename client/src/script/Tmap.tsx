// @ts-ignore
const { Tmapv3 } = window;

const TmapObject = {




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

    getBound: (map: any) => {
        // return {
        //     1 : map.getBounds()._ne._lat,
        //     2 : map.getBounds()._ne._lat,
        //     3 : map.getBounds()._sw._lat,
        //     4 : map.getBounds()._sw._lat};	

        return map.getBounds();
        // 이 부분을 수정
        // bound 객체 생성 후
        // 비교
        // map.getBounds().contains(bounds2);

        // map.fitBounds(latLngBounds,margin);
    },

    initBound: (l: number, b: number, r: number, t: number) => {
        return new Tmapv3.Bounds(l, b, r, t)
    },

    fitmap: (map: any, latLngBounds: any, margin: number) => {
        map.fitBounds(latLngBounds, margin)
    },

    test: (map : any , centerLat : number, centerLon : number, startLat : number, startLon : number, endLat : number, endLon : number) => {

        // 화면의 중앙 좌표 설정
        var lonlat =  new Tmapv3.LatLng(centerLat,centerLon);
        var latlngBounds = new Tmapv3.LatLngBounds(lonlat);

        // 시작지점
        var start =  new Tmapv3.LatLng(startLat,startLon);

        // 도착지점
        var end =  new Tmapv3.LatLng(endLat,endLon);

        // 확장
        latlngBounds.extend(start);
        latlngBounds.extend(end);
        // 화면 맞춤
        map.fitBounds(latlngBounds, 50);
    },

    containMarker: (map: any, bound: any) => {
        return map.getBounds().contains(bound);
    }

}

export default TmapObject;