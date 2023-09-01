import { Suspense } from "react"

const SuspenseComponent = ({ component }: {component: JSX.Element}) => {
    return(
      <>
        <Suspense fallback={<div>Loading...</div>}>
          {component}
        </Suspense>
      </>
    )
  }

export default SuspenseComponent