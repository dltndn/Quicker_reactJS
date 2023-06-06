import { useState, useEffect } from "react";
import Tmap from "../lib/Tmap2";
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
    return await Handler.get(process.env.REACT_APP_SERVER_URL + `order/?orderid=24`)
  }

  const createDestinationAndDepartureMarkers = (DestinationLocation : location, DepartureLocation : location) => {
    return { destination : Tmap.Marker(tMap,DestinationLocation.Y, DestinationLocation.X), departure : Tmap.Marker(tMap,DepartureLocation.Y, DepartureLocation.X)}
  }

  const addEvnetToMarker = (markers: any) => {
    markers.departure.on('click', () => window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.REACT_APP_TMAP_API_KEY}&lon=${markers.departure._marker_data.vsmMarker._lngLat[0]}&lat=${markers.departure._marker_data.vsmMarker._lngLat[1]}`)) 
    markers.destination.on('click', () => window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.REACT_APP_TMAP_API_KEY}&lon=${markers.destination._marker_data.vsmMarker._lngLat[0]}&lat=${markers.destination._marker_data.vsmMarker._lngLat[1]}`)) 
  }

  const zoomOutMap = (DestinationLocation : location, DepartureLocation : location) => {
    const DestinationLatLng = Tmap.LatLng(DestinationLocation.Y, DestinationLocation.X)
    const DepatureLatLng = Tmap.LatLng(DepartureLocation.Y, DepartureLocation.X)
    const CenterLatLng = Tmap.LatLng((DepartureLocation.Y + DestinationLocation.Y) / 2, (DestinationLocation.X + DepartureLocation.X) / 2)
    Tmap.autoZoom(tMap, CenterLatLng, DepatureLatLng, DestinationLatLng)
  }

  useEffect (() => {
    if ((destinationLocation !== undefined) && (departureLocation!== undefined)) {
      const markers = createDestinationAndDepartureMarkers(destinationLocation, departureLocation)
      addEvnetToMarker(markers)
      zoomOutMap(destinationLocation, departureLocation)
    }
  }, [destinationLocation,departureLocation])
  
  useEffect(() => {
    if (coordiX != null && coordiY != null) {
      if (!hasMarker) {
        const pos = Tmap.LatLng(coordiY, coordiX);
        Tmap.Marker(tMap,coordiY, coordiX);
        Tmap.panTo(tMap, pos);
        setHasMarker(true);
      } else {
        initalizeQuickerMarker();
      }
    }
  }, [coordiX, coordiY]);

  useEffect(() => {
    (async () => {if (tMap !== undefined) {
      const orderLocation = await getOrderLocation()
      setDestinationLocation(orderLocation.Destination)
      setDepartureLocation(orderLocation.Departure)
    }})()
  }, [tMap]);

  useEffect(() => {
    setTmap(Tmap.initTmap("TMapTracker", mapHeight));
  }, []);

  return (
  <>
    <div id="TMapTracker" />;
  </>
  )
  
  
  
}
