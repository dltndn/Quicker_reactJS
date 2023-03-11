import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import styled from "styled-components";
const white1 = require('../image/white1.png');
const black1 = require('../image/black1.png');
const white2 = require('../image/white2.png');
const black2 = require('../image/black2.png');
const white3 = require('../image/white3.png');
const black3 = require('../image/black3.png');
const white4 = require('../image/white4.png');
const black4 = require('../image/black4.png');

const Sc0 = styled.section`
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 3.875rem;
    background-color: var(--white-color); 
    align-items: center;
    justify-content: center;
    text-align:center;
`;

const Div0 = styled.div`
    flex: 1 1 25%;
`;

const Div1 = styled.div`
    margin-top: 5px;  
`;

const Sp0 = styled.div`
    margin-top: -5px;
    font-size: var(--font-micro);
`;

const Iconimg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

function BottomBar() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [showDiv, setShowDiv] = useState(false);

  const handleButtonClick = (page:string) => {
    if (!isConnected) {
      setShowDiv(true);
      const timeoutId = setTimeout(() => {
        setShowDiv(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
    setCurrentPage(page);
    navigate(page);
  }

  return (
    <>{showDiv ? (
      <Div0><div>지갑을 연결해주세요.</div></Div0>
    ) : (<Sc0>
      <Div0 onClick={()=> handleButtonClick('/commission')}>
          <Div1>
          <Iconimg src={currentPage === '/commission' ? black1 : white1} alt="icon" />
          </Div1>
          <Sp0>
              의뢰하기
          </Sp0>
      </Div0>
      <Div0 onClick={()=> handleButtonClick('/search')}>
          <Div1>
          <Iconimg src={currentPage === '/search' ? black2 : white2} alt="icon" />
          </Div1>
          <Sp0>
              검색
          </Sp0>
      </Div0>
      <Div0 onClick={()=> handleButtonClick('/chatting')}>
          <Div1>
          <Iconimg src={currentPage === '/chatting' ? black3 : white3} alt="icon" />
          </Div1>
          <Sp0>
              채팅
          </Sp0>
      </Div0>
      <Div0 onClick={()=> handleButtonClick('/profile')}>
          <Div1>
          <Iconimg src={currentPage === '/profile' ? black4 : white4} alt="icon" />
          </Div1>
          <Sp0>
              내정보
          </Sp0>
      </Div0>
  </Sc0>) }
    </>
  );
}

export default BottomBar;
