import { useState, useEffect } from "react";
import Tmap from "../lib/Tmap";
import { useQuickerLocationState } from "./deliveryProgress/DeliveryStatus";

interface DeliveryTrackerProps {
  //   mapDivId: string;
  mapHeight: string;
}

export default function DeliveryTracker({ mapHeight }: DeliveryTrackerProps) {
  const [tMap, setTmap] = useState<any>();
  const { coordiX, coordiY } = useQuickerLocationState();
  const [hasMarker, setHasMarker] = useState<boolean>(false);

  const initalizeQuickerMarker = () => {
    tMap.removeMarker();
    const pos = tMap.createLatLng(coordiY, coordiX);
    tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
    tMap.panTo(pos);
  };

  useEffect(() => {
    if (coordiX != null && coordiY != null) {
      if (!hasMarker) {
        const pos = tMap.createLatLng(coordiY, coordiX);
        tMap.createMarkerWithAni(coordiY, coordiX, "boxTmapMarker");
        tMap.panTo(pos);
        setHasMarker(true);
      } else {
        initalizeQuickerMarker();
      }
    }
  }, [coordiX, coordiY]);

  useEffect(() => {
    setTmap(new Tmap("TMapTracker", mapHeight));
  }, []);
  
  return <div id="TMapTracker" />;
}
