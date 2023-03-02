import styled from "styled-components";
import { useState, DetailedHTMLProps, HTMLAttributes, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";
import FulfillModal from "./fulfillmodal";
import { useAccount } from "wagmi";
import GetQkrwBalance from "../getQkrwBalance";


type DivStatusProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value?: number;
  };

const money = require('../../image/money.png')

const SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0px;
  outline: #efefef;
  background-color: #D9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
`;

const Sc0 = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0rem 0.563rem 0.563rem 0.563rem;
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
    padding: 1.125rem 0.75rem 1rem 1.875rem;
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
    height: 1.813rem;
    font-size: 0.25rem;
    color: #CECECE;
    padding: 0.313rem 0 0.313rem 2.5rem;
`;

const Spwallet = styled.div`
    margin-left: auto;
    margin-right: 0.625rem;
    font-size: var(--font-md);
`;

const DivStatus = styled(Div0)<DivStatusProps>`
  margin-left: auto;
  border-radius: 1.25rem;
  width: 3.75rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-weight: bold;
  color: var(--white-color);
  background-color: ${props => {
    switch (props.value) {
      case 1:
        return '#79AFFF';
      case 2:
        return '#0D6EFD';
      case 3:
        return '#DC3545';
      default:
        return '';
    }
  }};
`;


const DivDelay = styled(DivStatus)`
    background-color: var(--white-color);
    border-width: 1px;
    border-style: dashed;
    border-color: #FF3030;
    color: #FF3030;
    position: absolute;
    bottom: -30px;
`;

const Div1 = styled.div`
    display:flex;
    padding: 0 0 0 1.875rem;
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
    font-size: var(--font-small);
    color: #646464;
    font-weight:bold;
`;

const Spprofit0 = styled.span`
    padding: 1rem 1.25rem 0.625rem 0;
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

const Spsc0 = styled(Spprofit0)`
    color : #0D6EFD;
`; 

const Spsc1 = styled(Spsc0)`
    margin-left: auto;
`; 

const Spsc2 = styled(Spprofit2)`
    margin-left: auto;
`; 

const Spfail0 = styled(Spprofit0)`
    color : #DC3545;
    padding: 1rem 1.25rem 1.25rem 0;
`; 

const Spfail1 = styled(Spfail0)`
    margin-left: auto;
`; 

const Bticon = styled.button`
    border: none;
    background-color: var(--white-color);
    margin-right: 0.625rem;
`;

const Bticonimg = styled.img`
    width: 1.875rem;
`;

function Fulfillmentlist(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { address, isConnected } = useAccount();

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

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
                <Spwallet>{isConnected && address && <GetQkrwBalance address={address}/>}</Spwallet>
                <Bticon>
                    <Bticonimg src={money} alt="" />
                </Bticon>
            </Divwallet>
        </Sc1>
        <Sc0 onClick={handleOpenModal}>
            <Div0>
                <Sp0>오토바이</Sp0>
                <Sp1>23.01.01</Sp1>
                <DivStatus value={1}>
                    수행중
                    <DivDelay>지연</DivDelay>
                </DivStatus>
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
                <DivStatus value={2}>완료</DivStatus>
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
                <Spsc0>수익</Spsc0>
                <Spsc1>8000원</Spsc1>
            </Div1>
            <Div1>
                <Spprofit2>수락 시간 17:30</Spprofit2>
                <Spsc2>완료 시간 20:00</Spsc2>
            </Div1>
        </Sc0>
        <Sc0>
            <Div0>
                <Sp0>도보</Sp0>
                <Sp1>23.01.01</Sp1>
                <DivStatus value={3}>실패</DivStatus>
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
                <Spfail0>수익</Spfail0>
                <Spfail1>8000원</Spfail1>
            </Div1>
        </Sc0>
        <FulfillModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </>
    );
}


export default Fulfillmentlist;