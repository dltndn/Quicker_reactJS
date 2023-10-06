import { MessageInfo } from "./MessageInfo";

export interface MessageInfoForComponent {
    message: string,
    date: string
}

export interface INftFetchingComponent {
    params : {
        messageData: MessageInfo[],
        address: string | undefined,
        oponentAddress: string,
    }
}