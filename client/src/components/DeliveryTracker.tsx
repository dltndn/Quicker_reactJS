import { useState, useEffect } from "react";
import Tmap from "../lib/Tmap";
import { useQuickerLocationState } from "./deliveryProgress/DeliveryStatus";
import Handler from "../lib/Handler";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TiArrowUpThick } from "react-icons/ti";

interface DeliveryTrackerProps {
  //   mapDivId: string;
  mapHeight: string;
  orderNum: string | undefined;
}

interface location {
  X: number;
  Y: number;
}

export default function DeliveryTracker({
  mapHeight,
  orderNum,
}: DeliveryTrackerProps) {
  const [tMap, setTmap] = useState<any>(undefined);
  const { coordiX, coordiY } = useQuickerLocationState();
  const [hasMarker, setHasMarker] = useState<boolean>(false);
  const [destinationLocation, setDestinationLocation] = useState();
  const [departureLocation, setDepartureLocation] = useState();
  const { cryptoKey } = useParams();

  const initalizeQuickerMarker = () => {
    tMap.removeDeliveryMarker();
    const pos = tMap.createLatLng(coordiY, coordiX);
    tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
    tMap.panTo(pos);
  };

  const getOrderLocation = async () => {
    if (orderNum !== undefined) {
      return await Handler.get(
        process.env.REACT_APP_SERVER_URL + `order/?orderid=${orderNum}`
      );
    } else {
      return null;
    }
  };

  const createDestinationAndDepartureMarkers = (
    DestinationLocation: location,
    DepartureLocation: location
  ) => {
    return {
      destination: tMap.createMarker(
        DestinationLocation.Y,
        DestinationLocation.X,
        2
      ),
      departure: tMap.createMarker(DepartureLocation.Y, DepartureLocation.X, 1),
    };
  };

  const zoomOutMap = (
    DestinationLocation: location,
    DepartureLocation: location
  ) => {
    const DestinationLatLng = tMap.createLatLng(
      DestinationLocation.Y,
      DestinationLocation.X
    );
    const DepatureLatLng = tMap.createLatLng(
      DepartureLocation.Y,
      DepartureLocation.X
    );
    const CenterLatLng = tMap.createLatLng(
      (DepartureLocation.Y + DestinationLocation.Y) / 2,
      (DestinationLocation.X + DepartureLocation.X) / 2
    );
    tMap.autoZoom(CenterLatLng, DepatureLatLng, DestinationLatLng);
  };

  useEffect(() => {
    if (tMap !== undefined) {
      if (
        destinationLocation !== undefined &&
        departureLocation !== undefined
      ) {
        const markers = createDestinationAndDepartureMarkers(
          destinationLocation,
          departureLocation
        );
        zoomOutMap(destinationLocation, departureLocation);
      }
    }
  }, [destinationLocation, departureLocation]);

  useEffect(() => {
    if (coordiX != null && coordiY != null) {
      if (!hasMarker) {
        if (tMap !== undefined) {
          const pos = tMap.createLatLng(coordiY, coordiX);
          tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
          tMap.panTo(pos);
          setHasMarker(true);
        }
      } else {
        initalizeQuickerMarker();
      }
    }
  }, [coordiX, coordiY]);

  useEffect(() => {
    (async () => {
      if (tMap !== undefined) {
        const orderLocation = await getOrderLocation();
        if (orderLocation !== null) {
          setDestinationLocation(orderLocation.Destination);
          setDepartureLocation(orderLocation.Departure);
        } else {
          alert("오더 번호가 없습니다.");
        }
      }
    })();
  }, [tMap]);

  useEffect(() => {
    setTmap(new Tmap("TMapTracker", mapHeight));
  }, []);

  const checkRoute = async () => {
    if (hasMarker) {
      const currentPos = { X: coordiX, Y: coordiY };
      console.log(
        await tMap.getRouteData(
          currentPos,
          departureLocation,
          destinationLocation
        )
      );
    } else {
      alert("배송원의 위치를 확인해주세요");
    }
  };

  return (
    <>
      <Bt1
        onClick={async () => await checkRoute()}
        style={{
          position: "absolute",
          top: "58.5em",
          left: "88%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        <Ic1>
        <TiArrowUpThick/></Ic1>
        길찾기
        </Bt1>
      <div id="TMapTracker" />
    </>
  );
}

const Bt1 = styled.button`
  border: none;
  padding: 5px;
  font-size: 12px;
  border-radius: 0.313rem;
  border: 0;
  color: #000000;
  background-color: #ffffff;
`
const Ic1 = styled.div`
  font-size: 24px;
  margin-bottom: 5px;
  color: #3bd8ff;
`