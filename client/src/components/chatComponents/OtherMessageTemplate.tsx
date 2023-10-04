import styled from "styled-components";
import { MessageInfoForComponent } from "./interface/MessageComponentInfo";
import TimeParser from "../../lib/TimeParser";
import { OtherMessageStyle } from "../../StyleCollection";

const {Div, DivChat, Divclock, Img} = new OtherMessageStyle()

interface OtherMessageInfoForComponent extends MessageInfoForComponent {
  nftImgPath : string;
}

export default function OtherMessageTemplate ({message , date, nftImgPath} : OtherMessageInfoForComponent) {

  const time = TimeParser(date)

    return (
    <Div>
      <Img src={nftImgPath}></Img>{" "}
      <DivChat>
        <span>{message}</span>
      </DivChat>{" "}
      <Divclock>{time}</Divclock>
    </Div>
  );
};

const Chatman = require("../../image/Chatman.png");

