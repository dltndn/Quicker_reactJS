import React, { useState } from 'react';

//@ts-ignore
const { daum } = window;

const Postcode = () => {

  //주소-좌표 변환 객체를 생성
  let geocoder = new daum.maps.services.Geocoder();

  // const [value, setValue] = useState(0)
  function sample5_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {

        let addr = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        document.getElementById("sample5_address").value = addr
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function (results, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {

            let result = results[0]; //첫번째 결과의 값을 활용
            
            console.log(result)
            // let longitude = results[0].y
            document.getElementById("latitude").value = results[0].x
            document.getElementById("longitude").value = results[0].y
            // (document.getElementById("longitude") as HTMLInputElement).value = results[0].y
            
          }
        });
      }
    }).open();
  }



  return (
    <>
      <input type="text" id="sample5_address" placeholder="주소" />
      <input type="button" onClick={sample5_execDaumPostcode} value="주소 검색" /><br />
      <input type="text" id="latitude" style={{display : "block"}} value=""></input>
      <input type="text" id="longitude" style={{display : "block"}}></input>
    </>
  )

    ;
};

export default Postcode