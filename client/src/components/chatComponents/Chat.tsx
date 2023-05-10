import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useAccount } from "wagmi";
import { ChatInterface } from "./interface/ChatInterface";
import getName from "./getName";
import { getOrder } from "../../utils/ExecuteOrderFromBlockchain";
import Kakao from "../../lib/Kakao";
import Handler from "../../lib/Handler";

export default function ({ roomName, realAddress, phoneNumbers } : ChatInterface) {
    const inputbox = useRef<HTMLInputElement>(null);
    const messageDiv = useRef<HTMLDivElement>(null);
    const [socketId, setSocketId] = useState<String>();
    // const [blockChainData, setBlockChainData] = useState<any>(undefined);
    const [opponentName, setOponentName] = useState<string>("");
    const [senderPhoneNumber, setSenderPhoneNumber] = useState();
    const [senderAddress, setSenderAddress] = useState();
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState();
    const [receiverAddress, setReceiverAddress] = useState();
    
    const { address } = useAccount()

    // 이벤트 처리
    const addMessage = (message: string) => {
        console.log(message)
        const div = messageDiv.current
        const text = document.createElement("div");
        text.innerText = "채팅 메세지 : "+message;
        if (div !== null) {
            div.appendChild(text)
        }
    };

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit("sendMessage", { data: inputbox.current!.value, sender: address }, () => {
            addMessage(inputbox.current!.value);
            inputbox.current!.value = "";
        });
    };

    const joinRoom = (roomId: number) => {
        socket.emit("joinRoom", { roomName: roomId });
    }

    const loadMessages = (messages: any[]) => {
        for (let index = 0; index < messages.length; index++) {
            const element = messages[index];
            addMessage(element.message)
        }
    }

    const getRealLocation = async (location : any ) => {
        const realAddress = await Kakao.reverseGeoCording(location.Y, location.X) as any;
        if (realAddress !== undefined ) {
            return realAddress.address_name    
        }
    }

    useEffect(() => {
       ( async () => {
            if((roomName !== undefined) && (address !== undefined)) {
                joinRoom(roomName)
                const blockChainOrder = await getOrder((String)(roomName))
                getName({ blockchainElement : blockChainOrder, address : address, setState : setOponentName })  
                const roomInfo = await Handler.post({orderNum : roomName} , process.env.REACT_APP_SERVER_URL + "getRoomInfo")

                if ((roomInfo.Recipient.PHONE !== undefined) && (roomInfo.Recipient.PHONE !== null)) {
                    setReceiverPhoneNumber(roomInfo.Recipient.PHONE)
                }
                if ((roomInfo.Sender.PHONE !== undefined) && (roomInfo.Sender.PHONE !== null)) {
                    setSenderPhoneNumber(roomInfo.Sender.PHONE)
                } 
                if ((roomInfo.Recipient.Destination !== undefined) && (roomInfo.Recipient.Destination !== null) && (roomInfo.Sender.Departure !== undefined) && (roomInfo.Sender.Departure !== null)) {
                    const realDepartureAddress =  await getRealLocation(roomInfo.Sender.Departure)
                    const realDestinationAddress = await getRealLocation(roomInfo.Recipient.Destination)
                    setSenderAddress(realDepartureAddress)
                    setReceiverAddress(realDestinationAddress)
                }
            }
        })()
    }, []);

    useEffect(() => {
        if(opponentName !== "") {
            console.log(opponentName)
        }
    }, [opponentName]);

    useEffect(() => {
        socket.on("connect", () => setSocketId(socket.id))
        socket.on("joinRoom", joinRoom)
        socket.on("sendMessage", addMessage);
        socket.on("loadMessage", loadMessages)
    }, [socket]);

    useEffect(() => {
        if (socketId !== undefined) {
            console.log(socketId)
        }
    }, [socketId]);

    

    return (
        <>
        
            상대방 이름  : {opponentName}<br></br>
            수취인 주소 : {receiverAddress}<br></br>
            수취인 전화번호 : {receiverPhoneNumber}<br></br>
            발송인 주소 : {senderAddress}<br></br>
            발송인 전화번호 : {senderPhoneNumber}<br></br>
            <br></br><br></br>
            <div>
                
            </div>
            <>
                <div ref={messageDiv}>
                </div>
                <form onSubmit={sendMessage} action="">
                    <input ref={inputbox} type="text" />
                    <button type="submit" >전송</button>
                </form>
            </>
        </>
    )
}

