export default {
    getCurrentLocation : (setState : Function) => {
        if (navigator.geolocation) {
    
            navigator.geolocation.getCurrentPosition(function(position) {
                setState({lat : position.coords.latitude, lon : position.coords.longitude})
            });
          } else { 
              alert("위치를 사용할 수 없음")
          }
    }
}


