import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useAccount } from "wagmi";

export default function (data : any) {
    const inputbox = useRef<HTMLInputElement>(null);
    const messageDiv = useRef<HTMLDivElement>(null);
    const [isRoomClicked, setIsRoomClicked] = useState(false);
    const [socketId, setSocketId] = useState<String>();
    const { address } = useAccount();

    // 이벤트 처리
    const addMessage = (message: string) => {
        console.log(message)
        const div = messageDiv.current
        const text = document.createElement("div");
        text.innerText = message;
        if(div !== null) {
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

    const joinRoom = (roomId : number) => {
        socket.emit("joinRoom", { roomName : roomId });
    }

    const loadMessage = (messages : any []) => {
        for (let index = 0; index < messages.length; index++) {
            const element = messages[index];
            addMessage(element.message)    
        }
        
    }

    useEffect(() => {
        socket.on("connect", () => setSocketId(socket.id))
        socket.on("joinRoom", joinRoom)
        socket.on("sendMessage", addMessage);
        socket.on("loadMessage", loadMessage)
    }, [socket]);

    useEffect(() => {
        if (socketId !== undefined) {
            console.log(socketId)
        }
    }, [socketId]);

    return (
        <>
            {!isRoomClicked ? <div onClick={() => { setIsRoomClicked(true)
            joinRoom(parseInt(data.roomData.orderNum))
            
            }}>
                채팅방 영역
            </div> :
                <>
                    채팅 테스트
                    <div ref={messageDiv}>
                    </div>
                    <form onSubmit={sendMessage} action="">
                        <input ref={inputbox} type="text" />
                        <button type="submit" >전송</button>
                    </form>
                </>
            }
        </>
    )
}

            