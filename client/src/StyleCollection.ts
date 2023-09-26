import styled from "styled-components";

export class ExplorerPageStyle {
  Div_Base = styled.div`
    display: flex;
    background-color: var(--white-color);
    padding: 10px;
    border-radius: 0.313rem;
  `;

  Div0 = styled(this.Div_Base)`
    align-items: center;
    font-size: var(--font-md1);
    font-weight: bold;
    margin: 10px 16px 10px 16px;
  `;

  Div_1 = styled(this.Div_Base)`
    flex: 1 1 20%;
    justify-content: center;
    font-size: var(--font-md1);
    font-weight: bold;
  `;

  Div_2 = styled(this.Div_1)`
    font-size: 36px;
    margin-bottom: 20px;
  `;

  Div_3 = styled(this.Div_2)`
    font-size: 16px;
    align-items: center;
  `;

  Box = styled.div`
    margin-top: 0.5rem;
    width: 97%;
    background-color: #ffffff;
    margin: 0.313rem;
    border-radius: 0.313rem !important;
  `;

  Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  ReqFont = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0px 5px 16px;
  `;

  Sp1 = styled.div`
    margin-left: auto;
    margin-right: 0.625rem;
    font-size: var(--font-md1);
    font-weight: bold;
  `;

}

export class ChattingPageStyle {

Div0 = styled.div`
  display: flex;
  flex-direction: column;
`;

Div3 = styled.div`
  justify-content: center;
  text-align: center;
`

Img = styled.img`
  margin-top: 30%;
  margin-left: 10%;
  height: 140px;
  width: 140px;
`;

Div1 = styled.div`
  margin-top: 20px;
  font-size: var(--font-micro);
  color: #828282;
`;
}

export class FeeGovenorPageStyle {

 Receivetx = styled.div`
   font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0 12px 0;
  color: #6c6c6c;
  font-size: 16px;
`;

 ReciDiv1 = styled.div`
  text-align: center;
`;

Sc0 = styled.section`
  margin: 8px 16px 16px 16px;
  padding: 20px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;

Div0 = styled.div`
  margin: 8px 16px 16px 16px;
  padding: 20px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;

Div1 = styled(this.Div0)`
  margin: 0px 16px 16px 16px;
  padding: 16px;
  border: none;
  box-shadow: none;
`;

Div1_1 = styled(this.Div1)`
  margin: 16px 16px 0px 16px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
`;

 Flex1 = styled.div`
  display: flex;
  justify-content: space-between;
`

 Flex2 = styled(this.Flex1)`
  margin: 40px 0 40px 0;
  justify-content: space-around;
  text-align: center;
  align-items: center;
`

 Sc1 = styled.section`
  flex: 1 1 40;
  width: 45%;
  height: 150px;
  margin: 16px 8px 16px 16px;
  padding: 16px;
  border-radius: 5px;
  border: none;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
`;

 Sc1_1 = styled(this.Sc1)`
  margin: 16px 16px 16px 8px;
  background-color: #54E1FF;
`
Tx2 = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
`
Tx3= styled.span`
  color: #747474;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
 `
Tx1 = styled.span`
color: #000;
font-size: 14px;
font-weight: bold;
`

 Tx1color = styled(this.Tx1)`
  color: #FFF;
`

 Tx1_1 = styled(this.Tx1)`
  font-size: 16px;
`

Tx1_2 = styled(this.Tx1)`
  padding-top: 16px;
`


Tx3color = styled(this.Tx3)`
  color: #FFF;
`

PercDiv1 = styled.div`
  margin: 12px 0 0px 0px;
  padding: 6px 0 6px 0px;
  font-size: 13px;
  font-weight: bold;
  color: #6c6c6c;
`;

PercSp1 = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #ff0a0a;
`;

PercSp2 = styled(this.PercSp1)`
  font-size: 10px;
  color: #000000;
`;

PercDiv2 = styled.div`
  font-size: 14px;
  color: #000;
  font-weight: bold;
  margin: 16px 16px 0px 0px;
`;

 VtTx = styled.span`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 16px 0px 0px 0px;
`;

 PercentTx4_2 = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #F00;
  padding-left: 8px;
`;
 PercentTx4_3 = styled(this.PercentTx4_2)`
  color: #747474;
`
 PercentTx4_4 = styled(this.PercentTx4_2)`
color: #0047FF;
`
 ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #efefef;
`;

 BtWp_1 = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
    padding: 16px 0;
  justify-content: center;
  background-color: #efefef;
`

 SaveButton = styled.button`
  width: 45%;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
 SaveButton_1 = styled(this.SaveButton)`
  width: 90%;
`;

 LoadButton = styled.button`
  width: 45%;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;
 HideDiv = styled.div`
  height: 3.9rem;
`;
 HideDiv_1 = styled.div`
  height: 5.0rem;
`;
 LotDiv = styled.div`
  position: absolute;
  width: 100px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
 Hr = styled.hr`
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 0.063rem;
  border: 0;
  background: #e6e6e6;
`;

 QuickerTx_1 = styled.div`
   display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  margin: 10px;
`;

 Input = styled.input`
  display: flex;
  margin: 0px 0px 0px 0px;
`;

 Lb1 = styled.label`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: column;
`;

 Margin_1 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`
}

