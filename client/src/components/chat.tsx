import React, { useEffect, useRef, useState } from "react";
import { socket } from './socket';

export default () => {
  const inputbox = useRef<HTMLInputElement>(null);
  const roomName = useRef<HTMLInputElement>(null);
  const [socketId, setSocketId] = useState<String>();

  // 이벤트 처리
  const addMessage = (message: string) => {
    console.log(message)
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul!.appendChild(li);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("sendMessage", { data: inputbox.current!.value, sender: socketId }, () => {
      console.log(inputbox.current!.value)
      addMessage(inputbox.current!.value);
      inputbox.current!.value = "";
    });
  };

  const joinRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("joinRoom", { roomName : roomName.current!.value }, () => {
      console.log(roomName.current!.value)
      roomName.current!.value = "";
      alert("입장")
    });
  }

  useEffect(() => {
    if (socketId !== undefined) {
      console.log(socketId)
    }
  }, [socketId]);

  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id))
    socket.on("joinRoom", joinRoom)
    socket.on("sendMessage", addMessage);
  }, [socket]);

  return (
    <div>
      채팅 테스트
      <ul>
      </ul>
      <form onSubmit={sendMessage} action="">
        <input ref={inputbox} type="text" />
        <button type="submit" >전송</button>
      </form>
      방 이름
      <form onSubmit={joinRoom} action="">
        <input ref={roomName} type="text" />
        <button type="submit" >전송</button>
      </form>
    </div>
  );
}