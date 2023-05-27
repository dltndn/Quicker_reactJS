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

  const initalizeQuickerMarker = () => {
    let pos = tMap.createLatLng(coordiY, coordiX);
    tMap.createMarker(coordiY, coordiX);
    tMap.panTo(pos);
  };

  useEffect(() => {
    if (coordiX != null && coordiY != null) {
      initalizeQuickerMarker();
    }
  }, [coordiX, coordiY]);

  useEffect(() => {
    setTmap(new Tmap("TMapTracker", mapHeight));
  }, []);
  return <div id="TMapTracker" />;
}
