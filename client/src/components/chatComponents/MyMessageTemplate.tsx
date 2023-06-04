import styled from "styled-components";
import { MessageInfoForComponent } from "./interface/MessageComponentInfo";
import TimeParser from "../../lib/TimeParser";

export default function MyMessageTemplate({ message, date } : MessageInfoForComponent) {

    const time = TimeParser(date)

    return (
        <Div4>
            <Divclock>{time}</Divclock>
            <DivChat2>
                <span>{message}</span>
            </DivChat2>
        </Div4>
    )
};


const Divclock = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;

const Divdate = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;
const Div3 = styled.div`
  display: flex;
  margin: 10px 10px 10px 15px;
`;
const DivChat = styled.div`
  background-color: #f8f8f8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0px 5px 0px 10px;
  padding: 8px;
`;

const Div4 = styled(Div3)`
  justify-content: flex-end;
`;

const DivChat2 = styled(DivChat)`
  background-color: #79afff;
  color: #ffffff;
`;

