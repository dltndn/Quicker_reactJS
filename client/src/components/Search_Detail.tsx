import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "./confirmBtn";
import { useSearchState } from "../pages/SearchPage";
import { useEffect } from "react";
import { OrderObj } from "../pages/SearchPage";
import { WriteTransactionToBlockchain } from "../utils/ExecuteOrderFromBlockchain";
import { useOrderStore } from "../pages/commission";
import Handler from "../lib/Handler";
import { useAccount } from "wagmi";

const money = require("../image/money.png");

function Search_Detail() {
  const navigator = useNavigate()
  const { address } = useAccount()
  const { orders, showOrder } = useSearchState();
  const { setShowAllowance } = useOrderStore()
  let order:OrderObj | undefined
  order = orders && showOrder !== undefined ? orders[showOrder] : undefined;
  
  // 수락하기 로직
  const acceptOrder = async () => {
    if (showOrder) {
      const wttb = new WriteTransactionToBlockchain(orders[showOrder].orderNum.toString())
      try {
        const data = await wttb.acceptOrder()
        console.log(order?.orderNum)
        Handler.post({
          orderId : order!.orderNum,
          userWalletAddress : address
        }, "http://localhost:9000/updateorder")
        navigator("/")
      } catch(e) {
        if (e) {
          //@ts-ignore
          if (e.reason === "execution reverted: Already matched with another quicker...") {
            console.log("이미 매칭이 완료된 오더입니다.")
            //@ts-ignore
          } else if (e.reason === "execution reverted: ERC20: insufficient allowance") {
            setShowAllowance(true)
            //@ts-ignore
          } else if (e.reason === "execution reverted: ERC20: transfer amount exceeds balance") {
            console.log("보증금 송금을 위한 잔액이 부족합니다.")
          } else {
            console.log(e)
          }
        }
      }
    }
  };

  return (
    <>
      {order && (
        <>
          <Se0>
            <Div0>
              <Div0_1>
                <Circle />
                <Circle />
                <Circle />
                <Circle />
                <Circle />
                <Circle />
              </Div0_1>
            </Div0>
            <Div1>
              <Div1_1>
                {order.departure}
                <br />
                <Div1_2>{order.dep_detail}(출발지)</Div1_2>
              </Div1_1>
            </Div1>
            <Div2>
              <Div1_1>
                {order.destination}
                <br />
                <Div1_2>{order.des_detail}(도착지)</Div1_2>
              </Div1_1>
            </Div2>
            <Div3>
              <Div3_1>
                <Div3_2>물품 부피</Div3_2>
                <Div3_2>물품 중량</Div3_2>
              </Div3_1>
              <Div3_1_1>
                <Div3_2_1>{order.volume}</Div3_2_1>
                <Div3_2_1>{order.weight}</Div3_2_1>
              </Div3_1_1>
            </Div3>
            <Div4>
              <Div3_1>
                <Div3_2>세부사항</Div3_2>
              </Div3_1>
              <Div3_1_1>
                <Div3_2_1>{order.detail}</Div3_2_1>
              </Div3_1_1>
            </Div4>
            <Div4>
              <Div3_1>
                <Div3_2>배송기한</Div3_2>
              </Div3_1>
              <Div3_1_1>
                <Div3_2_1>{order.deadline}</Div3_2_1>
              </Div3_1_1>
            </Div4>
            <Div4_1>
              <Div3_1>
                <Div3_2>운송수단</Div3_2>
              </Div3_1>
              <SelectInput name="ex">
                {order.transportation.map((value) => (
                    <option>{value}</option>
                ))}
              </SelectInput>
            </Div4_1>
            <Div5>
              <div>
                수익
                <br />
                <Div5_1>보증금</Div5_1>
              </div>
              <Divpo>
                {order.income}
                <br />
                <Div5_1>{order.securityDeposit}</Div5_1>
              </Divpo>
            </Div5>
          </Se0>
          <ConfirmBtn
            content="수락하기"
            confirmLogic={() => {
              acceptOrder();
            }}
          />
        </>
      )}
    </>
  );
}

export default Search_Detail;

const scaleBounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

const Circle = styled.div`
  display: inline-block;
  margin: 0 3px;
  width: 10px;
  height: 10px;
  background: #0047ff;
  border-radius: 50em;
  margin-bottom: 10px;
`;

const Div0 = styled.div`
  position: fixed;
  top: 80px;
  left: 20px;
`;

const Div0_1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div1 = styled.div`
  margin: 20px 10px 10px 40px;
`;

const Div1_1 = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Div1_2 = styled(Div1_1)`
  font-size: 16px;
  font-weight: normal;
  margin-top: 10px;
  color: #9c9c9c;
`;

const Div2 = styled.div`
  margin: 50px 10px 30px 40px;
`;

const Se0 = styled.section`
  padding: 0 24px 0 24px;
`;

const Div3 = styled.div`
  display: flex;
  background-color: #efefef;
  border-radius: 5px;
`;

const Div4 = styled(Div3)`
  margin-top: 5px;
`;

const Div4_1 = styled(Div4)`
  justify-content: space-between;
`;

const Div5 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 80px 10px 0px 10px;
  font-size: 20px;
  color: #0d6efd;
  font-weight: bold;
  text-align: center;
`;

const Divpo = styled.div`
  position: relative;
`;

const Div3_1 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #909090;
`;

const Div3_2 = styled.div`
  padding: 16px;
`;

const Div3_1_1 = styled(Div3_1)`
  color: #000000;
`;

const Div3_2_1 = styled(Div3_2)`
  padding: 16px 0 16px 0;
`;

const Div5_1 = styled.div`
  font-size: 12px;
  color: #929292;
  font-weight: bold;
  padding-top: 10px;
`;

const SelectInput = styled.select`
  border: none;
  background-color: #efefef;
  text-align: center;
  color: #000000;
  font-weight: bold;
  font-size: 14px;
  margin-right: 20px;
`;
