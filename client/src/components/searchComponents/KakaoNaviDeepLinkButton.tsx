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
        <>
            <button onClick={() => { startNavigation(routeInfo) }}>카카오 링크</button>
        </>
    )
}