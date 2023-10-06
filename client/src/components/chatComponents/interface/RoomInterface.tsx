export interface RoomInterface {
    setStates : setStates
    orderNum: number
    role : string
    blockchainElement : any
    oponentAddress : string
}

interface setStates {
    setSelectedOrderNum: React.Dispatch<React.SetStateAction<number | undefined>>
    setIsRoomClicked: React.Dispatch<React.SetStateAction<boolean>>
    setRole : React.Dispatch<React.SetStateAction<string>>
}

