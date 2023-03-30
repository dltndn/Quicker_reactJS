import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client"; // Client Socket

export default () => {

  const inputbox = useRef<HTMLInputElement>(null);
  // const ul = useRef(null);
  
  const addMessage = (message : string) => {
    const ul = document.querySelector("ul")
    const li = document.createElement("li");

    console.log(message)
    li.innerText = message;
    ul!.appendChild(li);
  };

  
  const socket = io("http://localhost:9001", {
    // @ts-ignore
    cors: {
      origin: "*",
    },
  });

  socket.on("sendMessage", (message) => {
    addMessage(message)
  });

  const sendMessage = () => {
    // event.preventDefault();
    socket.emit("sendMessage", { data: inputbox.current!.value }, () => {
      addMessage(inputbox.current!.value);
      inputbox.current!.value = "";
    });
  };


  return (
    <div>
      test socket.io
      <ul>
      </ul>
      <input ref={inputbox} type="text" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
