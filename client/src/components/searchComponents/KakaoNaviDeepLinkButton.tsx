import { OnePointRoute, TwoPointRoute } from "./interface/route";
import kakaoNaviIcon from './kakaonavi_btn_medium.png';
import { useEffect } from "react";

interface Prop {
    routeInfo: OnePointRoute | TwoPointRoute
}

export default function KakaoNaviDeepLinkButton(prop: Prop) {
    const { routeInfo } = prop
    const startNavigation = (routeInfo: OnePointRoute | TwoPointRoute) => {
        
    }

    return (
        <img src={kakaoNaviIcon} alt="카카오 Deeplink 버튼" onClick={() => {startNavigation(routeInfo) }} width={"20px"} height={"20px"} />
    )
}