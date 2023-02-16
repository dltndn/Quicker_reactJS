// @ts-ignore
const { Tmapv3 } = window;

const TmapObject = {

    initTmap: () => {
        return new Tmapv3.Map("TMapApp", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "300px",	// 지도의 넓이
            height: "300px",	// 지도의 높이
            zoom: 16	// 지도 줌레벨
            // 13 => 500
            // 14 => 200
            // 15 => 100
            // 16 => 50
            // 17 => 20
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

    LatLng : (lat: number, lon: number) => {
        return new Tmapv3.LatLng(lat, lon)
    }
}

export default TmapObject;