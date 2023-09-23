import styled from "styled-components";
import { MessageInfoForComponent } from "./interface/MessageComponentInfo";
import TimeParser from "../../lib/TimeParser";
import { OtherMessageStyle } from "../../StyleCollection";

const {Div, DivChat, Divclock, Img} = new OtherMessageStyle()

export default function OtherMessageTemplate ({message , date} : MessageInfoForComponent) {

  const time = TimeParser(date)

    return (
    <Div>
      <Img src={Chatman}></Img>{" "}
      <DivChat>
        <span>{message}</span>
      </DivChat>{" "}
      <Divclock>{time}</Divclock>
    </Div>
  );
};

const Chatman = require("../../image/Chatman.png");

