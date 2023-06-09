import { useState, useEffect } from "react";
import Tmap from "../lib/Tmap";
import { useQuickerLocationState } from "./deliveryProgress/DeliveryStatus";
import Handler from "../lib/Handler";
import { useParams } from "react-router-dom";

interface DeliveryTrackerProps {
  //   mapDivId: string;
  mapHeight: string;
  // drawLine: (() => void);
}

interface location {
  X: number;
  Y: number;
}

export default function DeliveryTracker({ mapHeight }: DeliveryTrackerProps) {
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
    return await Handler.get(
      process.env.REACT_APP_SERVER_URL + `order/?orderid=24`
    );
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
        setDestinationLocation(orderLocation.Destination);
        setDepartureLocation(orderLocation.Departure);
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
      alert("배송원의 위치를 확인해주세요")
    }
  };

  return (
    <>
      <button
        onClick={async () => await checkRoute()}
        style={{
          position: "absolute",
          top: "52em",
          left: "10%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        예상 경로 확인
      </button>
      <div id="TMapTracker" />
    </>
  );
}
