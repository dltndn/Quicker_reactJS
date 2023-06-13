import React, { useState, useEffect, ChangeEvent, useRef  } from "react";
import styled from "styled-components";
import BottomConfirmBtn from "../bottomconfirmBtn";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useExecutionState } from "../../pages/ExecutionPage";
import WaitClientConfirm from "./WaitClientConfirm";
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { useAccount } from "wagmi";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";

const Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

const Sp0 = styled.span`
margin: 10px 0 10px 0;
font-size: var(--font-md1);
font-weight: bold;
`;

export default function RemoteDelivery({ orderNum }: ExecutionComponentProps) {
  const { setShowComponent } = useExecutionState()
  const { address } = useAccount()
  const [file, setFile] = useState<File | null | undefined>(undefined);
    const fileInput = useRef<HTMLInputElement>(null);
    
    const handleDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      fileInput.current?.click(); 
    };
    
    const imageChange = () => {
      if (fileInput.current?.files !== null) {
        setFile(fileInput.current?.files[0])
      }
    }

    const postImage = async () => {
      const formData = new FormData();

      if (file !== null && file !== undefined && orderNum !== undefined) {
          formData.append('uploadImage', file);
          formData.append('orderNum', orderNum);
          const response = await fetch(process.env.REACT_APP_SERVER_URL + "order-complete-image", {
              method: 'POST',
              body: formData,
          })
          const message = await response.json()
          if (message.msg === "done") {
              alert("전송완료")
          }
      } else {
          alert("사진이 없습니다.")
      }
  }  

    const deliveredRogic = async () => {
      if (orderNum !== undefined) {
          const wttb = new WriteTransactionToBlockchain(orderNum)
          const sdta = new SendDataToAndroid(address)
          try {
              const result = await wttb.deliveredOrder()
              console.log(result)
              // 배송원 수행 중인 오더 확인 후 false값 전송
              if (!(await checkIsDelivering(address))) {
                  sdta.sendIsDelivering(false)
              }
              // 배송원 사진 업로드 로직 작성
              await postImage()
              setShowComponent(<WaitClientConfirm />)
          } catch(e) {
              console.log(e)
          }
      }
  }

    return(
      <>
        <Div0 onClick={handleDivClick}>
          <input ref={fileInput} onChange={imageChange} type="file" name="uploadImage" accept="image/png, image/jpeg, image/jpg" capture="environment" style={{ display: 'none' }} />
          {(file !== null && file !== undefined) ? (
            <div>
              <img src={URL.createObjectURL(file)} alt="uploaded photo"  width="100%" />
            </div>
          ) : <Sp0>위탁장소에 배송된 사진을 촬영해주세요.</Sp0>}
        </Div0>
        <BottomConfirmBtn
                content="확인"
                confirmLogic={ () => {
                    deliveredRogic();
                }} isDisabled={false}
            />
      </>
    )
}