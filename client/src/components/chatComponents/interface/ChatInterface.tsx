export interface ChatInterface {
    role : string,
    roomName: number | undefined;
    realAddress: {
        receiver: string
        sender: string
    }
    phoneNumbers: {
        receiver: string
        sender: string
    }
}
