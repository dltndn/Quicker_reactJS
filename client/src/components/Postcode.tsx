import React, { Dispatch, SetStateAction, useState } from "react";

//@ts-ignore
const { daum } = window;

interface setPosition {
  containerId : string
  adressTextBoxId : string
  onClick : React.MouseEventHandler<HTMLButtonElement>
  setPosition: Dispatch<SetStateAction<object>>;
}

const Postcode = ({containerId, adressTextBoxId, onClick, setPosition }: setPosition) => {

  //주소-좌표 변환 객체를 생성
  let geocoder = new daum.maps.services.Geocoder();

  function sample5_execDaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data: any) {

        let addr = data.address; // 최종 주소 변수

        // 주소 정보를 해당 필드에 넣는다.
        (document.getElementById(adressTextBoxId) as HTMLInputElement).value = addr;
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function (results: any, status: string) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            let result = results[0]; //첫번째 결과의 값을 활용

            setPosition({ "latitude": Number(result.y), "longitude": Number(result.x) });
          }
        });
      },
    }).open();
  }

  return (
    <div id={containerId}>
      <input type="text" id={adressTextBoxId} placeholder="주소" />
      <input
        type="button"
        onClick={sample5_execDaumPostcode}
        value="주소 검색"
      />
      <br />
      <input
        type="text"
        id="latitude"
        style={{ display: "block" }}
        value=""
      ></input>
      <input type="text" id="longitude" style={{ display: "block" }} />
      <button onClick={onClick}>다음단계</button>
    </div>
  );
};

export default Postcode;
