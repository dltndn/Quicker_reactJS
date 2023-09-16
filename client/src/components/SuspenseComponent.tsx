import Lottie from "lottie-react";
import { Suspense } from "react"
import mainLoading from "../Lottie/mainLoading.json"

const SuspenseComponent = ({ component }: {component: JSX.Element}) => {
    return(
      <>
        <Suspense fallback={<Lottie animationData={mainLoading} />}>
          {component}
        </Suspense>
      </>
    )
  }

export default SuspenseComponent