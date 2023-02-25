import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import PostcodeInputs from "./PostcodeInput";
//@ts-ignore
const { daum } = window;

interface mapControl {
  showMap : Function
  hideMap : Function
}

interface setState {
  setStartPosition: React.Dispatch<React.SetStateAction<{}>>
  setArrivePosition: React.Dispatch<React.SetStateAction<{}>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

interface refs {
  startinputDiv: React.RefObject<HTMLDivElement>
  arriveinputDiv: React.RefObject<HTMLDivElement>
}

interface props {
  refs : refs
  mapControls : mapControl
  setStates: setState
  title: string
  hideCommissionPage: () => void
}

// MEMO 이전 버튼 클릭시 데이터 날릴지 말지
const Postcode = ({ refs, mapControls ,setStates, title, hideCommissionPage }: props) => {
  //마지막 버튼 클릭 시 OrderPage의 showCommissionPage를 false로 변경
  const handleCompleteCommission = () => {
    hideCommissionPage()
  };

  const postcodeContainer = useRef<HTMLDivElement>(null)
  const startinputBox = useRef<HTMLInputElement>(null)
  const arriveinputBox = useRef<HTMLInputElement>(null)

  const [geocoder, setGeocorder] = useState({})
  const [currentScroll, setCurrentScroll] = useState(0)

  useEffect(() => {
    refs.arriveinputDiv.current!.style.display = "none"
    //주소-좌표 변환 객체를 생성
    setGeocorder(new daum.maps.services.Geocoder())
    setCurrentScroll(Math.max(document.body.scrollTop, document.documentElement.scrollTop))
  }, [])

  const foldDaumPostcode = () => {
    postcodeContainer.current!.style.display = 'none'
  }

  // 지도 안보이게 처리
  const onFocus = () => {
    mapControls.hideMap()
    sample5_execDaumPostcode()
  }

  const pageNext = () => {
    if (title === "세부사항") {
      setStates.setTitle("")
      refs.startinputDiv.current!.style.display = "none"
      refs.arriveinputDiv.current!.style.display = "none"
    }
    else if (title === "도착지") {
      setStates.setTitle("세부사항")
      refs.startinputDiv.current!.style.display = "none"
      refs.arriveinputDiv.current!.style.display = "none"
      console.log("마지막?")
      handleCompleteCommission()
    }
    else if (title === "출발지") {
      setStates.setTitle("도착지")
      refs.startinputDiv.current!.style.display = "none"
      refs.arriveinputDiv.current!.style.display = "block"
    }
  }

  const sample5_execDaumPostcode = () => {
    new daum.Postcode({
      oncomplete: (data: any) => {
        let addr = data.address; // 최종 주소 변수
        // 주소로 상세 정보를 검색
        // @ts-ignore
        geocoder.addressSearch(data.address, (results: any, status: string) => {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            let result = results[0]; //첫번째 결과의 값을 활용

            
            // 주소 정보를 해당 필드에 넣는다.
            if (startinputBox.current!.value === "") {
              startinputBox.current!.value = addr
              setStates.setStartPosition({ "latitude": Number(result.y), "longitude": Number(result.x) })
            }
            else {
              arriveinputBox.current!.value = addr
              setStates.setArrivePosition({ "latitude": Number(result.y), "longitude": Number(result.x) })
            }

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            foldDaumPostcode()

            // 지도 보이게 처리
            mapControls.showMap()

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
          }
        });
      },
      // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
      onresize: function (size : any) {
        postcodeContainer.current!.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%'
    }).embed(postcodeContainer.current);

    // iframe을 넣은 element를 보이게 한다.
    postcodeContainer.current!.style.display = 'block';
  }

  return (
    <>
      <div ref={postcodeContainer} style={{ display: "none", border: "1px solid", width: "500px", height: "300px", margin: "5px 0", position: "relative" }} >
        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{ cursor: "pointer", position: "absolute", right: "0px", top: "-1px", zIndex: "1" }} onClick={foldDaumPostcode} alt="접기 버튼" />
      </div>
      <strong>{title}</strong> <br />
      <PostcodeInputs refs={{ inputDiv: refs.startinputDiv, inputBox: startinputBox }} controls={{ onFocus: onFocus, pageNext: pageNext }} />
      <PostcodeInputs refs={{ inputDiv: refs.arriveinputDiv, inputBox: arriveinputBox }} controls={{ onFocus: onFocus, pageNext: pageNext }} />
    </>
  );
};

export default Postcode;
