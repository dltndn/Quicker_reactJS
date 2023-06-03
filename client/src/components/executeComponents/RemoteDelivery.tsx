import React, { useState, useEffect, ChangeEvent, useRef  } from "react";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";

const Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

const Sp0 = styled.span`
margin: 10px 0 10px 0;
font-size: var(--font-md1);
font-weight: bold;
`;

interface RemoteDelivery extends ExecutionComponentProps{
  state : File | null | undefined,
  setState : React.Dispatch<React.SetStateAction<File | null | undefined>>,
}

export default function RemoteDelivery({ state, setState, orderNum }: RemoteDelivery) {
    const fileInput = useRef<HTMLInputElement>(null);
    
    const handleDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      fileInput.current?.click(); 
    };
    
    const imageChange = () => {
      if (fileInput.current?.files !== null) {
        setState(fileInput.current?.files[0])
      }
    }

    return(
      <>
        <Div0 onClick={handleDivClick}>
          <input ref={fileInput} onChange={imageChange} type="file" name="uploadImage" accept="image/png, image/jpeg" capture="environment" style={{ display: 'none' }} />
          {(state !== null && state !== undefined) ? (
            <div>
              <img src={URL.createObjectURL(state)} alt="uploaded photo"  width="100%" />
            </div>
          ) : <Sp0>위탁장소에 배송된 사진을 촬영해주세요.</Sp0>}
        </Div0>
      </>
    )
}