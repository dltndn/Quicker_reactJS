import styled from "styled-components";
import { MessageInfoForComponent } from "./interface/MessageComponentInfo";
import TimeParser from "../../lib/TimeParser";
import { MyMessageStyle } from "../../StyleCollection";

const {Div1, DivChat, Divclock} = new MyMessageStyle()


export default function MyMessageTemplate({ message, date } : MessageInfoForComponent) {

    const time = TimeParser(date)

    return (
        <Div1>
            <Divclock>{time}</Divclock>
            <DivChat>
                <span>{message}</span>
            </DivChat>
        </Div1>
    )
};

