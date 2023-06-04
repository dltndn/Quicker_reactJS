import { SetStateAction, useEffect, useRef, useState } from "react"
import type { RoomInterface } from "./interface/RoomInterface"
import Handler from "../../lib/Handler"
import { useAccount } from "wagmi"
import getName from "./getName"
import styled from "styled-components"
import BottomBar from "../BottomBar"
import Time from "../../lib/Time"

const Chatman = require('../../image/Chatman.png')
const operator = require('../../image/operator.png')

export default function ({ setStates, orderNum, blockchainElement }: RoomInterface) {
    const { address } = useAccount();
    const roomComponent = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [opponentName, setOponentName] = useState("");
    const [time ,setTime] = useState("");

    const getRecentMessage = async () => {
        const recentMessageInfo = await Handler.post({ orderNum: orderNum }, process.env.REACT_APP_SERVER_URL + "getRecentMessageInfo")
        
        const parsedTime = Time.getDiff(recentMessageInfo.date)
        setTime(parsedTime);

        if (recentMessageInfo.message !== undefined) {
            setMessage(recentMessageInfo.message)
        } else {
            setMessage("")
        }
    }

    useEffect(() => {
        (async () => {
            if (address !== undefined) {
                getName({ blockchainElement: blockchainElement, address: address, setState: setOponentName })
                getRecentMessage()
            }
        })()
    }, [])

    return (
      <>
        <div
          ref={roomComponent}
          onClick={() => {
            setStates.setIsRoomClicked(true);
            setStates.setSelectedOrderNum(orderNum);
          }}
        >
        <Div0>
          <Div1>
            <Img1 src={Chatman}></Img1>
          </Div1>
          <Div2>
            <Sp0>
            {opponentName} <Sp1>{time}</Sp1>
            </Sp0>
            <Sp2>{message}</Sp2>
          </Div2>
        </Div0>
        </div>
        <BottomBar></BottomBar>
      </>
    );
}

const Div0 = styled.div`
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

const Div1 = styled.div`
  padding: 5px 10px 5px 10px;
  display: flex;
  flex: 1 1 20%;
`

const Div2 = styled.div`
  display: flex;
  flex: 1 1 80%;
  flex-flow: column;
  justify-content: flex-start;
  text-align: left;
  margin: 0px 10px 0px 10px;

`

const Sp0 = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const Sp1 = styled.span`
  font-size: 8px;
  font-weight: thin;
  color: #929292;
`

const Sp2 = styled(Sp0)`
  font-weight: normal;
`

const Img1 = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`