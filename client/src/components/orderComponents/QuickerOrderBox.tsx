import styled from "styled-components";
import {
  useState,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { useOrderState } from "../ShowOrders";
import { formatedDateYMD, formatedDateHM } from "../../utils/ConvertTimestampToDate";
import { calQuickerIncome, extractNumber } from "../../utils/CalAny";

type DivStatusProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  value?: number;
};

export function QuickerOrderBox({ orderObj }: any) {
    let orderPriceNum:number
        if (orderObj.orderPrice === null){
          orderPriceNum = 0
        } else {
          orderPriceNum = extractNumber(orderObj.orderPrice)
        }
    const income = calQuickerIncome(orderPriceNum)

  return (<>
    {orderObj === null ? (
        <>
          <Div0>블록체인에서 데이터를 가져오고 있어요</Div0>
        </>
      ) : (
        <>
          <Div0>
                <Sp0>도보</Sp0>
                <Sp1>{formatedDateYMD(orderObj.matchedTime)}</Sp1>
                <ViewState order={orderObj} />
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
                <Spsc1>{income}원</Spsc1>
            </Div1>
            <Div1>
                <Spprofit2>수락 시간 {formatedDateHM(orderObj.matchedTime)}</Spprofit2>
                <Spsc2>완료 시간 {orderObj.deliveredTime && formatedDateHM(orderObj.deliveredTime)}</Spsc2>
            </Div1>
        </>
      )}
  </>);
}

export function QuickerOrderModal() {
    const { order } = useOrderState() as any;
  const { setOrder, isModalOpen, setIsModalOpen } = useOrderState();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  return <></>;
}

const ViewState = ({ order }: any) => {
    switch (order?.state) {
      case "matched":
        return <StateDiv value={1}>수행중</StateDiv>;
      case "completed":
        return <StateDiv value={2}>완료</StateDiv>;
      case "failed":
        return <StateDiv value={3}>실패</StateDiv>;
      default:
        return <StateDiv value={1}>수행중</StateDiv>;
    }
  };

  const Div0 = styled.div`
    display: flex;
    padding: 1.125rem 0.75rem 1rem 1.875rem;
`;

  const StateDiv = styled(Div0)<DivStatusProps>`
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
        return '#79AFFF'; // 수행중
      case 2:
        return '#0D6EFD'; // 완료
      case 3:
        return '#DC3545'; // 실패
      default:
        return '';
    }
  }};
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

const DivBs = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    height: 1.813rem;
    font-size: 0.25rem;
    color: #CECECE;
    padding: 0.313rem 0 0.313rem 2.5rem;
`;
