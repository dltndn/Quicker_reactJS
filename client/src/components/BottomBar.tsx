import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from "styled-components";
const white1 = require('../image/white1.png');
const black1 = require('../image/black1.png');
const white2 = require('../image/white2.png');
const black2 = require('../image/black2.png');
const white3 = require('../image/white3.png');
const black3 = require('../image/black3.png');
const white4 = require('../image/white4.png');
const black4 = require('../image/black4.png');
const Div0 = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.875rem;
    background-color: var(--white-color); 
`;
const Ul0 = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: calc(var(--padding)/2) 0;
`;
const Bt0 = styled.button`
    display: flex;
    flex-direction: column;
    font-size: var(--font-micro);
    background-color: var(--white-color);
    border: none;
`;
const Sp0 = styled.span`
    font-size: var(--font-md);
    margin: 0 auto;
    margin-top: 0.125rem;
    margin-bottom: 0.313rem;
`;
const Iconimg = styled.img`
    width: 1.5rem;
    height : 1.5rem;
`;

function BottomBar() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const handleGoCommissionPage = () => {
    setCurrentPage('/commission');
    navigate('/commission');
  };
  const handleGoSearchPage = () => {
    setCurrentPage('/search');
    navigate('/search');
  };
  const handleGoChattingPage = () => {
    setCurrentPage('/chatting');
    navigate('/chatting');
  };
  const handleGoProfilePage = () => {
    setCurrentPage('/profile');
    navigate('/profile');
  };

  return (
    <Div0>
        <Ul0>
            <li>
                <Bt0 onClick={handleGoCommissionPage}>
                    <Sp0>
                        <Iconimg src={currentPage === '/commission' ? black1 : white1} alt="icon" />
                    </Sp0>
                    <span>의뢰하기</span>
                </Bt0>
            </li>
            <li>
                <Bt0 onClick={handleGoSearchPage}>
                    <Sp0>
                        <Iconimg src={currentPage === '/search' ? black2 : white2} alt="icon" />
                    </Sp0>
                    <span>검색</span>
                </Bt0>
            </li>
            <li>
                <Bt0 onClick={handleGoChattingPage}>
                    <Sp0>
                        <Iconimg src={currentPage === '/chatting' ? black3 : white3} alt="icon" />
                    </Sp0>
                    <span>채팅</span>
                </Bt0>
            </li>
            <li>
                <Bt0 onClick={handleGoProfilePage}>
                    <Sp0>
                        <Iconimg src={currentPage === '/profile' ? black4 : white4} alt="icon" />
                    </Sp0>
                    <span>내정보</span>
                </Bt0>
            </li>
        </Ul0>
    </Div0>
  );
}

export default BottomBar;