export class ReceipientPageStyle {

Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 50%;
`;

 LotDiv = styled.div`
position: absolute;
width: 100px;
top: 45%;
left: 50%;
transform: translate(-50%, -50%);
`;

 Btwal = styled.button`
width: 100%;
height: 2.25rem;
font-size: var(--font-md1);
font-weight: bold;
border: 0rem;
outline: #efefef;
background-color: #ffffff;
padding-left: 0.625rem;
text-align: center;

&:focus {
  border-bottom: 0.125rem solid #0070f3;
}

`;
}

export class StakingPageStyle {

Sc3 = styled.section`
  margin: 8px 16px 16px 16px;
  padding: 20px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;

ReciDiv1 = styled.div`
  text-align: center;
`;

Sc01 = styled.section`
  height: 170px;
  margin: 8px 16px 0px 16px;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  border: solid;
  border-width: 1px;
  border-bottom: none;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: none;
  position: static;
`;

Sc02 = styled(this.Sc3)`
  height: 170px;
  margin-top: 0px;
  margin-bottom: 8px;
  border-radius: 0px 0px 5px 5px;
  border-top: none;
  box-shadow: 0px 3px 0px #bebebe;
  background: linear-gradient(to right, #ffffff, #dff9ff, #d9f8ff, #a3eeff);
`;

Sc4 = styled.section`
  flex: 1 1 50%;
  height: 160px;
  margin: 8px 8px 0 8px;
  padding: 16px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;

Sc0 = styled.section`
  display: flex;
  padding: 0 8px 16px 8px;
  position: static;
`;

Div1 = styled.div`
  display: flex;
`;


Div1_3 = styled.div`
  display: flex;
  flex: 1 1 25%;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  flex-direction: column;
  padding: 10px 0 10px 0;
  text-align: center;
  margin-bottom: 8px;
  cursor: pointer;
  color: initial;
  &.clicked {
    border: 2px solid;
    color: blue;
    border-radius: 20px;
    border-color: blue;
  }
  cursor: pointer;
`;

Sp0 = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

Div0 = styled.div`
  display: flex;
  background-color: var(--white-color);
  padding: 10px;
`;

QuickerTx = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
QuickerTx_1 = styled(this.QuickerTx)`
  margin: 10px;
`;

HeadQuickerTx = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

Quickertxsm = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0 12px 0;
  color: #6c6c6c;
`;

Receivetx = styled(this.Quickertxsm)`
  font-size: 16px;
`;

PercentDiv = styled.div`
  margin: 8px;
`;

PercentTx1 = styled.div`
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #6c6c6c;
`;
PercentTx2 = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0px;
  color: #ff0a0a;
`;
PercentTx3 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #000000;
`;

QuicPcTx = styled.div`
  text-align: right;
  font-size: 12px;
  font-weight: bold;
  color: #6c6c6c;
`;

StakingTx = styled.div`
  font-size: 22px;
  color: #00a3ff;
  font-weight: bold;
  margin: 16px 16px 16px 0px;
`;
StakingTx1 = styled(this.StakingTx)`
  margin-top: 40px;
`;
Bt1 = styled.span`
  position: absolute;
  margin-right: 30px;
  right: 0;
  top: 535px;
`;

StakingTxQuicker = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #8ed6ff;
  padding-left: 0px;
`;
StakingTxSm1 = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #c6c6c6;
`;
StakingTxSm1_1 = styled(this.StakingTxSm1)`
  margin: 6px 10px 6px 10px;
`;
StakingTxSm2 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #757575;
  padding-left: 8px;
`;
StakingTxSm2_1 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #ff0000;
  margin: 0 10px 0 0;
`;
StakingBt = styled.button`
  margin: 0px 10px 0px 10px;
  background-color: transparent;
  border: 0.5px solid black; /* 테두리 색깔과 굵기 설정 */
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;
ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

StakingTx2 = styled.div`
  line-height: 120px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
StakingTx3 = styled(this.StakingTx2)`
  line-height: normal;
  color: #44d9fb;
`;
HideDiv = styled.div`
  height: 3.2rem;
`;
Margin = styled.div`
  margin: 0px 10px 0px 10px;
`;

Margin_1 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

Ip = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 0.313rem;
  border: 1px solid #efefef;
  outline: none;
  background-color: #ffffff;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  margin: 0px;
  text-align: left;
  color: #000000;
  &:focus {
    border-color: #efefef;
    background-color: #ffffff;
  }
`;

}

export class QrModalStyle {

ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 80%;
  text-align: center;
`;
ModalCloseButton = styled.button`
  position: absolute;
    margin-top: -10px;
    margin-left: 160px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
ModalImg = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;
}

export class SendTxKStyle {

LoadButton = styled.button`
  width: 98%;
  height: 3.125rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border: 0;
  outline: #efefef;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;
}

export class WalletConnectBtnStyle {
Bt1 = styled.button`
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #000;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    border-color: #000;
    color: #fff;
  }
`;

Bt2 = styled.button`
  width: 70px;
  height: 30px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #ffffff;
  background-color:  #00eeff;
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0px 6px 0px 6px;

  &:hover {
    background-color: #ffffff;
    border: 1px solid #00eeff;
    color: #00eeff;
  }
`;

Bt3 = styled(this.Bt2)`
  background-color:  #4873ff;
  &:hover {
    border: 1px solid #4873ff;
    color: #4873ff;
  }
`;

}

export class ChatStyle {
Div0 = styled.div`
  margin: 0px 10px 5px 10px;
  border-style: solid;
  border-color: #efefef;
  border-width: 0.5px 0px 0.5px 0px;
`;

Div1 = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
`;

Div2 = styled.div`
  font-size: 12px;
  font-weight: thin;
  color: #646464;
  margin: 5px 0 5px 0;
`;

Img1 = styled.img`
  width: 4px;
  margin: -5px 0px -5px 90px;
`;

Sc0 = styled.section`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 3.875rem;
  background-color: var(--white-color);
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

Ip1 = styled.input`
  border-radius: 20px;
  border: none;
  width: 90%;
  background-color: #e6e6e6;
  outline: none;
  height: 100%;
  color: #a0a0a0;
  padding-left: 15px;
`;

Bt1 = styled.button`
  border: none;
  background-color: #ffffff;
  width: 30px;
  font-size: 20px;
  margin: 5px 10px 0 0 ;
`

Divinput = styled.div`
  width: 85%;
  height: 30px;
`

}

export class MyMessageStyle {

Divclock = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;

Div1 = styled.div`
  display: flex;
  margin: 10px 10px 10px 15px;
  justify-content: flex-end;
`;

DivChat = styled.div`
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0px 5px 0px 10px;
  padding: 8px;
  background-color: #79afff;
  color: #ffffff;
`;

}

export class OtherMessageStyle {

Img = styled.img`
  width: 33px;
  height: 33px;
`;

Div = styled.div`
  display: flex;
  margin: 10px 10px 10px 15px;
`; 

DivChat = styled.div`
  background-color: #f8f8f8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0px 5px 0px 10px;
  padding: 8px;
`; 

Divclock = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;

}

export class RoomStyle {

 StateDiv = styled.span`
  padding: 1rem 0.75rem 1rem 1rem;
  padding: 0;
  color: #5843f5;
  font-weight: bold;
  font-size: 12px;
`;

 Div0 = styled.div`
  display: flex;
  width: 100%;
  height: 85px;
  text-align: center;
  align-items: center;
  justify-content: space-around;
  border-style: solid;
  border-color: #efefef;
  border-width: 0.5px 0px 0.5px 0px;
`;

