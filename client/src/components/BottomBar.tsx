import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import circles from "./animation/circles.gif";
import styled, { keyframes } from "styled-components";
import Lottie from "lottie-react";
import BottombarAni from "../Lottie/BottomBarAni.json";
import { useVerificationStore } from "../App";
import { useConnWalletInfo } from "../App";
import { BottomBarStyle } from "../StyleCollection";

const {Div0, Div1, Sc0, Sp0, Container, Iconimg} = new BottomBarStyle()

const white1 = require("../image/white1.png");
const black1 = require("../image/black1.png");
const white2 = require("../image/white2.png");
const black2 = require("../image/black2.png");
const white3 = require("../image/white3.png");
const black3 = require("../image/black3.png");
const white4 = require("../image/white4.png");
const black4 = require("../image/black4.png");



function BottomBar() {
  const navigate = useNavigate();
  const { isConnected } = useConnWalletInfo();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [showWalletAni, setShowWalletAni] = useState(false);
  const [showSignUpAni, setShowSignUpAni] = useState(false);
  const { isMember } = useVerificationStore();

  const handleButtonClick = (page: string) => {
    if (!isConnected) {
      setShowWalletAni(true);
      const timeoutId = setTimeout(() => {
        setShowWalletAni(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    } else if (!isMember) {
      if (isConnected) {
        setShowSignUpAni(true);
        const timeoutId = setTimeout(() => {
          setShowSignUpAni(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
      }
    }
    setCurrentPage(page);
    navigate(page);
  };

  return (
    <>
      {showWalletAni ? (
        <Sc0>
          <Container>
            <Lottie animationData={BottombarAni} />
          </Container>
        </Sc0>
      ) : (
        <>
          {showSignUpAni ? (
            <Sc0>
              <Container>
                <>회원가입 애니메이션</>
              </Container>
            </Sc0>
          ) : (
            <Sc0>
              <Div0 onClick={() => handleButtonClick("/commission")}>
                <Div1>
                  <Iconimg
                    src={currentPage === "/commission" ? black1 : white1}
                    alt="icon"
                  />
                </Div1>
                <Sp0>의뢰하기</Sp0>
              </Div0>
              <Div0 onClick={() => handleButtonClick("/search")}>
                <Div1>
                  <Iconimg
                    src={currentPage === "/search" ? black2 : white2}
                    alt="icon"
                  />
                </Div1>
                <Sp0>검색</Sp0>
              </Div0>
              <Div0 onClick={() => handleButtonClick("/chatting")}>
                <Div1>
                  <Iconimg
                    src={currentPage === "/chatting" ? black3 : white3}
                    alt="icon"
                  />
                </Div1>
                <Sp0>채팅</Sp0>
              </Div0>
              <Div0 onClick={() => handleButtonClick("/profile")}>
                <Div1>
                  <Iconimg
                    src={currentPage === "/profile" || currentPage === "/nftSetting" ? black4 : white4}
                    alt="icon"
                  />
                </Div1>
                <Sp0>내정보</Sp0>
              </Div0>
            </Sc0>
          )}
        </>
      )}
    </>
  );
}

export default BottomBar;
