import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPaperAirplane } from 'react-icons/hi2';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorWrapper = styled.div`
  background-color: #ffffff; /* Add white background color */
  border-radius: 5px;
  box-shadow: 0px 4px 2px #bebebe;
  padding: 10px;
`;

const Div1 = styled.div`
  margin: 10px;
`;

const Ip = styled.input`
width: 100%;
height: 40px;
font-size: 16px;
border-radius: 0.313rem;
border: 1px solid #efefef; 
outline: none; 
background-color: #ffffff;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-bottom: 10px;
text-align: left;
color: #000000;
&:focus {
    border-color: #efefef; 
    background-color: #ffffff;
}
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #ffffff;
`;

const SaveButton = styled.button`
  width: 45%;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadButton = styled.button`
  width: 45%;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function Notice_write() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const contentRaw = convertToRaw(content);
    console.log('Notice content (raw):', contentRaw);
  };
  const handleLoad = () => {

    const contentRaw = {
      blocks: [
        {
          key: '6kfs5',
          text: 'Your notice content here',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    };
    const contentState = convertFromRaw(contentRaw);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  };

  return (
    <>
      <GlobalStyle />
      <Div1>
        <Ip placeholder="제목"></Ip>
      <EditorWrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="notice-editor-wrapper"
        editorClassName="notice-editor"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'], 
            inline: {
              options: ['bold', 'italic', 'underline'], 
            },
            blockType: {
              inDropdown: true, 
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'], 
            },
            list: {
              options: ['unordered', 'ordered'], 
            },
          }}
        localization={{
          locale: 'ko',
        }}
      />
      </EditorWrapper>
      <ButtonWrapper>
          <LoadButton onClick={handleLoad}>불러오기</LoadButton>
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </ButtonWrapper>
    </Div1>
      

    </>
  );
}

export default Notice_write;