 Div1 = styled.div`
  padding: 5px 10px 5px 10px;
  display: flex;
  flex: 1 1 20%;
`

 Div2 = styled.div`
  display: flex;
  flex: 1 1 80%;
  flex-flow: column;
  justify-content: flex-start;
  text-align: left;
  margin: 0px 10px 0px 10px;

`

 Sp0 = styled.div`
  font-size: 12px;
  font-weight: bold;
`

 Sp1 = styled.span`
  font-size: 8px;
  font-weight: thin;
  color: #929292;
`

 Sp2 = styled(this.Sp0)`
  font-weight: normal;
`

 Img0 = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`
}

export class CompletedOrderStyle {

Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 100%;
`;

Divback = styled(this.Div0)`
  height: auto;
  justify-content: center;
`;

 Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

 Div2 = styled.div`
  display: flex;
  height: 600px;
  width: 95%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
`

 Btwal = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  color: #28A745;
`;


Sp0 = styled.div`
font-size: 20px;
font-weight: bold;
color: #828282;
`;

 Div4 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #0D6EFD;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  width: 95%;
  padding: 10px 20px 20px 20px;
  border-radius: 0 0 10px 10px;
`;

Mg0 = styled.section`
position: fixed;
bottom: 0.5rem;
width: 100%;
display: flex;
justify-content: center;
`
}

export class DeliveryStatusStyle {

 Posst = styled.div`
  position: fixed;
  width: 50px;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
`
 Pin1 = styled.img`
  width: 35px;
` 
Div0 = styled.div`
    display: flex;
    justify-content: space-between;

` 
Div1 = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    margin: 0 20px 0 20px;
`
Div2 = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
`
}


export class FailedOrderConfirmStyle {

   Div0 = styled.div`
  display: flex;
  justify-content: center;
`;

Div2 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 100%;
`;

Bt0 = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  color: #FF5353;
`;

 Container = styled.section`
width: 100%;
bottom: 4.125rem;
display: flex;
justify-content: center;
align-items: center;
`;

 Box = styled.div`
border-radius: 0.313rem;
margin-top: 0.5rem;
width: 95%;
background-color: #ffffff;
padding: 0.75rem 1.125rem 0.75rem 1.125rem;
text-align: center;
`;

Sp0 = styled.span`
font-size: 16px;
font-weight: bold;
margin-left: 0.313rem;
`;

Mg0 = styled.section`
position: fixed;
bottom: 0.5rem;
width: 100%;
display: flex;
justify-content: center;
`
 }

export class ReceipentConfirmStyle {

   Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 100%;
`;

 Divback = styled(this.Div0)`
  height: auto;
  justify-content: center;
`;

 Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

 Div2 = styled.div`
  display: flex;
  height: 600px;
  width: 95%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
`

Bt0 = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  color: #28A745;
`;
Bt1 = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  
`;


 Span01 = styled.div`
font-size: 20px;
font-weight: bold;
color: #828282;
`;

Div4 = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #0D6EFD;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  width: 95%;
  padding: 10px 20px 20px 20px;
  border-radius: 0 0 10px 10px;
`;
}

export class CompletedDeliveryStyle {

   Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 100%;
`;

 Divback = styled(this.Div0)`
  height: auto;
  justify-content: center;
`;

 Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

 Div2 = styled.div`
  display: flex;
  height: 400px;
  width: 95%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
`

 Btwal = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  color: #28A745;
`;



 MoneyGifImg = styled.img`
  width: 55%;
`;


 Div5_1 = styled.div`
  font-size: 12px;
  color: #929292;
  font-weight: bold;
  padding-top: 10px;
`;

 Divpo = styled.div`
  position: relative;
`;

 Div4 = styled.div`
  color: #000000;
`

 Div5 = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #0D6EFD;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  width: 95%;
  padding: 10px 20px 20px 20px;
  border-radius: 0 0 10px 10px;
`;

 Margin_1 = styled.section`
position: fixed;
bottom: 0.5rem;
width: 100%;
display: flex;
justify-content: center;
`
}

export class DelivereditemStyle {
   Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 50%;
`;

 Btwal = styled.button`
width: 100%;
height: 2.25rem;
font-size: var(--font-md1);
font-weight: bold;
border: 0rem;
outline: #efefef;
background-color: #ffffff;
padding-left: 0.625rem;
text-align: center;

&:focus {
  border-bottom: 0.125rem solid #0070f3;
}

`;
}

export class FaceToFaceDeliveryStyle {

 Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

 Sp0 = styled.span`
margin: 10px 0 10px 0%;
font-size: var(--font-md1);
font-weight: bold;
`;
 Mg0 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
}

export class FailedDeliveryStyle {

 Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

Div3 = styled.div`
    display: flex;
    height: 3.875rem;
`;

 Div1 = styled.div`
    flex: 1 1 100%;
`;

Bt0 = styled.button`
    width: 100%;
    height: 3.25rem;
    font-size: var(--font-md);
    font-weight: bold;
    border: 0rem;
    outline: #efefef;
    background-color: #ffffff;
    padding-left: 0.625rem;
    text-align: center;
    color: #FF5353;
`;

 Container = styled.section`
  position: fixed;
  width: 100%;
  bottom: 4.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

 Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 95%;
  background-color: #ffffff;
  padding: 0.75rem 1.125rem 0.75rem 1.125rem;
  text-align: center;
`;

 ReqFont = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 0.313rem;
`;

 Ipval = styled.textarea`
    width: 2.75rem;
    height: 1.375rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    text-align: center;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */

    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;

 Ipdet = styled(this.Ipval)`
    margin-top: 0.625rem;
    width: 100%;
    height: 80px;
    padding: 10px;
    
`;
 Span01 = styled.div`
  margin: 20px 0 20px;
  font-size: 14px;
  font-weight: bold;
  color: #828282;
`;

Div2 = styled.div`
    display: flex;
    height: 500px;
    justify-content: center;
    padding-top: 200px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
 `;
 }


export class ReceivingitemStyle {

   Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

 Div1 = styled.div`
  flex: 1 1 100%;
`;

 Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

 Btwal = styled.button`
  width: 100%;
  height: 3.25rem;
  font-size: var(--font-md);
  font-weight: bold;
  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;
  color: #000000;
`;

