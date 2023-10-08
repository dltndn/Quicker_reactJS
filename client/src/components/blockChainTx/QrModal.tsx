import React, { useEffect } from 'react';
import { QrModalStyle } from "../../StyleCollection";

const { ModalContent, ModalImg, ModalOverlay } = new QrModalStyle();

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

  // 모달 바깥을 클릭할 때 모달을 닫는 이벤트 핸들러
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalContent>
        
        <ModalImg src={imageUrl} alt="Modal Image" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
