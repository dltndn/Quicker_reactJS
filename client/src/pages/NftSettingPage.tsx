import styled, { createGlobalStyle, keyframes } from "styled-components";
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
        await Handler.put(obj, `${process.env.REACT_APP_SERVER_URL}user/image/id/`)
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
          <Set_div_top onClick={() => setIsMain(false)}>
            <span>NFT 종류 보러가기</span>
          </Set_div_top>
          <Topdiv>
          <Topimg src={getNftImgPath(imgState)} alt="current img" />
          </Topdiv>
          <Set_div>보유 중인 NFT 목록</Set_div>
          <SuspenseComponent
            component={
              <>
                <Fx1>
                {imgList.map((val: string, index: number) => (
                  <>
                  <Set_div_mid
                    key={index}
                    onClick={async () => {
                      await setNftImgState(val);
                    }}
                  >
                    <NftImg
                      src={getNftImgPath(val)}
                      alt={`holding img ${index}`}
                    />
                  </Set_div_mid>
                  </>
                ))}
                </Fx1>
              </>
            }
          />
        </>
      ) : (
        <>
          <Set_div_top onClick={() => setIsMain(true)}>
            <span>나의 NFT 목록 보러가기</span>
          </Set_div_top>
          <PercentTx1>나의 총 의뢰금액: <PercentTx2>{Number(sumPrice.clientPriceResult).toLocaleString()}원</PercentTx2></PercentTx1>
          <PercentTx1>나의 총 배달금액: <PercentTx2>{Number(sumPrice.quickerPriceResult).toLocaleString()}원</PercentTx2></PercentTx1>
          {NftId.tokens.map((val, index: number) => (
            <Set_div_mid1 key={index}>
              <NftImg src={getNftImgPath(val.id)} alt={`img ${index}`} />
              <div>{getNftDescription(val.description)}</div>
              {(BigInt(val.id) >> BigInt(128)).toString() === "1" && (
                <>
                  <PercentTx1>
                    총 의뢰금액 {val.minSumPrice.toLocaleString()}원 이상
                  </PercentTx1>
                </>
              )}
              {(BigInt(val.id) >> BigInt(128)).toString() === "2" && (
                <>
                  <PercentTx1>
                    총 배달금액 {val.minSumPrice.toLocaleString()}원 이상
                  </PercentTx1>
                </>
              )}
              <Bt1 onClick={async () => await mintGradeNft(val.id)}>
                발급받기
              </Bt1>
            </Set_div_mid1>
          ))}
        </>
      )}
      <Margin></Margin>
      <BottomBar />
    </>
  );
};

export default NftSettingPage;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff !important;
    height: 100%;
  }
`;

const NftImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
`;

const Topdiv = styled.div`
display: flex;
padding: var(--padding);
color: var(--black-color);
justify-content: center;
`;

const Topimg = styled.img`
width: 8rem;
height: 8rem;
border-radius: 100%;
background-color: #ffffff;
`;

const moveGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const  Set_div_top = styled.div`
display: flex;
justify-content: center;
font-size: 16px;
font-weight: bold;
padding: 10px;
margin: 10px;
border-radius: 0.313rem;
border: 1px solid;
border-color: #d3d3d3;
background-color: var(--white-color);
color: #ffffff;
background: linear-gradient(to right, #34d0ff, #95ffca, #a9efff, #34d0ff);
  background-size: 300% 100%;
  background-repeat: no-repeat;
  animation: ${moveGradient} 10s linear infinite; /* 애니메이션 적용 */
`;



const  Set_div = styled.div`
display: flex;
font-size: 14px;
font-weight: bold;
padding: 14px;
border-radius: 0.313rem;
border: 0rem;
background-color: var(--white-color);
`;


const Fx1 = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const  Set_div_mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 이미지를 수직으로 중앙에 정렬 */
  justify-content: center;
  flex: 0 0 calc(33.33% - 20px); /* 33.33%로 설정, 여백을 고려해야 함 */
  margin: 10px;
  padding: 10px 6px 10px 6px;
  border-radius: 15px;
  border: 1px solid;
  border-color: #d9d9d9;
background-color: #ffffff;
  filter: drop-shadow(0px 4px 2px #bebebe);
`;

const  Set_div_mid1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 이미지를 수직으로 중앙에 정렬 */
  justify-content: center;
  flex: 0 0 calc(33.33% - 20px); /* 33.33%로 설정, 여백을 고려해야 함 */
  margin: 20px;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid;
  border-color: #d9d9d9;
background-color: #ffffff;
  filter: drop-shadow(0px 4px 2px #bebebe);
`;

const PercentTx1 = styled.div`
margin: 10px;
font-size: 12px;
font-weight: bold;
color: #6c6c6c;
`;

const PercentTx2 = styled.span`
font-size: 16px;
font-weight: bold;
margin-bottom: 0px;
color: #000000;
`;

const Bt1 = styled.button`
width: 100%;
height: 40px;
font-weight: bold;
font-size: 14px;
text-transform: uppercase;
letter-spacing: 1px;
font-weight: 500;
color: #000;
background-color: #ffffff;
border: 1px solid #535353;
border-radius: 10px;
transition: all 0.3s ease;

&:hover {
  background-color: #000;
  border-color: #000;
  color: #fff;
}
`;

const  Margin = styled.div`
height: 3.85rem;
width: 100%;
`