 Ready = styled.img`
  width: 40%;
`;

 Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  
`;
 Ft1 = styled.div`
display:flex;
justify-content: center;
flex-direction:column;
text-align:center;
font-size: var(--font-md1);
color: #000000;
`;

  }

export class RemoteDeliveryStyle {

   Div0 = styled.div`
  display: flex;
  justify-content: center;
`;

Div2 = styled.div`
display: flex;
height: 500px;
justify-content: center;
padding-top: 200px;
font-size: 14px;
font-weight: bold;
text-align: center;
`;

Sp0 = styled.div`
margin: 20px 0 20px;
font-size: 14px;
font-weight: bold;
color: #828282;
`;
Mg0 = styled.section`
position: fixed;
bottom: 0.5rem;
width: 100%;
display: flex;
justify-content: center;
`
}

export class WaitClientConfirmStyle {
   Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  
`;
}

export class Main_noticeStyle {
   Sc0 = styled.section`
  position: absolute;
  width: 95%;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  margin: 10px;
  border-radius: 15px;
  border: solid;
  border-width: 1px;
  border-color: #f01a1a;
`;

 Notice_div = styled.div`
  padding: var(--padding);
  display: flex;
  align-items:center;
  font-size: var(--font-small);
`;
 Notice_divfont_1 = styled.div`
  font-weight: bold;
  margin-left: 1.25rem;
`;
 Notice_divfont_2 = styled.div`
  font-weight: lighter;
  margin-left: 0.625rem;
`;
}

export class Main_phraseStyle {
LotDiv = styled.div`
  position: absolute;
  width: 100px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

Div0 = styled.div`
  display: flex;
  justify-content: space-between;
`;


Sp1 = styled.span`
  padding-left: var(--padding);
  padding-bottom: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

Sp2 = styled.span`
  padding-right: var(--padding);
`;


 Divmain = styled.div`
font-size: 18px;
`
 Img = styled.img`
    position: absolute;
    width: 70px;
    top: 70%;
    left: 70%;
    transform: translate(-50%, -50%);
`;
 Divmain1 = styled.div`
font-size: 14px;
font-weight: bold;
`

 DelPo = styled.div`
    position: absolute;
    width: 250px;
    top: 75%;
    left: 65%;
    transform: translate(-50%, -50%);
`

 DelPo1 = styled(this.DelPo)`
    width: 350px;
    top: 60%;
    left: 50%;
`
 Sp1_1 = styled.span`
  padding-top: 8px;
  padding-left: var(--padding);
  padding-bottom: 8px;
  font-size: var(--font-md);
  font-weight: bold;
`;

 Sc3 = styled.section`
    display: flex;
    height: 400px;
    margin: 8px 16px 16px 16px;
    padding: 16px;
    border-radius: 15px;
    border: solid;
    border-width: 1px;
    border-color: #d9d9d9;
    background-color: #ffffff;
    filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Sc0 = styled.section`
    display: flex;
    padding: 0 8px 16px 8px ;
`;

 Sc4 = styled.section`
    flex: 1 1 50%;
    height: 160px;
    margin: 8px 8px 0 8px;
    padding: 16px;
    border-radius: 15px;
    border: solid;
    border-width: 1px;
    border-color: #d9d9d9;
    background-color: #ffffff;
    filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Sc5 = styled.section`
    display: flex;
    margin: 8px 16px 16px 16px;
    padding: 8px;
    border-radius: 15px;
    border-width: 1px;
    border-color: #d9d9d9;
    background-color: #E9E9E9;
    filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Notice_div = styled.div`
    display: flex;
    align-items:center;
    font-size: var(--font-small);
`;
 Notice_divfont_1 = styled.div`
    font-weight: bold;
    margin-left: 1.25rem;
`;
 Notice_divfont_2 = styled.div`
    font-weight: lighter;
    margin-left: 0.625rem;
`;

}

export class Main_topbarStyle {
   Maindiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--padding);
  background-color: var(--white-color);
  color: var(--black-color);
  height: 3.875rem;
`;
 MainSp = styled.span`
  padding-top: 0.25rem;
  font-size: var(--font-Quicker);
  font-weight: bold;
`;
 Mainbt = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: var(--font-large);
`;
}

export class MainOrderInformationStyle {
   Img = styled.img`
  position: absolute;
  width: 70px;
  top: 70%;
  left: 70%;
  transform: translate(-50%, -50%);
`;

 LotDiv = styled.div`
  position: absolute;
  width: 100px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

 DelPo = styled.div`
  position: absolute;
  width: 250px;
  top: 75%;
  left: 65%;
  transform: translate(-50%, -50%);
`;

 Div0 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

 Div1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

 Sp0 = styled.div`
  padding: var(--padding) var(--padding) 0 var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

 Sp1 = styled.span`
  padding-top: 8px;
  padding-left: var(--padding);
  padding-bottom: 8px;
  font-size: var(--font-md);
  font-weight: bold;
`;

 Sp1_1 = styled.span`
  padding-left: var(--padding);
  padding-bottom: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

 Divmain = styled.div`
  font-size: 18px;
`;

 Divmain1 = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

 Sc3 = styled.section`
  display: flex;
  height: 400px;
  margin: 8px 16px 16px 16px;
  padding: 16px;
  border-radius: 15px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Sc0 = styled.section`
  display: flex;
  padding: 0 8px 16px 8px;
`;

 Sc4 = styled.section`
  flex: 1 1 50%;
  height: 160px;
  margin: 8px 8px 0 8px;
  padding: 16px;
  border-radius: 15px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Sc5 = styled.section`
  display: flex;
  margin: 8px 16px 16px 16px;
  padding: 8px;
  border-radius: 15px;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #e9e9e9;
  filter: drop-shadow(0px 4px 2px #bebebe);
`;

 Notice_div = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-small);
`;
 Notice_divfont_1 = styled.div`
  font-weight: bold;
  margin-left: 1.25rem;
`;
 Notice_divfont_2 = styled.div`
  font-weight: lighter;
  margin-left: 0.625rem;
`;

}

export class ImfoStyle {
   Topdiv = styled.div`
  display: flex;
  padding: var(--padding);
  color: var(--black-color);
  height: 9.688rem;
  align-items: center;
