export interface ChatInterface {
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
