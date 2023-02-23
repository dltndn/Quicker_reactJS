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

    autoZoom : (map : any , centerLatLng : any, startLatLon : any, arriveLatLon : any) => {

        let latlngBounds = new Tmapv3.LatLngBounds(centerLatLng);

        latlngBounds.extend(startLatLon);
        latlngBounds.extend(arriveLatLon);

        map.fitBounds(latlngBounds, 50);
    }

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
}

export default TmapObject;