`;

 Topbt = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  font-size: var(--font-md);
  background-color: #efefef;
  margin-left: auto;
  padding-right: 0.25rem;
  padding-top: 0.438rem;
`;

 Topimg = styled.img`
  width: 5rem;
  height: 5rem;
  margin-left: 0.5rem;
  border-radius: 100%;
`;

 Toptx = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
  padding-left: 1.125rem;
`;

 Scwal = styled.section`
  display: flex;
  height: 3rem;
  border: 0rem;
  margin: 0.175rem 0.563rem;
`;

 Sc0 = styled.section`
  display: flex;
  margin: 0 0.563rem;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  border-radius: 0.313rem 0.313rem 0 0;
  border: 0rem;
  background-color: var(--white-color);
  transition: all 0.3s ease;
`;

 Sc1 = styled(this.Sc0)`
  border-radius: 0px 0px 0.313rem 0.313rem;
  margin-bottom: 0.375rem;
  transition: all 0.3s ease;
`;

 Sc2 = styled.section`
  display: flex;
  margin: 0 0.563rem;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  border: 0;
  background-color: var(--white-color);
  transition: all 0.3s ease;
`;

 Sc3 = styled.section`
  display: flex;
  margin: 0 0.563rem;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  border-radius: 0.313rem;
  border: 0;
  background-color: var(--white-color);
  margin-bottom: 0.375rem;
  transition: all 0.3s ease;
`;

 Sc3_1 = styled(this.Sc3)`
  &:hover {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #000000;
}
`
 Sc2_1 = styled(this.Sc2)`
  &:hover {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #000000;
}
`
 Sc1_1 = styled(this.Sc1)`
  &:hover {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #000000;
}
`
 Sc0_1 = styled(this.Sc0)`
  &:hover {
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #000000;
}
`

 Div0 = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-md1);
  font-weight: bold;
  margin-left: 0.75rem;
`;

 Sp0 = styled.div`
  margin-left: auto;
  margin-right: 0.625rem;
`;

 Sp1 = styled(this.Sp0)`
  font-size: var(--font-md);
`;

 Sp2 = styled.div`
  margin-left: 10px;
`;

 Bteye = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: 0.875rem;
  margin-right: 0.75rem;
`;

 Hr = styled.hr`
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  height: 0.063rem;
  border: 0;
  background: #e6e6e6;
`;

 Bticon = styled.button`
  border: none;
  background-color: var(--white-color);
  margin-right: 0.625rem;
`;

 Bticonimg = styled.img`
  width: 1.875rem;
  height: 1.875rem;
`;

 Margin = styled.div`
  height: 3.85rem;
  width: 100%;
`
}
 
export class OrderBoxStyle {
   Order_Div = styled.div`
  //div0
  display: flex;
  padding: 1.75rem 0 1.25rem 0;
`;

 Order_Div_detail = styled(this.Order_Div)`
  //div1
  padding: 0.625rem 0px 0.625rem 0px;
`;

 Order_Span_md_bold = styled.span`
  //sp0
  font-size: var(--font-md);
  font-weight: bold;
`;

 Order_Span_md1 = styled.span`
  font-size: var(--font-md1);
`;

 Order_Span_md1_blue = styled(this.Order_Span_md1)`
  color: #0d6efd;
  font-weight: bold;
`;
 Order_Span_md1_blue_left = styled(this.Order_Span_md1)`
  //sp5
  font-size: var(--font-md1);
  color: #0d6efd;
  margin-left: auto;
  font-weight: bold;
`;
 Order_Span_md1_left = styled(this.Order_Span_md1)`
  //sp1
  margin-left: auto;
  position: relative;
  font-weight: bold;
`;
 Order_Span_md1_grey = styled(this.Order_Span_md1)`
  //sp2
  color: #646464;
`;

 Order_Span_mc_ab = styled.span`
  //sp3
  font-size: var(--font-micro);
  position: absolute;
  top: 1rem;
  right: 0;
  font-weight: lighter;
`;

 Order_Span_mc_detail = styled.div`
  //sp3
  font-size: var(--font-micro);
  top: 1rem;
  right: 0;
  font-weight: lighter;
`;

 Order_Span_mc_left = styled.span`
  font-size: var(--font-micro);
  margin-left: 0.188rem;
`;

 Order_Hr = styled.hr`
  //hr
  margin: 0.75rem auto 0.75rem auto;
  width: 100%;
  border: 0;
  height: 0;
  border-top: 0.063rem solid #dfdfdf;
  padding: 0 0 0 0;
`;

 Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

 StateDiv = styled(this.Div0)`
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

 Div1 = styled.div`
  display: flex;
  padding: 0px 0px 0px 1.875rem;
`;

 Sp0 = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

 Sp1 = styled.span`
  font-size: var(--font-md1);
  padding-left: 1rem;
`;

 Sp2 = styled.span`
  font-size: var(--font-md1);
  color: #646464;
`;

 Sp3 = styled(this.Sp1)`
  font-weight: bold;
  padding-left: 1.625rem;
  margin-bottom: 1rem;
`;

 Button = styled.button`
  width: 100%;
  height: 4.313rem;
  font-size: 30px;
  border-radius: 0.313rem;
  border-color: var(--black-color);
  border-width: thin;
  background-color: var(--white-color);
  color: var(--black-color);
  font-weight: bold;
  font-size: var(--font-md);
  margin-top: 1rem;
`;

 DivBs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.813rem;
  font-size: 0.25rem;
  color: #cecece;
  padding: 0.313rem 0 0.313rem 2.5rem;
`;

 Spprofit0 = styled.span`
  padding: 1rem 1.25rem 0.625rem 0;
  font-size: 16px;
  font-weight: bold;
`;

 Spprofit2 = styled(this.Spprofit0)`
  padding-top: 0px;
  font-size: var(--font-small);
  color: #979797;
`;

 Spsc0 = styled(this.Spprofit0)`
  color: #0d6efd;
`;

 Spsc1 = styled(this.Spsc0)`
  margin-left: auto;
`;

 Spsc2 = styled(this.Spprofit2)`
  margin-left: auto;
`;


}

export class ReqStyle {
   Sp2 = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 24px;
    color: #79afff;
    margin: 10px;
`;

 Imgdiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0px 0px 0px 10px;
`;

 Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

 Div0 = styled.div`
  display: flex;  
    text-align:center;
    margin-top: 0.938rem;
    font-size: var(--font-micro);
