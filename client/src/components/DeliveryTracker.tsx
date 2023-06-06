import { useState, useEffect } from "react";
import Tmap from "../lib/Tmap";
import { useQuickerLocationState } from "./deliveryProgress/DeliveryStatus";
import Handler from "../lib/Handler";
import { useParams } from "react-router-dom";

interface DeliveryTrackerProps {
  //   mapDivId: string;
  mapHeight: string;
}

interface location { 
  X : number,
  Y : number
}

export default function DeliveryTracker({ mapHeight }: DeliveryTrackerProps) {
  const [tMap, setTmap] = useState<any>();
  const { coordiX, coordiY } = useQuickerLocationState();
  const [hasMarker, setHasMarker] = useState<boolean>(false);
  const [destinationLocation, setDestinationLocation] = useState();
  const [departureLocation, setDepartureLocation] = useState();
  const { cryptoKey } = useParams();
  
  const initalizeQuickerMarker = () => {
    tMap.removeMarker();
    const pos = tMap.createLatLng(coordiY, coordiX);
    tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
    tMap.panTo(pos);
  };

  const getOrderLocation = async () => {
    const orderid = 24;
    console.log(process.env.REACT_APP_SERVER_URL + `order/?orderid=${cryptoKey}`)
    return await Handler.get(process.env.REACT_APP_SERVER_URL + `order/?orderid=${cryptoKey}`)
  }

  const createDestinationAndDepartureMarkers = (DestinationLocation : location, DepartureLocation : location) => {
    tMap.createMarker(DestinationLocation.Y, DestinationLocation.X);
    tMap.createMarker(DepartureLocation.Y, DepartureLocation.X);
  }

  const zoomOutMap = (DestinationLocation : location, DepartureLocation : location) => {
    const DestinationLatLng = tMap.createLatLng(DestinationLocation.Y, DestinationLocation.X)
    const DepatureLatLng = tMap.createLatLng(DepartureLocation.Y, DepartureLocation.X)
    const CenterLatLng = tMap.createLatLng((DepartureLocation.Y + DestinationLocation.Y) / 2, (DestinationLocation.X + DepartureLocation.X) / 2)
    tMap.autoZoom (CenterLatLng, DepatureLatLng, DestinationLatLng)
  }
  
  useEffect(() => {
    if (coordiX != null && coordiY != null) {
      if (!hasMarker) {
        const pos = tMap.createLatLng(coordiY, coordiX);
        tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
        tMap.panTo(pos);
        setHasMarker(true);
        // DeliverLocation: coordination, Destination: coordination, Departure: coordination
        // tMap.getRoute({X :coordiY,  Y : coordiX}, destinationLocation, departureLocation)

      } else {
        initalizeQuickerMarker();
      }
    }
  }, [coordiX, coordiY]);

  useEffect(() => {
    (async () => {if (tMap !== undefined) {
      console.log("?")
      const orderLocation = await getOrderLocation()
      createDestinationAndDepartureMarkers(orderLocation.Destination, orderLocation.Departure)
      zoomOutMap(orderLocation.Destination, orderLocation.Departure)
      setDestinationLocation(orderLocation.Destination)
      setDepartureLocation(orderLocation.Departure)
    }})()
  }, [tMap]);

  useEffect(() => {
    setTmap(new Tmap("TMapTracker", mapHeight));
  }, []);
  
  return <div id="TMapTracker" />;
}
