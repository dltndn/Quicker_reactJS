import { OnePointRoute, TwoPointRoute } from "./interface/route";

// @ts-ignore
const { Kakao } = window

interface Prop {
    routeInfo: OnePointRoute | TwoPointRoute
}

export default function KakaoNaviDeepLinkButton(prop: Prop) {
    const { routeInfo } = prop
    const startNavigation = (routeInfo: OnePointRoute | TwoPointRoute) => {
        Kakao.Navi.start(routeInfo);
    }

    return (
        <img src="https://developers.kakao.com/assets/img/about/buttons/navi/kakaonavi_btn_medium.png" alt="목적지 공유하기 버튼" onClick={() => { startNavigation(routeInfo) }} width={"20px"} height={"20px"} />
    )
}