`;

 Div1 = styled.div`
    flex: 1 1 16.66666666666667%;
`;

 Div2 = styled.div`
    margin-top: -0.313rem;  
`;

 Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 97%;
  height: 5.5rem;
  background-color: #ffffff;
  padding: 0.75rem 1.125rem 0.75rem 1.125rem;
`;

 Boxtrans = styled(this.Box)`
  height: 7.5rem;
`;

 Boxlimit = styled(this.Box)`
  height: 8.688rem;
`;

 ReqFont = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.313rem;
  text-align: left;
`;

ReqFont1 = styled.div`
display: flex;
justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.313rem;
  text-align: left;
`;

Sp4 = styled.div`
display: flex;
justify-content: flex-end;
color: red;
`

 InputDiv = styled.div`
  margin-top: 0.625rem;
`;

 SelectInput = styled.select`
  width: 100%;
  height: 1.938rem;
  font-size: 0.75rem;
  border-radius: 0.313rem;
  border: 0px;
  outline: #efefef;
  background-color: #efefef;
  text-align: center;
  color: #a6a6a6;
`;

 Btdiv = styled.div`
     padding: 0.625rem 0 0 0;
`;

 Btul = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0.5rem 0;
`;

 Leftli = styled.li`
    justify-content: left;
    font-size: 1.375rem;
    padding: 0 0.313rem 0 0.313rem;
`;


 Btam= styled.button`
  width: 2.75rem;
  height: 1.375rem;
  font-size: var(--font-small);
  border-radius: 0.313rem;
  border: 0rem;
  outline: #efefef;
  background-color: #efefef;
  color: #a6a6a6;
  margin-right: 0.375rem;
`;

 Ip = styled.input`
width: 77%;
height: 1.375rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;



 Sp0 = styled.span`
    margin-right : 0.313rem;
`;

 Sp1 = styled.span`
    margin-left : 0.313rem;
`;

 ImgWrapper = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

 Checkbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

 Img = styled.img`
    width: 1.875rem;
    height: 1.875rem;
`;
 CheckIcon = styled.span`
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary);
  font-size: var(--font-small);
`;

 Bticon = styled.button`
    border: none;
    background-color: var(--white-color);
    margin-right: 0.625rem;
`;

 Bticonimg = styled.img`
    width: 1.4rem;
    height: 1.4rem;

`;
}

export class MapAppButtonSytle {
   AppIcon = styled.img`
  width: 2em;
  height: 2em;
  padding: 0.2em;
  border-radius: 30%;
`
}

export class BottomBarStyle {
   Sc0 = styled.section`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 3.875rem;
  background-color: var(--white-color);
  align-items: center;
  justify-content: center;
  text-align: center;
`;

 Div0 = styled.div`
  flex: 1 1 25%;
`;

 Div1 = styled.div`
  margin-top: 5px;
`;

 Sp0 = styled.div`
  margin-top: -5px;
  font-size: var(--font-micro);
`;

 Iconimg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

 Img1 = styled.img`
  width: 2rem;
  height: 2rem;
`;

 Container = styled.div`
  font-weight: bold;
`;
}

export class BottomconfirmBtnStyle {
   Button = styled.button`
  position: fixed;
  bottom: 0.5rem;
  width: 98%;
  height: 3.125rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border: 0;
  outline: #efefef;
  background-color: ${props => props.disabled ? "#bbbfbc" : "#0D6EFD"};
  color: var(--white-color);
  transition: all 0.2s ease-in-out;
  &:active {
    transform: translateY(0.25rem);
  }
`;
 Container = styled.section`
  padding: calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center;
`;
}

export class ConfirmBtnStyle {
   Button = styled.button`
  position: fixed;
  bottom: 3.875rem;
  width: 98%;
  height: 3.125rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border: 0;
  outline: #efefef;
  background-color: ${props => props.disabled ? "#bbbfbc" : "#0D6EFD"};
  color: var(--white-color);
  margin-bottom: 0.313rem;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.95);
    background-color: #004488;
  }
`;

 Container = styled.section`
  padding: calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center;
`;
}

export class CreateNewOrderStyle {
   Margin_1 = styled.section`
  height: 98px;
`
}

export class DeliveryTrackerSytle {

   Bt1 = styled.button`
  border: none;
  padding: 5px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.22em;
  padding-right: 0.22em;
  font-size: 12px;
  border-radius: 0.213rem;
  border: 0;
  color: #000000;
  background-color: #ffffff;
`
 Ic1 = styled.div`
  font-size: 24px;
  margin-bottom: 5px;
  color: #3bd8ff;
`
}

export class ExplorerTableDataStyle {

   Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

 StateDiv = styled(this.Div0)`
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

 Div1 = styled.div`
  display: flex;
  background-color: var(--white-color);
  padding: 10px;
`;

 Dvi1_1 = styled.div`
  display: flex;
  flex: 1 1 20%;
  justify-content: center;
  font-size: var(--font-md1);
  font-weight: bold;
`;

 Div1_2 = styled(this.Dvi1_1)`
  font-size: 0.9em;
  align-items: center;
`;

}

export class InceraseAllowanceStyle {
   Div0 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

 Div1 = styled.div`
  margin-top: 20px;
  font-size: var(--font-micro);
  color: #828282;
`;
 Margin_1 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

}

export class InceraseQAllowanceStyle {
   Div0 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

 Div1 = styled.div`
  margin-top: 20px;
  font-size: var(--font-micro);
  color: #828282;
`;
 Margin_1 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`
}

export class Join_inputStyle {
   Maintx = styled.div`
  background-color: #efefef;
  min-height: 21.25rem;
  display: grid;
  justify-content:space-around;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
   Sc0 = styled.section`
  padding: var(--padding) var(--padding) calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center; 
`;
   Divtx = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 25%;
  align-items: center;
  margin-top: 0.563rem;
`;
   Div0 = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 80%;
`;
   Div1 = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 20%;
`;
 Sp = styled.div`
  font-size: var(--font-small);
  font-weight: bold;
`;
   Bt = styled.button`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #0D6EFD;
    text-align: center;
    color: var(--white-color);
`;

   Dt = styled.input`
  position: relative;
  /* Remove clear button and spinner */
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button {
  display: none;
  }
  /* Style the calendar icon */
  &::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent;
  cursor: pointer;
  }
