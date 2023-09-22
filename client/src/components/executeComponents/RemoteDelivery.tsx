import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useExecutionState } from "../../pages/ExecutionPage";
import WaitClientConfirm from "./WaitClientConfirm";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";
import { BsPlusCircle } from "react-icons/bs";
import { useConnWalletInfo } from "../../App";
import SendTxK from "../blockChainTx/SendTxK";
import GetContractParams from "../blockChainTx/GetContractParams";

import { RemoteDeliveryStyle } from "../../StyleCollection";

const {Div0, Div2, Mg0, Sp0} = new RemoteDeliveryStyle()



export default function RemoteDelivery({ orderNum }: ExecutionComponentProps) {
  const { setShowComponent } = useExecutionState();
  const { address } = useConnWalletInfo();
  const [file, setFile] = useState<File | null | undefined>(undefined);

  const fileInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate()

  const handleDivClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    fileInput.current?.click();
  };

  const imageChange = () => {
    if (fileInput.current?.files !== null) {
      setFile(fileInput.current?.files[0]);
    }
  };

  const postImage = async () => {
    const formData = new FormData();

    if (file !== null && file !== undefined && orderNum !== undefined) {
      formData.append("uploadImage", file);
      formData.append("orderNum", orderNum);
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "order/image/complete",
        {
          method: "POST",
          body: formData,
        }
      );
      const message = await response.json();
      if (message.msg === "done") {
        alert("전송완료");
      }
    } else {
      alert("사진이 없습니다.");
    }
  };

  const deliveredRogic = async () => {
    console.log("delivered")
    if (orderNum !== undefined) {
      const sdta = new SendDataToAndroid(address);
      try {
        // 배송원 수행 중인 오더 확인 후 false값 전송
        if (!(await checkIsDelivering(address))) {
          sdta.sendIsDelivering(false);
        }
        // 배송원 사진 업로드 로직 작성
        await postImage();
        navigate("/")
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Div0 onClick={handleDivClick}>
        <input
          ref={fileInput}
          onChange={imageChange}
          type="file"
          name="uploadImage"
          accept="image/png, image/jpeg, image/jpg"
          capture="environment"
          style={{ display: "none" }}
        />
        {file !== null && file !== undefined ? (
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="uploaded photo"
              width="100%"
            />
          </div>
        ) : (
          <Div2>
            {" "}
            <Sp0>
              <BsPlusCircle />
              <br />
              <br />
              사진을 업로드해주세요.
            </Sp0>
          </Div2>
        )}
      </Div0>
      {orderNum && 
      <Mg0>
      <SendTxK param={GetContractParams.DeliveredOrder(orderNum)} successFunc={async() => await deliveredRogic()}/> </Mg0>}
    </>
  );
}

