import GetOrderContents from "../components/GetOrderContents"

export default function TestPage2() {
    const orderNum = '3'
    return(<>
    <GetOrderContents orderNum={orderNum}></GetOrderContents>
    </>)
}