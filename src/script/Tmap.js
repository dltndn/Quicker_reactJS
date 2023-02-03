function initTmap(){
    // map 생성
    // Tmapv3.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    var map = new Tmapv3.Map("TMapApp", { // 지도가 생성될 div
        width : "300px",	// 지도의 넓이
        height : "300px",	// 지도의 높이
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                    
                marker = new Tmapv3.Marker({
                    position : new Tmapv3.LatLng(lat,lon),
                    map : map
                });

                marker = new Tmapv3.Marker({
                    position : new Tmapv3.LatLng(lat,lon+0.005),
                    map : map
                });

                marker = new Tmapv3.Marker({
                    position : new Tmapv3.LatLng(lat,lon-0.005),
                    map : map
                });

                map.setCenter(new Tmapv3.LatLng(lat,lon));
                map.setZoom(15);
            }
        );
    }
}
initTmap();