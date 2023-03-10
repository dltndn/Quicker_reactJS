import GetOrderContents from "../components/GetOrderContents"
import IncreaseAllowance from "../components/IncreaseAllowance"


export default function TestPage2() {
    const orderNum = '4'
    return(<>
    <GetOrderContents orderNum={orderNum}></GetOrderContents>
    <IncreaseAllowance />
    </>)
}