import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 80%;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  position: absolute;
    right: 27%;
    top: 39%;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalImg = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    // 모달이 열릴 때 body의 overflow를 "hidden"으로 설정
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body의 overflow를 "auto"로 설정
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 언마운트될 때 cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        <ModalImg src={imageUrl} alt="Modal Image" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
