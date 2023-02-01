import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import {SK_API_KEY} from "../keys/apikeys"

class InputScript {
    setScriptURL = (url : string, APIkey? : string ) => {
        let script =  document.createElement("script")
        script.src = `${url}+${SK_API_KEY}`
        document.head.appendChild(script);
    }
    setInnerScript = (innerScriptCode : string) => {
        const script =  document.createElement("script");
        script.innerHTML = `${innerScriptCode}`         
        script.type = "text/javascript";
        document.head.appendChild(script);
    }
}


export default function CommissionPage() {
    const [loading, setLoading] = useState(true);

  useEffect( () => {
    // V2   
    // let script_TMAP =  document.createElement("script")
    // script_TMAP.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${SK_API_KEY}`
    // document.head.appendChild(script_TMAP);

    const innerScriptCode = `         
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       'content-type': 'application/json',
    //       appKey: 'l7xx846db5f3bc1e48d29b7275a745d501c8'
    //     }
    //   };
      
    //   fetch('https://apis.openapi.sk.com/tmap/geo/geocoding?version=1&city_do=%EC%84%9C%EC%9A%B8&gu_gun=%EC%A4%91%EA%B5%AC&dong=%EC%9D%84%EC%A7%80%EB%A1%9C&addressFlag=F02&coordType=WGS84GEO', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

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
    initTmap();`;

    let TMAP = new InputScript;
    TMAP.setInnerScript(innerScriptCode);
    setLoading(false)

    const innerDaumScriptCode = `// 우편번호 찾기 찾기 화면을 넣을 element
    var element_wrap = document.getElementById('wrap');

    function foldDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_wrap.style.display = 'none';
    }

    function sample3_execDaumPostcode() {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("sample3_extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("sample3_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample3_postcode').value = data.zonecode;
                document.getElementById("sample3_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("sample3_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '300px',
            height : '100%'
        }).embed(element_wrap);

        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
    }
    
    `

    const DaumRoad = new InputScript();
    DaumRoad.setInnerScript(innerDaumScriptCode)
  }, []);
  return (
    <div><div
      id="TMapApp"
      style={{
        height: "300px",
        width: "300px",
      }}
    />
    출발지<br></br>
    <input type="text" id="sample3_postcode" placeholder="우편번호"></input>
    {/* <input type="button" onclick="sample3_execDaumPostcode()" value="우편번호 찾기"></input><br></br> */}
    <input type="text" id="sample3_address"  placeholder="주소"></input><br></br>
    <input type="text" id="sample3_detailAddress" placeholder="상세주소"></input>
    <input type="text" id="sample3_extraAddress" placeholder="참고항목"></input>

    <div id="wrap" ></div>
    <button>다음단계</button>

    </div>
  );
}