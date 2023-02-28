import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SelectInput = styled.select`
  width: 96px;
  height: 26px;
  font-size: 0.75rem;
  border-radius: 8px;
  border: 0px;
  outline: #efefef;
  background-color: #D9d9d9;
  text-align: center;
  color: #000000;
  margin: 10px;
  font-weight: bold;
  font-size: var(--font-small);
`;

const Sc0 = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0rem 0.563rem 0.563rem 0.563rem;
    height: 134px;
    border-radius: 0.313rem;
    border: 0rem;
    background-color: var(--white-color);
`;


const Div0 = styled.div`
    display: flex;
    padding: 18px 12px 16px 30px;
`;

const Divst0 = styled(Div0)`
    margin-left: auto;
    background-color: #9d9d9d;
    border-radius: 20px;
    width: 60px;
    height: 23px;
    align-items:center;
    justify-content:center;
    padding: 0px;
    color: var(--white-color);
    font-weight: bold;
`;

const Divgr = styled(Divst0)`
    background-color: #28a745;
    position: relative;
`;

const Divbl = styled(Divst0)`
    background-color: #0D6EFD;
`;

const Divred = styled(Divst0)`
    background-color: #DC3545;
`;

const DivOrg = styled(Divst0)`
    background-color: #DC9935;
`;

const DivDelay = styled(Divst0)`
    background-color: var(--white-color);
    border-width: 1px;
    border-style: dashed;
    border-color: #FF3030;
    color: #FF3030;
    position: absolute;
    bottom: -30px;
`;

const Divhid = styled(Div0)`
  height: 3.875rem;
`;

const Div1 = styled.div`
    display:flex;
    padding: 0px 0px 0px 30px;
`;

const Sp0 = styled.span`
    font-size: var(--font-md);
    font-weight: bold;
`;

const Sp1 = styled.span`
    font-size: var(--font-micro);
    padding-left: 16px;
`;

const Sp2 = styled.span`
    font-size: var(--font-micro);
    color: #646464;
`;

const Sp3 = styled(Sp1)`
    font-weight: bold;
    padding-left: 26px;
`;

const Modal = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position:relative;
`;

const CloseButton  = styled.span`
    position: absolute;
    color: #aaa;
    top:0;
    right:0;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
`;

function Orderlist(){

    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return(
        <>
        <SelectInput name = "date">
            <option value="">기간 선택</option>
            <option value="all0">전체</option>
            <option value="week">최근 1주일</option>
            <option value="month">최근 1달</option>
            <option value="year">최근 1년</option>
        </SelectInput>
        <SelectInput>
            <option value="">배송 수단</option>
            <option value="all1">전체</option>
            <option value="walk">도보</option>
            <option value="bike">자전거</option>
            <option value="kickboard">킥보드</option>
            <option value="motercycle">오토바이</option>
            <option value="car">승용차</option>
            <option value="truck">트럭</option>
        </SelectInput>
        <SelectInput>
            <option value="">진행 상태</option>
            <option value="all2">전체</option>
            <option value="Wait">대기</option>
            <option value="accept">수락</option>
            <option value="finish">완료</option>
            <option value="fail">실패</option>
            <option value="cancel">취소</option>
            <option value="Delay">지연</option>
        </SelectInput>
        <Sc0 onClick={handleOpen}>
        {showModal && (
            <Modal>
            <ModalContent>
              <CloseButton onClick={handleClose}>
                &times;
              </CloseButton>
              <p>모달 내용</p>
            </ModalContent>
          </Modal>
              )}
            <Div0>
                <Sp0>접수 중</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divst0>대기</Divst0>
            </Div0>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>금액</Sp2>
                <Sp3>19,800원</Sp3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>오토바이</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divgr>
                    수락
                    <DivDelay>지연</DivDelay>
                </Divgr>
            </Div0>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>금액</Sp2>
                <Sp3>19,800원</Sp3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divbl>완료</Divbl>
            </Div0>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>금액</Sp2>
                <Sp3>19,800원</Sp3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divred>실패</Divred>
            </Div0>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>금액</Sp2>
                <Sp3>19,800원</Sp3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <DivOrg>취소</DivOrg>
            </Div0>
            <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>경기도 김포시 김포대로</Sp1>
            </Div1>
            <Div1>
                <Sp2>금액</Sp2>
                <Sp3>19,800원</Sp3>
            </Div1>
        </Sc0>
        <Divhid/>
        </>
    );
}


export default Orderlist;