import { sliceAddress } from "../utils/CalAny";
import styled from "styled-components";

interface ExplorerTableProps {
    orderNum: string;
    clientAddress: string;
    quickerAddress: string;
    orderPrice: string;
    state: string;
}
// 오더번호, 지갑주소 2개, 의뢰가격, 상태
export default function ExplorerTableData({ orderNum, clientAddress, quickerAddress, orderPrice, state}: ExplorerTableProps) {
    quickerAddress = sliceAddress(quickerAddress.slice(1))
    if(quickerAddress === "0x000000...")
        quickerAddress = "-"
    
  return (
    <>
      <tr>
        <td>{orderNum}</td>
        <td>{sliceAddress(clientAddress.slice(1))}</td>
        <td>{quickerAddress}</td>
        <td>{orderPrice}</td>
        <td><ViewState state={state}/></td>
      </tr>
    </>
  );
}
interface ViewStateProp {
    state : string;
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
