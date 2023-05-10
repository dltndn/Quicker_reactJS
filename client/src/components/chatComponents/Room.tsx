import { SetStateAction, useEffect, useRef, useState } from "react"
import type { RoomInterface } from "./interface/RoomInterface"
import Handler from "../../lib/Handler"
import { useAccount } from "wagmi"
import getName from "./getName"

export default function ({ setStates, orderNum, blockchainElement }: RoomInterface) {
    const { address } = useAccount();
    const roomComponent = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState("");
    const [opponentName, setOponentName] = useState("");

    const getRecentMessage = async () => {
        const chatRoom = await Handler.post({ orderNum: orderNum }, process.env.REACT_APP_SERVER_URL + "getRecentMessage")
        if (chatRoom.recentMessage !== undefined) {
            setMessage(chatRoom.recentMessage)
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
            <div ref={roomComponent} onClick={() => {
                setStates.setIsRoomClicked(true)
                setStates.setSelectedOrderNum(orderNum)
            }}>
                채팅방 영역
                <br></br>
                이름 : {opponentName}
                <br></br>
                최근 메세지 : {message}
            </div>
            <br></br>
        </>
    )
}

