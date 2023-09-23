import { SetStateAction, useEffect, useRef, useState } from "react"
import type { RoomInterface } from "./interface/RoomInterface"
import Handler from "../../lib/Handler"
import getName from "./getName"
import styled from "styled-components"
import BottomBar from "../BottomBar"
import Time from "../../lib/Time"
import { useConnWalletInfo } from "../../App"
import { RoomStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, StateDiv, Sp0, Sp1, Sp2, Img0} = new RoomStyle()

const Chatman = require('../../image/Chatman.png')
const operator = require('../../image/operator.png')

export default function ({ setStates, orderNum, blockchainElement, role }: RoomInterface) {
    const { address } = useConnWalletInfo();
    const roomComponent = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [opponentName, setOponentName] = useState("");
    const [time ,setTime] = useState("");

    const getRecentMessage = async () => {
      
      const recentMessageInfo = await Handler.get(process.env.REACT_APP_SERVER_URL + `room/message/?orderNum=${orderNum}`)
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
            setStates.setRole(role)
            setStates.setIsRoomClicked(true);
            setStates.setSelectedOrderNum(orderNum);
          }}
        >
        <Div0>
          <Div1>
            <Img0 src={Chatman}></Img0>
          </Div1>
          <Div2>
            <Sp0>
            {opponentName} <StateDiv>{`${role}`}</StateDiv> <Sp1>{time}</Sp1>
            </Sp0>
            <Sp2>{message}</Sp2>
          </Div2>
        </Div0>
        </div>
        <BottomBar></BottomBar>
      </>
    );
}


