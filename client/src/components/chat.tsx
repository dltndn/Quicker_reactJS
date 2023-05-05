import React, { useEffect, useRef, useState } from "react";
import { socket } from './socket';

export default () => {
  
  const inputbox = useRef<HTMLInputElement>(null);
  const [socketId, setSocketId] = useState(socket.id);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // 이벤트 처리
  const addMessage = (message : string) => {
    const ul = document.querySelector("ul")
    const li = document.createElement("li");

    console.log(message)
    li.innerText = message;
    ul!.appendChild(li);
  };

  const sendMessage = () => {
        // event.preventDefault();
    socket.emit("sendMessage", { data: inputbox.current!.value, sender : socketId}, () => {
      console.log(socket.id) 
      addMessage(inputbox.current!.value);
      inputbox.current!.value = "";
    });
  };

  // socket.on("sendMessage" , (message) => {
  //   console.log("w")
  //   const ul = document.querySelector("ul")
  //   const li = document.createElement("li");
  //   li.innerText = message;
  //   ul!.appendChild(li);
  // })
  useEffect(() => {
    if (socketId !== undefined) {
      console.log(socketId)
    }
  }, [socketId]);
  
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    })
    socket.on("sendMessage", (message) => {
      addMessage(message)
    });
  }, [socket]);
  
  return (
    <div>
      채팅 테스트
      <ul>
      </ul>
      <input ref={inputbox} type="text" />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

// // 설정
//   // const socket = io("http://localhost:9001");

//   // 이벤트 처리
//   const addMessage = (message : string) => {
//     const ul = document.querySelector("ul")
//     const li = document.createElement("li");

//     console.log(message)
//     li.innerText = message;
//     ul!.appendChild(li);
//   };

  

//   const sendMessage = () => {
//     // event.preventDefault();
//     socket.emit("sendMessage", { data: inputbox.current!.value }, () => {
//       addMessage(inputbox.current!.value);
//       inputbox.current!.value = "";
//     });
//   };

  
  

//   useEffect(() => {
//     const socket = io("http://localhost:9001");
//     const [isConnected, setIsConnected] = useState(socket.connected);
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on("sendMessage", (message) => {addMessage(message)});
//     return () => {
//       socket.off('connect', onConnect);
//       socket.off("sendMessage")
//       socket.off('disconnect', onDisconnect);
//     };
//   }, []);