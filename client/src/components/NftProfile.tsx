import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { NftProfileStyle } from "../StyleCollection";

const {NftImg} = new NftProfileStyle()

const NftProfile = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState<string>("404")
  
  useEffect(() => {
    const localstorageImgId = localStorage.getItem("nftImgState")
    if (localstorageImgId) {
        setCurrentImg(() => {return localstorageImgId})
    }
  }, [])

  // 해당 이미지 id 경로 반환
  const getImgPath = (id: string) => {
    return `/NftImg/${id}.png`;
  };

  return (
    <>
      <NftImg
        src={getImgPath(currentImg)}
        onClick={() => navigate("/nftSetting")}
      />
    </>
  );
};

export default NftProfile;

