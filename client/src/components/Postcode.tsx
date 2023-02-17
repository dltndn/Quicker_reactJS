import React, { Dispatch, SetStateAction, useState } from "react";

//@ts-ignore
const { daum } = window;

interface setPosition {
  postcodeBoxId : string
  title : string
  style : object
  containerId: string
  adressTextBoxId: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  setPosition: Dispatch<SetStateAction<object>>;
}



const Postcode = ({postcodeBoxId, title, style, containerId, adressTextBoxId, onClick, setPosition }: setPosition) => {

  let element_wrap = document.getElementById(postcodeBoxId);

  //주소-좌표 변환 객체를 생성
  let geocoder = new daum.maps.services.Geocoder();
  let currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop)

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap!.style.display = 'none';
  }

  const onFocus = () => {
    // document.getElementById(adressTextBoxId)!.blur();
    sample5_execDaumPostcode()
  }

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

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            foldDaumPostcode()

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
          }
        });
      },
      // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
      onresize: function (size: any) {
        element_wrap!.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap!.style.display = 'block';
  }

  return (
    <div id={containerId} style={style}>
      <strong>{title}</strong> <br />
      <input type="text" id={adressTextBoxId} onFocus={onFocus} placeholder="주소" />
      <div id={postcodeBoxId} style={{ display: "none", border: "1px solid", width: "500px", height: "300px", margin: "5px 0", position: "relative" }} />
      <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{ cursor: "pointer", position: "absolute", right: "0px", top: "-1px", zIndex: "1" }} onClick={foldDaumPostcode} alt="접기 버튼" />
      <br />
      <input type="text" placeholder="세부주소" style={{ display: "block" }} /><br />
      <input type="text" placeholder="이름" style={{ display: "block" }} />
      <input type="text" placeholder="010" style={{ display: "block" }} />
      <input type="text" placeholder="1234" style={{ display: "block" }} />
      <input type="text" placeholder="5678" style={{ display: "block" }} />
      <button onClick={onClick}>다음단계</button>
    </div>
  );
};

export default Postcode;
