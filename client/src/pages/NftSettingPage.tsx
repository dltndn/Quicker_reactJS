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
import Handler from "../lib/Handler";
import { getNftImgPath } from "../utils/CalAny";
import { useNftState } from "../components/orderComponents/imfo";

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
    // server에서 착용 중인 nft id 값 가져오기
    getNftId()
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
    console.log("imgState: ", imgState)
  }, [imgState])

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
      const result = await mintNft(address, tokenId)
      if (!result) {
        alert("발급 조건을 확인해주세요");
      } else {
        alert("NFT발급이 완료됐습니다!");
        navigate("/profile");
      }
    }
  };

  // NFT id값 서버에 저장
  const setNftImgState = async (tokenId: string) => {    
    if (address) {
      try {
        const obj = { "walletAddress" : address , "imageId" : tokenId }
        await Handler.patch(obj, `${process.env.REACT_APP_SERVER_URL}user/image/id/`)
        setImgState(tokenId);
      } catch (e) {
        console.log(e)
        alert("적용에 실패했습니다...")
      }
    }
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

  // 서버에서 착용 중인 NFT ID 불러오기
  const getNftId = async () => {
    if (address) {
      try {
        const { imageId } = await Handler.get(`${process.env.REACT_APP_SERVER_URL}user/image/id/?walletAddress=${address}`)
        setImgState(imageId)
      } catch (e) {
        console.log(e)
      }
    }
    
  }

  // NFT description 가져오기
  const getNftDescription = (id: string) => {
    for (const val of NftId.tokens) {
      if (val.id === id) return val.description;
    }
    return "";
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
          <NftImg src={getNftImgPath(imgState)} alt="current img" />
          <div>보유 중인 NFT 목록</div>
          <SuspenseComponent
            component={
              <>
                {imgList.map((val: string, index: number) => (
                  <div
                    key={index}
                    onClick={async () => {
                      await setNftImgState(val);
                    }}
                  >
                    <NftImg
                      src={getNftImgPath(val)}
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
              <NftImg src={getNftImgPath(val.id)} alt={`img ${index}`} />
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
