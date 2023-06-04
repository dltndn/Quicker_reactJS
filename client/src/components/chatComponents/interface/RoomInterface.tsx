export interface RoomInterface {
    setStates : setStates
    orderNum: number
    blockchainElement : any
}

interface setStates {
    setSelectedOrderNum: React.Dispatch<React.SetStateAction<number | undefined>>
    setIsRoomClicked: React.Dispatch<React.SetStateAction<boolean>>
}

