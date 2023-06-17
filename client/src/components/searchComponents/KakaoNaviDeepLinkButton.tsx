import { OnePointRoute, TwoPointRoute } from "./interface/route";
import kakaoNaviIcon from './kakaonavi_btn_medium.png';
import { useEffect } from "react";
// @ts-ignore
const { Kakao } = window

interface Prop {
    routeInfo: OnePointRoute | TwoPointRoute
}

export default function KakaoNaviDeepLinkButton(prop: Prop) {
    const { routeInfo } = prop
    const startNavigation = (routeInfo: OnePointRoute | TwoPointRoute) => {
        if(Kakao.isInitialized() === true) {
            Kakao.init(process.env.REACT_APP_KAKAOMAP_API_KEY);
        }
        alert("start")
        Kakao.Navi.start(routeInfo);
    }

    return (
        <img src={kakaoNaviIcon} alt="카카오 Deeplink 버튼" onClick={() => {startNavigation(routeInfo) }} width={"20px"} height={"20px"} />
    )
}