import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";


const money = require('../../image/money.png')

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
    height: 200px;
    border-radius: 0.313rem;
    border: 0rem;
    background-color: var(--white-color);
`;

const Sc1 = styled(Sc0)`
    margin: 0 0.563rem 0.563rem 0.563rem;
    justify-content: center;
    height: 3rem;
`;

const Div0 = styled.div`
    display: flex;
    padding: 18px 12px 16px 30px;
`;

const Divwallet = styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-small);
    font-weight: bold;
    margin-left: 0.75rem;
`;

const DivBs = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    height: 29px;
    font-size: 4px;
    color: #CECECE;
    padding: 5px 0 5px 40px;
`;

const Spwallet = styled.div`
    margin-left: auto;
    margin-right: 0.625rem;
    font-size: var(--font-md);
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

const Divsky = styled(Divst0)`
    background-color: #79AFFF;
    position: relative;
`;

const Divbl = styled(Divst0)`
    background-color: #0D6EFD;
`;

const Divred = styled(Divst0)`
    background-color: #DC3545;
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
    font-size: var(--font-small);
    color: #646464;
    font-weight:bold;
`;

const Spprofit0 = styled.span`
    padding: 16px 20px 10px 0;
    font-size: 16px;
    font-weight: bold;
`;

const Spprofit1 = styled(Spprofit0)`
    margin-left: auto;
`;

const Spprofit2 = styled(Spprofit0)`
    padding-top: 0px;
    font-size: var(--font-small);
    color : #979797;
`;

const Spprofit3 = styled(Spprofit2)`
    margin-left: auto;
    color : #79AFFF;
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

const Bticon = styled.button`
    border: none;
    background-color: var(--white-color);
    margin-right: 0.625rem;
`;

const Bticonimg = styled.img`
    width: 1.875rem;
    height: 1.875rem;
`;

function Fulfillmentlist(){

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
        <Sc1>
            <Divwallet>
                <Sp0>지갑 잔액</Sp0>
                <Spwallet>00,000</Spwallet>
                <Bticon>
                    <Bticonimg src={money} alt="" />
                </Bticon>
            </Divwallet>
        </Sc1>
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
                <Sp0>오토바이</Sp0>
                <Divsky>
                    수행중
                    <DivDelay>지연</DivDelay>
                </Divsky>
            </Div0>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <DivBs>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
            </DivBs>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <Div1>
                <Spprofit0>수익</Spprofit0>
                <Spprofit1>8000원</Spprofit1>
            </Div1>
            <Div1>
                <Spprofit2>수락 시간 17:30</Spprofit2>
                <Spprofit3>배송 완료 20:00까지</Spprofit3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divbl>완료</Divbl>
            </Div0>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <DivBs>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
            </DivBs>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <Div1>
                <Spprofit0>수익</Spprofit0>
                <Spprofit1>8000원</Spprofit1>
            </Div1>
            <Div1>
                <Spprofit2>수락 시간 17:30</Spprofit2>
                <Spprofit3>완료 시간 20:00</Spprofit3>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <Divred>실패</Divred>
            </Div0>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <DivBs>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
                <BsFillCircleFill/>
            </DivBs>
            <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
            </Div1>
            <Div1>
                <Spprofit0>수익</Spprofit0>
                <Spprofit1>8000원</Spprofit1>
            </Div1>
            <Div1>
                <Spprofit2>수락 시간 17:30</Spprofit2>
                <Spprofit3>배송 완료 20:00까지</Spprofit3>
            </Div1>
        </Sc0>
        <Divhid/>
        </>
    );
}


export default Fulfillmentlist;