import { createGlobalStyle } from "styled-components";
import { create } from "zustand";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { useEffect } from "react";
import { useConnWalletInfo } from "../App";
import SuspenseComponent from "../components/SuspenseComponent";
import NftId from "../lib/NftId";
import { hasNftIdList } from "../utils/ExecuteOrderFromBlockchain";

interface UseNftStateType {
  imgState: string;
  setImgState: (data: string) => void;
  imgList: string[];
  setImgList: (data: string[]) => void;
}

export const useNftState = create<UseNftStateType>((set) => ({
  imgState: "404",
  setImgState: (imgState: string) => set({ imgState }),
  imgList: ["404"],
  setImgList: (imgList: string[]) => set({ imgList }),
}));

const NftSettingPage = () => {
  const navigate = useNavigate();

  const { address } = useConnWalletInfo();
  const { imgState, setImgState, imgList, setImgList } = useNftState();

  useEffect(() => {
    // localsotrage에서 가져오기
    const localstorageImgId = localStorage.getItem("nftImgState")
    if (localstorageImgId) {
      setNftImgState(localstorageImgId)
    } else {
      setNftImgState("404")
    }
    // img list 갖고오기
    getUserNft();
    return () => {
      setImgList(["404"])
    };
  }, []);

  useEffect(() => {
    setNftImgState("404")
  }, [address])

  // NFT 불러오기
  const setNftImgState = (tokenId: string) => {
    localStorage.setItem("nftImgState", tokenId)
    setImgState(tokenId)
  }

  // 보유 NFT 목록 불러오기
  const getUserNft = async () => {
    if (address) {
      const idArr = await hasNftIdList(address)
      if (idArr.length !== 0) {
        setImgList(imgList.concat(idArr))
      }
    }
  };

  // NFT description 가져오기
  const getNftDescription = (id: string) => {
    for (const val of NftId.tokens) {
      if (val.id === id) return val.description;
    }
    return "";
  };

  // 해당 이미지 id 경로 반환
  const getImgPath = (id: string) => {
    return `/NftImg/${id}.png`;
  };

  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title="프로필 이미지"
        redirectLogic={function () {
          navigate("/profile");
        }}
      />
      <div>현재 이미지</div>
      <img src={getImgPath(imgState)} alt="current img" />
      <div>보유 중인 이미지 목록</div>
      <SuspenseComponent
        component={
          <>
            {imgList.map((val: string, index: number) => (
              <div key={index} onClick={() => {setNftImgState(val);}}>
                <img src={getImgPath(val)} alt={`holding img ${index}`} />
                <div>{getNftDescription(val)}</div>
              </div>
            ))}
          </>
        }
      />
      <BottomBar />
    </>
  );
};

export default NftSettingPage;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;
