export interface RoomInterface {
    setStates : setStates
    orderNum: number
    role : string
    blockchainElement : any
}

interface setStates {
    setSelectedOrderNum: React.Dispatch<React.SetStateAction<number | undefined>>
    setIsRoomClicked: React.Dispatch<React.SetStateAction<boolean>>
}

