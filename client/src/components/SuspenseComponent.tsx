import Lottie from "lottie-react";
import { Suspense } from "react"
import mainLoading from "../Lottie/mainLoading.json"
import styled from "styled-components";

const SuspenseComponent = ({ component }: {component: JSX.Element}) => {
    return(
      <>
        <Suspense fallback={<LotDiv><Lottie animationData={mainLoading} /></LotDiv>}>
          {component}
        </Suspense>
      </>
    )
  }

export default SuspenseComponent;

const  LotDiv = styled.div`
position: absolute;
width: 100px;
top: 45%;
left: 50%;
transform: translate(-50%, -50%);
`;
