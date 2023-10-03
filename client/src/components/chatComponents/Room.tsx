/* eslint-disable import/no-anonymous-default-export */
import { SetStateAction, useEffect, useRef, useState } from "react"
import type { RoomInterface } from "./interface/RoomInterface"
import Handler from "../../lib/Handler"
import getName from "./getName"
import BottomBar from "../BottomBar"
import Time from "../../lib/Time"
import { useConnWalletInfo } from "../../App"
import { RoomStyle } from "../../StyleCollection";
import { getNftImgPath } from "../../utils/CalAny"

const {Div0, Div1, Div2, StateDiv, Sp0, Sp1, Sp2, Img0} = new RoomStyle()

export default function ({ setStates, orderNum, blockchainElement, role, oponentAddress }: RoomInterface) {
    const { address } = useConnWalletInfo();
    const roomComponent = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [opponentName, setOponentName] = useState("");
    const [time ,setTime] = useState("");
    const [nftImgPath, setNftImgPath] = useState(getNftImgPath("404"))

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

    const getNftImagePath = async () => {
      const { imageId } = await Handler.get(`${process.env.REACT_APP_SERVER_URL}user/image/id/?walletAddress=${oponentAddress}`)
      const path = getNftImgPath(imageId)
      setNftImgPath(path)
    }

    useEffect(() => {
        (async () => {
            if (address !== undefined) {
                getName({ blockchainElement: blockchainElement, address: address, setState: setOponentName })
                getRecentMessage()
            }
        })()
        getNftImagePath()
        return () => {
          setNftImgPath(getNftImgPath("404"))
        }
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
            <Img0 src={nftImgPath}></Img0>
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


