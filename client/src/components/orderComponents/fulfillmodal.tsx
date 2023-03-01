import React, { CSSProperties, useEffect } from 'react';
import styled from 'styled-components';
import { BsX, BsStickies } from "react-icons/bs";

interface FulfillModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Div0 = styled.div`
    display: flex;
    padding: 1.75rem 0 1.25rem 0;
`;

const Div1 = styled.div`
    display:flex;
    padding: 0.625rem 0px 0.625rem 0px;
`;

const Sp0 = styled.span`
    font-size: var(--font-md);
    font-weight: bold;
`;

const Sp1 = styled.span`
    font-size: var(--font-md1);
    margin-left: auto;
    position: relative;
    font-weight: bold;
`;

const Sp2 = styled.span`
    font-size: var(--font-md1);
    color: #646464;
`;

const Sp3 = styled.span`
    font-size: var(--font-micro);
    position: absolute;
    top: 1rem;
    right: 0;
    font-weight: lighter;
`;

const Sp4 = styled.span`
    font-size: var(--font-md1);
    color: #0D6EFD;
    font-weight: bold;
`;

const Sp5 = styled.span`
    font-size: var(--font-md1);
    color: #0D6EFD;
    margin-left: auto;
    font-weight: bold;
`;

const Hr = styled.hr`
    margin: 0.75rem auto 0.75rem auto;
    width: 100%;
    border: 0;
    height: 0;
    border-top: 0.063rem solid #dfdfdf;
    padding: 0 0 0 0;
`;

const Ic = styled.span`
    font-size: var(--font-micro);
    margin-left: 0.188rem;
`;

const Button = styled.button`
  width: 100%;
  height: 4.313rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border-color: var(--black-color);
  border-width: thin;
  background-color: var(--white-color);
  color: var(--black-color);
  font-weight: bold;
  font-size: var(--font-md);
  margin-top: 1rem;
`;

const FulfillModal: React.FC<FulfillModalProps> = ({ isOpen, onRequestClose }) => {
  const modalStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  };

  const boxStyle: CSSProperties = {
    width: '80%',
    backgroundColor: "#fff",
    padding: '1.25rem',
    position: "relative",
    borderRadius: '1rem',
  };
  
  const buttonStyle: CSSProperties = {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    boxShadow: "none",
    outline: "none",
    fontSize: "1.563rem",
    backgroundColor: "#fff"
  };


  useEffect(() => {
    // 모달이 열렸을 때 body의 overflow 스타일 속성을 hidden으로 변경
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div style={modalStyle}>
          <div style={boxStyle}>
            <button onClick={onRequestClose}  style={buttonStyle}><BsX/></button>
            <Div0>
                <Sp0>접수 중</Sp0>
            </Div0>
            <Div1>
                <Sp2>배송 기한</Sp2>
                <Sp1>대기중</Sp1>
            </Div1>
            <Hr/>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>김포시 김포대로 926번길 46<br/><Sp3>주소 세부사항</Sp3></Sp1>
                <Ic><BsStickies/></Ic>
            </Div1>
            <Div1>
                <Sp2>발송인</Sp2>
                <Sp1>이름</Sp1>
            </Div1>
            <Div1>
                <Sp2>연락처</Sp2>
                <Sp1>0505-0987-XXXX</Sp1>
                <Ic><BsStickies/></Ic>
            </Div1>
            <Hr/>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>김포시 김포대로 926번길 46<br/><Sp3>주소 세부사항</Sp3></Sp1>
                <Ic><BsStickies/></Ic>
            </Div1>
            <Div1>
                <Sp2>수령인</Sp2>
                <Sp1>이름</Sp1>
            </Div1>
            <Div1>
                <Sp2>연락처</Sp2>
                <Sp1>0505-0987-XXXX</Sp1>
                <Ic><BsStickies/></Ic>
            </Div1>
            <Hr/>
            <Div1>
                <Sp2>물품 세부 정보</Sp2>
                <Sp1>포카칩 5봉지<br/><Sp3>60kg</Sp3></Sp1>
            </Div1>
            <Hr/>
            <Div1>
                <Sp4>수익</Sp4>
                <Sp5>19,800원</Sp5>
            </Div1>
            <Button>배송 현황 확인</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FulfillModal;
