import styled, { createGlobalStyle } from "styled-components";
import { create } from "zustand";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { useEffect, useState } from "react";
import { useConnWalletInfo } from "../App";
import SuspenseComponent from "../components/SuspenseComponent";
import NftId from "../lib/NftId";
import { hasNftIdList, mintNft, sumOrderPrice } from "../utils/ExecuteOrderFromBlockchain";

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
  const [isMain, setIsMain] = useState<boolean>(true);
  const [sumPrice, setSumPrice] = useState({
    clientPriceResult: "-",
    quickerPriceResult: "-"
  })

  const { address } = useConnWalletInfo();
  const { imgState, setImgState, imgList, setImgList } = useNftState();

  useEffect(() => {
    // localsotrage에서 가져오기
    const localstorageImgId = localStorage.getItem("nftImgState");
    if (localstorageImgId) {
      setNftImgState(localstorageImgId);
    } else {
      setNftImgState("404");
    }
    // img list 갖고오기
    getUserNft();
    getSumOrderPrice()
    return () => {
      setImgList(["404"]);
      setIsMain(true);
      setSumPrice({
        clientPriceResult: "-",
        quickerPriceResult: "-"
      })
    };
  }, []);

  useEffect(() => {
    if (!address) {
      setNftImgState("404");
    }
  }, [address]);

  // 의뢰금, 배달금 총액 불러오기
  const getSumOrderPrice = async () => {
    if (address) {
      const result = await sumOrderPrice(address)
      if (result) {
        setSumPrice(() => {
          return {
            clientPriceResult: result.clientPriceResult,
            quickerPriceResult: result.quickerPriceResult
          }
        })
      }
    }
  }

  // NFT 민팅
  const mintGradeNft = async (tokenId: string) => {
    if (address) {
      if (await mintNft(address, tokenId)) {
        alert("발급 조건을 확인해주세요");
      } else {
        alert("NFT발급이 완료됐습니다!");
        navigate("/profile");
      }
    }
  };

  // NFT 불러오기
  const setNftImgState = (tokenId: string) => {
    localStorage.setItem("nftImgState", tokenId);
    setImgState(tokenId);
  };

  // 보유 NFT 목록 불러오기
  const getUserNft = async () => {
    if (address) {
      const idArr = await hasNftIdList(address);
      if (idArr.length !== 0) {
        setImgList(imgList.concat(idArr));
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
      {isMain ? (
        <>
          <div>
            <span>NFT 종류 보러가기</span>
            <button onClick={() => setIsMain(false)}>이동</button>
          </div>
          <div>현재 이미지</div>
          <NftImg src={getImgPath(imgState)} alt="current img" />
          <div>보유 중인 NFT 목록</div>
          <SuspenseComponent
            component={
              <>
                {imgList.map((val: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      setNftImgState(val);
                    }}
                  >
                    <NftImg
                      src={getImgPath(val)}
                      alt={`holding img ${index}`}
                    />
                    <div>{getNftDescription(val)}</div>
                  </div>
                ))}
              </>
            }
          />
        </>
      ) : (
        <>
          <div>
            <span>나의 NFT 목록 보러가기</span>
            <button onClick={() => setIsMain(true)}>이동</button>
          </div>
          <div>나의 총 의뢰금액: {Number(sumPrice.clientPriceResult).toLocaleString()}원</div>
          <div>나의 총 배달금액: {Number(sumPrice.quickerPriceResult).toLocaleString()}원</div>
          {NftId.tokens.map((val, index: number) => (
            <div key={index}>
              <NftImg src={getImgPath(val.id)} alt={`img ${index}`} />
              <div>{getNftDescription(val.description)}</div>
              {(BigInt(val.id) >> BigInt(128)).toString() === "1" && (
                <>
                  <div>
                    총 의뢰금액 {val.minSumPrice.toLocaleString()}원 이상
                  </div>
                </>
              )}
              {(BigInt(val.id) >> BigInt(128)).toString() === "2" && (
                <>
                  <div>
                    총 배달금액 {val.minSumPrice.toLocaleString()}원 이상
                  </div>
                </>
              )}
              <button onClick={async () => await mintGradeNft(val.id)}>
                발급받기
              </button>
            </div>
          ))}
        </>
      )}
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

const NftImg = styled.img`
  width: 5rem;
  height: 5rem;
  margin-left: 0.5rem;
  border-radius: 100%;
`;
