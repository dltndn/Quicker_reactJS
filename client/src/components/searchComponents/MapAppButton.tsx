import { SendDataToAndroid } from "../../utils/SendDataToAndroid"
import { OrderObj } from "../../pages/SearchPage";
import styled from "styled-components";

const naverMapIcon = require('../../image/naverMap_icon.webp')
const kakaoMapIcon = require('../../image/kakaoMap_icon.webp')

interface MapBtnProps {
    address: string | undefined;
    order: OrderObj | undefined;
    isUsingCurrent: boolean;
  }

  export const NaverMapDeepLinkButton = ({ address, order, isUsingCurrent }: MapBtnProps) => {
    const executeMap = (isUsingCurrent : boolean) => {
        const sdta = new SendDataToAndroid(address)
        const depatureRaw = order?.depatureRaw
        const destinationRaw = order?.destinationRaw
        // @ts-ignore
        sdta.openMapApp(depatureRaw.Y, depatureRaw.X, order?.departure, destinationRaw.Y, destinationRaw.X, order?.destination, isUsingCurrent, 1)
        // ex) lat : 37.464, lng : 126.9522394
    }
    return <AppIcon src={naverMapIcon} alt="네이버지도 Deeplink 버튼" onClick={() => executeMap(isUsingCurrent)} />
}

export const KakaoMapDeepLinkButton = ({ address, order, isUsingCurrent }: MapBtnProps) => {
    const executeMap = (isUsingCurrent : boolean) => {
        const sdta = new SendDataToAndroid(address)
        const depatureRaw = order?.depatureRaw
        const destinationRaw = order?.destinationRaw
        // @ts-ignore
        sdta.openMapApp(depatureRaw.Y, depatureRaw.X, order?.departure, destinationRaw.Y, destinationRaw.X, order?.destination, isUsingCurrent, 2)
        // ex) lat : 37.464, lng : 126.9522394
    }
    return <AppIcon src={kakaoMapIcon} alt="카카오맵 Deeplink 버튼" onClick={() => executeMap(isUsingCurrent)} />
}

const AppIcon = styled.img`
    width: 2em;
    height: 2em;
    padding: 0.2em;
    border-radius: 30%;
`