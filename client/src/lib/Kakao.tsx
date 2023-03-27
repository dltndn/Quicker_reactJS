// @ts-ignore
const { kakao } = window;

export default {
    reverseGeoCording: (lat: number, lon: number) => {
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(lat, lon);
        return new Promise((resolve, reject) => {
            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: string) => {
                if (status === kakao.maps.services.Status.OK) {
                    resolve(result[0].address.address_name)
                } else {
                    reject(status);
                }
            })
        })
    }
}

