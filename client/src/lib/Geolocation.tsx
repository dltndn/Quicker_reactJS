const getCurrentLocation = () => {
    if (navigator.geolocation) {
    
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
                // console.log({lat : lat, lon : lon})
            return ({lat : lat, lon : lon})
          });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        console.log("can not use")
    }
}
export default getCurrentLocation;