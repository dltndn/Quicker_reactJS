import React, { useState, useEffect, ChangeEvent, useRef  } from "react";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { BsPlusCircle } from "react-icons/bs";

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
          ) : <Div5>                <Span01>
          <BsPlusCircle/><br/><br/>
            사진을 업로드해주세요.
          </Span01></Div5>}
        </Div0>
      </>
    )
}

const Div5 = styled.div`
    display: flex;
    height: 500px;
    justify-content: center;
    padding-top: 200px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
`;

const Span01 = styled.div`
  margin: 20px 0 20px;
  font-size: 14px;
  font-weight: bold;
  color: #828282;
`;