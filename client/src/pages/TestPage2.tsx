import GetOrderContents from "../components/GetOrderContents"
// import IncreaseAllowance from "../components/IncreaseAllowance"

// type AddressProps = {
//     address: `0x${string}`;
//   };

export default function TestPage2() {
    const orderNum = '3'
    return(<>
    <GetOrderContents orderNum={orderNum}></GetOrderContents>
    
    </>)
}