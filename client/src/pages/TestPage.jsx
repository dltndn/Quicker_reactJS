import { useTransaction } from "wagmi";
import { useState, useEffect } from "react";


export default function TestPage() {
    const [hash, setHash] = useState("");
  const { data, isError, isLoading } = useTransaction({
    hash: hash,
  });

  useEffect(()=> {
    console.log("changed hash")
  }, [hash])


  if (isLoading) return <div>Fetching transaction…</div>;
  if (isError) return <div>Error fetching transaction</div>;
  return (<>
  <input
        type="text"
        value={hash}
        style={{ width: "20rem" }}
        placeholder="트잭 해쉬"
        onChange={(event) => setHash(event.target.value)}
      />
      <div>Transaction: {JSON.stringify(data)}</div>
  </> )
  
}