`;
   Ip = styled.input`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */
    background-color: #efefef;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    text-align: left;
    color: #a6a6a6;
    
    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;



 Ic = styled.div`
  padding-top: 0.438rem;
`;
   Em = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 38%;
`;
   Wal = styled.div`
    padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
    width: 100%;
`;


   Btwal = styled.button`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    padding-left: 0.625rem;
    text-align: left;
    color: #a6a6a6;
`;

 Divhid = styled(this.Div0)`
  height: 7rem;
`;

}

export class LoadingAniStyle {
   Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  
`;
}

export class NftProfileStyle {
   NftImg = styled.img`
  width: 5rem;
  height: 5rem;
  margin-left: 0.5rem;
  border-radius: 100%;
`;

}

export class Notice_writeStyle {
   EditorWrapper = styled.div`
  background-color: #ffffff; /* Add white background color */
  border-radius: 5px;
  box-shadow: 0px 4px 2px #bebebe;
  padding: 10px;
`;

 Div1 = styled.div`
  margin: 10px;
`;

 Ip = styled.input`
width: 100%;
height: 40px;
font-size: 16px;
border-radius: 0.313rem;
border: 1px solid #efefef; 
outline: none; 
background-color: #ffffff;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-bottom: 10px;
text-align: left;
color: #000000;
&:focus {
    border-color: #efefef; 
    background-color: #ffffff;
}
`;
 ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #ffffff;
`;

 SaveButton = styled.button`
  width: 45%;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

 LoadButton = styled.button`
  width: 45%;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;


}

export class NoticeStyle {

   Se0 = styled.div`
  display: flex;
  background-color: #FFFFFF;
  margin: 0.625rem;
  border-radius: 5px;
  align-items: center;
`;

 Div0 = styled.div`
  flex: 1 1 5%;
  text-align: center;
  font-size: 10px;
`;

 Div1 = styled.div`
  flex: 1 1 80%;
  justify-content: center;
  margin: 10px;
`;


 Div1_2 = styled.div`
  font-size: 16px;
  padding:12px 6px 6px 0px;
  font-weight: bold;
`;

 Div1_3 = styled.div`
  font-size: 10px;
  padding: 4px 0px 4px 0px;
  font-weight: thin;
`;

 Ic = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 4px 2px #bebebe;
`
}

export class NotificationStyle {


   SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  outline: #efefef;
  background-color: #d9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem 0.625rem 0 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
`;

 Se0 = styled.div`
  display: flex;
  background-color: #FFFFFF;
  margin: 0.625rem;
  border-radius: 5px;
  align-items: center;
`;

 Div0 = styled.div`
  flex: 1 1 15%;
  text-align: center;
  font-size: 25px;
`;

 Div1 = styled.div`
  flex: 1 1 80%;
  justify-content: center;
`;

 Div1_1 = styled.div`
  font-size: 18px;
  padding: 12px 6px 6px 0px;
  font-weight: thin;
`;

 Div1_2 = styled.div`
  font-size: 12px;
  padding: 4px 6px 4px 0px;
  font-weight: bold;
`;

 Div1_3 = styled.div`
  font-size: 10px;
  padding: 4px 0px 4px 0px;
  font-weight: thin;
`;

}

export class PostcodeinputStyle {
   Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 97%;
  background-color: #ffffff;
  padding: 1.125rem;
  margin: 0.313rem;
`;

 Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 7.5rem;
`;

 ReqFont = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

 Divfont = styled.div`
  font-size: var(--font-small);
  margin-bottom: 10px;
  margin-top: 10px;
`;

 Divfont1 = styled(this.Divfont)`
    flex : 1 1 30%;
      margin-top: 10px;
`;

 Divfont2 = styled(this.Divfont)`
    flex : 1 1 70%;
      margin-top: 10px;
`;

 Div0 = styled.div`
    display:flex;
`;

 DivName = styled.div`
    flex: 1 1 30%;
    padding-right: 10px;
`;

 Divcall = styled.div`
    flex: 1 1 25%;
    padding-right: 10px;
    justify-content: space-between;
`;

 Divcall1 = styled.div`
    flex: 1 1 22%;
`;

 Ip = styled.input`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */
    background-color: #efefef;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin: 0.313rem 0 0.313rem 0;
    text-align: left;
    color: #a6a6a6;
    
    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;
}

export class ProfilesettingStyle {
   Topdiv = styled.div`
  display: flex;
  padding: var(--padding);
  color: var(--black-color);
  justify-content: center;
`;

 Topimg = styled.img`
  margin: 10px;
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: #ffffff;
`;

 Hr = styled.hr`
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  height: 0.063rem;
  border: 0;
  background: #efefef;
`;
 Set_div = styled.div`
  display: flex;
  flex-direction:column;
  font-size: 14px;
  font-weight: bold;
  margin: 0.563rem;
  padding: 14px;
  border-radius: 0.313rem;
  border: 0rem;
  background-color: var(--white-color);
`;

 Set_div_top = styled(this.Set_div)`
  display: flex;
  flex-direction:column;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0.563rem;
  padding: 14px;
  border-radius: 0.313rem 0.313rem 0 0;
  border: 0rem;
  background-color: var(--white-color);
`;

 Set_div_mid = styled(this.Set_div)`
    border-radius: 0;
    margin: 0 0.563rem;
`;

 Set_div_bot = styled(this.Set_div)`
  border-radius: 0px 0px 0.313rem 0.313rem;
  margin: 0 0.563rem;
  margin-bottom: 0.375rem;
`;

 Set_span = styled.div`
    margin-top: 8px;
    font-size: 12px;
    font-weight: normal;
`;

 Div1 = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
`;

 Em = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
`;

 Ic = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

 Ip = styled.input`
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: left;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

 Ip1 = styled.input`
width: 110px;
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

 Ip2 = styled.input`
width: 110px;
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;
}

export class Search_DetailStyle {
   Circle = styled.div`
  display: inline-block;
  margin: 0 3px;
  width: 10px;
  height: 10px;
  background: #0047ff;
  border-radius: 50em;
  margin-bottom: 10px;
`;

 Div0 = styled.div`
  position: fixed;
  top: 80px;
  left: 20px;
`;

 Div0_1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
`;

 Div1 = styled.div`
  margin: 20px 10px 10px 40px;
`;

 Div1_1 = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

 Div1_2 = styled(this.Div1_1)`
  font-size: 16px;
  font-weight: normal;
  margin-top: 10px;
  color: #9c9c9c;
`;

