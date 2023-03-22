import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Orderlistmodal from "./orderlistmodal";
import { create } from "zustand";

interface OrderState {
    OrderNum: number | null;
    setOrderNum: (newOrder:number) => void;
}

export const useOrderState = create<OrderState>((set) => ({
    OrderNum: null,
    setOrderNum: (OrderNum: number) => set({OrderNum}),
}))

function Orderlist(){
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [orderNumList, setOrderNumList] = useState([])

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
        
    })

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

        <Sc0 onClick={handleOpenModal}>
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
        <Orderlistmodal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        <Divhid/>
        </>
    );
}

export default Orderlist;

const SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  outline: #efefef;
  background-color: #D9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem 0.625rem 0 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
`;

const Sc0 = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0.563rem 0.563rem 0.563rem 0.563rem;
    border-radius: 0.313rem;
    border: 0rem;
    background-color: var(--white-color);
`;
const Div0 = styled.div`
    display: flex;
    padding:  1rem 0.75rem 1rem 1.875rem;
`;

const Divst0 = styled(Div0)`
    margin-left: auto;
    background-color: #9d9d9d;
    border-radius: 1.25rem;
    width: 3.75rem;
    height: 1.438rem;
    align-items:center;
    justify-content:center;
    padding: 0;
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
    border-width: 0.063rem;
    border-style: dashed;
    border-color: #FF3030;
    color: #FF3030;
    position: absolute;
    bottom: -1.875rem;
`;

const Divhid = styled(Div0)`
  height: 3.875rem;
`;

const Div1 = styled.div`
    display:flex;
    padding: 0px 0px 0px 1.875rem;
`;

const Sp0 = styled.span`
    font-size: var(--font-md);
    font-weight: bold;
`;

const Sp1 = styled.span`
    font-size: var(--font-micro);
    padding-left: 1rem;
`;

const Sp2 = styled.span`
    font-size: var(--font-micro);
    color: #646464;
`;

const Sp3 = styled(Sp1)`
    font-weight: bold;
    padding-left: 1.625rem;
    margin-bottom: 1rem;
`;