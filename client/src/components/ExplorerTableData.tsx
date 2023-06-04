import { sliceAddress } from "../utils/CalAny";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useExplorerState } from "../pages/ExplorerPage";

interface ExplorerTableProps {
  orderNum: string;
  clientAddress: string;
  quickerAddress: string;
  orderPrice: string;
  state: string;
  blinkIndex: number;
}
// 오더번호, 지갑주소 2개, 의뢰가격, 상태
export default function ExplorerTableData({
  orderNum,
  clientAddress,
  quickerAddress,
  orderPrice,
  state,
  blinkIndex,
}: ExplorerTableProps) {
  quickerAddress = sliceAddress(quickerAddress.slice(1));
  if (quickerAddress === "0x000000...") quickerAddress = "-";

  const { blinkOrderArrIndex } = useExplorerState();
  const [isBlink, setIsblink] = useState<boolean>(false)

  const setIsBlinkFalse = async () => {
    const timeoutId = setTimeout(() => {
      setIsblink(false)
    }, 500);
return () => clearTimeout(timeoutId);
  }

  useEffect(() => {
    blinkOrderArrIndex.forEach((val) => {
      if (blinkIndex === val) {
        setIsblink(true)
      }
    });
  }, [blinkOrderArrIndex]);

  useEffect(() => {
    if(isBlink) {
      setIsBlinkFalse()
    }
  }, [isBlink])

  return (
    <>
      {isBlink ? (
        <BlinkDiv>
          <Div1>
            <Div1_2>{orderNum}</Div1_2>
            <Div1_2>{sliceAddress(clientAddress.slice(1))}</Div1_2>
            <Div1_2>{quickerAddress}</Div1_2>
            <Div1_2>{orderPrice}</Div1_2>
            <Div1_2>
              <ViewState state={state} />
            </Div1_2>
          </Div1>
        </BlinkDiv>
      ) : (
        <Div1>
          <Div1_2>{orderNum}</Div1_2>
          <Div1_2>{sliceAddress(clientAddress.slice(1))}</Div1_2>
          <Div1_2>{quickerAddress}</Div1_2>
          <Div1_2>{orderPrice}</Div1_2>
          <Div1_2>
            <ViewState state={state} />
          </Div1_2>
        </Div1>
      )}
    </>
  );
}
interface ViewStateProp {
  state: string;
}
const ViewState = ({ state }: ViewStateProp) => {
  switch (state) {
    case "created":
      return <StateDiv color="#9d9d9d">대기</StateDiv>;
    case "matched":
      return <StateDiv color="#28a745">매칭</StateDiv>;
    case "completed":
      return <StateDiv color="#0d6efd">완료</StateDiv>;
    case "failed":
      return <StateDiv color="#dc3545">실패</StateDiv>;
    case "canceled":
      return <StateDiv color="#dc9935">취소</StateDiv>;
    default:
      return <StateDiv color="#9d9d9d">대기</StateDiv>;
  }
};

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkDiv = styled.div`
  animation: ${blinkAnimation} 1s;
`;

const Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

const StateDiv = styled(Div0)`
  margin-left: auto;
  background-color: ${(props) => props.color};
  border-radius: 1.25rem;
  width: 3.75rem;
  height: 1.438rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--white-color);
  font-weight: bold;
`;

const Div1 = styled.div`
  display: flex;
  background-color: var(--white-color);
  padding: 10px;
`;

const Dvi1_1 = styled.div`
  display: flex;
  flex: 1 1 20%;
  justify-content: center;
  font-size: var(--font-md1);
  font-weight: bold;
`;

const Div1_2 = styled(Dvi1_1)`
  font-size: 0.9em;
  align-items: center;
`;
