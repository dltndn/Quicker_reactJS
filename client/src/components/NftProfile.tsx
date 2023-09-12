import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

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

const NftImg = styled.img`
  width: 5rem;
  height: 5rem;
  margin-left: 0.5rem;
  border-radius: 100%;
`;