 Div2 = styled.div`
  margin: 0px 10px 30px 40px;
`;

 Se0 = styled.section`
  padding: 0 24px 0 24px;
`;

 Div3 = styled.div`
  display: flex;
  background-color: #efefef;
  border-radius: 5px;
`;

 Div4 = styled(this.Div3)`
  margin-top: 5px;
`;

 Div4_1 = styled(this.Div4)`
  justify-content: space-between;
`;

 Div5 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 80px 10px 0px 10px;
  font-size: 20px;
  color: #0d6efd;
  font-weight: bold;
  text-align: center;
`;

 Divpo = styled.div`
  position: relative;
`;

 Div3_1 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #909090;
`;

 Div3_2 = styled.div`
  padding: 16px;
`;

 Div3_1_1 = styled(this.Div3_1)`
  color: #000000;
`;

 Div3_2_1 = styled(this.Div3_2)`
  padding: 16px 0 16px 0;
`;

 Div5_1 = styled.div`
  font-size: 12px;
  color: #929292;
  font-weight: bold;
  padding-top: 10px;
`;

 SelectInput = styled.select`
  border: none;
  background-color: #efefef;
  text-align: center;
  color: #000000;
  font-weight: bold;
  font-size: 14px;
  margin-right: 20px;
`;


 Margin_1 = styled.section`
  position: fixed;
  bottom: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
`
}

export class SearchStyle {
   Se0 = styled.section`
  position: fixed;
  bottom: 3.875rem;
  background-color: #f5f5f5;
  width: 100%;
  border-radius: 25px 25px 0 0;
`;

 Hr0 = styled.hr`
  margin: 10px auto;
  border-top: 1px solid;
  width: 10%;
  text-align: center;
`;

 Div0 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 5px 10px 5px;
`;

 Div0_1 = styled.div`
  display: flex;
  margin: 0 5px;
  width: 65px;
  height: 40px;
  background-color: var(--white-color);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: var(--font-md1);
  font-weight: bold;
`;

 Div1 = styled.div`
  display: flex;
  background-color: var(--white-color);
  padding: 10px;
`;

 Dvi1_1 = styled.div`
  display: flex;
  flex: 1 1 25%;
  justify-content: center;
  font-size: var(--font-md1);
  font-weight: bold;
`;

 Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

 Div1_2 = styled(this.Dvi1_1)`
  font-size: 16px;
  align-items: center;
  flex-direction: column;
`;

 Sp0 = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

}

export class ShowOrdersStyle {

   SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  outline: #efefef;
  background-color: #d9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem 0.625rem 0 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
`;

 Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

 Sc0 = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.563rem 0.563rem 0.563rem 0.563rem;
  border-radius: 0.313rem;
  border: 0rem;
  background-color: var(--white-color);
`;

 Divhid = styled(this.Div0)`
  height: 3.875rem;
`;

 Sc1 = styled(this.Sc0)`
  margin: 0.563rem 0.563rem 0.563rem 0.563rem;
  justify-content: center;
  height: 3rem;
`;

 Divwallet = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-small);
  font-weight: bold;
  margin-left: 0.75rem;
`;

 Sp0 = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

 Spwallet = styled.div`
  margin-left: auto;
  margin-right: 0.625rem;
  font-size: var(--font-md);
`;

 Bticon = styled.button`
  border: none;
  background-color: var(--white-color);
  margin-right: 0.625rem;
`;

 Bticonimg = styled.img`
  width: 1.875rem;
`;

 Divimg = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

 LoadingImg = styled.img`
  width: 300px;

  margin-top: 200px;
`;

}

export class TopBarChatStyle {
   Tdiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: var(--padding);
  background-color: var(--white-color);
  color: var(--black-color);
  height: 3.875rem;
  z-index: 1;
`;

 Divhid = styled.div`
  display: flex;
  padding: 18px 12px 16px 30px;
  height: 3.875rem;
`;

 Tbt = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: var(--font-large);
`;

 Tbtleft = styled(this.Tbt)`
  justify-content: left;
  width: 1.375rem;
  font-weight: bold;
`;

 Tbhome = styled(this.Tbt)`
  margin-left: auto;
  margin-right: 0.625rem;
`;

 Tbsp = styled.div`
  font-size: var(--font-md);
  font-weight: bold;
  margin-top: 0.125rem;
  margin-left: 0.313rem;
`;
 Div0_1 = styled.div`
padding: 1rem 0.75rem 1rem 1rem;
`;

 StateDiv = styled(this.Div0_1)`
display: flex;
border-radius: 1.25rem;
border-color: #5843f5;
width: 3.75rem;
height: 1.438rem;
justify-content: center;
padding: 0;
color: #5843f5;
font-weight: bold;
`;
}

export class TopBarOthersStyle {
   Tdiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: var(--padding);
  background-color: var(--white-color);
  color: var(--black-color);
  height: 3.875rem;
  z-index: 1;
`;

 Divhid = styled.div`
  display: flex;
  padding: 18px 12px 16px 30px;
  height: 3.875rem;
`;

 Tbt = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: var(--font-large);
`;

 Tbtleft = styled(this.Tbt)`
  justify-content: left;
  width: 1.375rem;
  font-weight: bold;
`;

 Tbhome = styled(this.Tbt)`
  margin-left: auto;
  margin-right: 0.625rem;
`;

 Tbsp = styled.div`
  font-size: var(--font-md);
  font-weight: bold;
  margin-top: 0.125rem;
  margin-left: 0.313rem;
`;

}

export class TopBarthinStyle {
   Tdiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: var(--padding);
  background-color: var(--white-color);
  color: var(--black-color);
  height: 3.875rem;
  z-index: 1;
`;

 Divhid = styled.div`
  display: flex;
  padding: 18px 12px 16px 30px;
  height: 3.875rem;
`;

 Tbt = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: var(--font-large);
`;

 Tbtleft = styled(this.Tbt)`
  justify-content: left;
  width: 1.375rem;
  font-weight: thin;
`;

 Tbhome = styled(this.Tbt)`
  margin-left: auto;
  margin-right: 0.625rem;
  font-size: var(--font-md1);
`;

 Tbsp = styled.div`
  font-size: 14px;
  font-weight: thin;
  margin-top: 2.5px;
  margin-left: 0.313rem;
`;


}