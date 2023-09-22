import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPaperAirplane } from 'react-icons/hi2';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Notice_writeStyle } from "../StyleCollection";

const {EditorWrapper, Div1, Ip, ButtonWrapper, LoadButton, SaveButton} = new Notice_writeStyle()


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
