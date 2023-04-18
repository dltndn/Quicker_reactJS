import ConfirmBtn from "../confirmBtn"
import Dropzone from "react-dropzone";
import { isMobileOnly } from "react-device-detect";
import React, { useState, useEffect, ChangeEvent  } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import styled from "styled-components";


const Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

const Sp0 = styled.span`
margin: 10px 0 10px 0;
font-size: var(--font-md1);
font-weight: bold;
`;

export default function RemoteDelivery() {
    const [file, setFile] = useState<File | null>(null);

    const handleDrop = (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles.find(
        (file) => file.type.includes("image")
      );
      if (imageFile) {
        setFile(imageFile);
      } else {
        alert("Please select an image file.");
      }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const imageFile = Array.from(files || []).find(
          (file) => file.type.includes("image")
        );
        if (imageFile) {
          setFile(imageFile);
        } else {
          alert("Please select an image file.");
        }
      };

  
    const { setTitle } = useExecutionState()

    useEffect(() => {
        setTitle("물품전달")
    }, [])

    return(
        <>
        <div>
      {file && (
        <div>
          <img src={URL.createObjectURL(file)} alt="uploaded photo" />
        </div>
      )}
    </div>
        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" capture={isMobileOnly} />
            <Div0><Sp0>위탁장소에 배송된 사진을 촬영해주세요.</Sp0></Div0>  
          </div>
        )}
      </Dropzone> 
        </>
    )
}