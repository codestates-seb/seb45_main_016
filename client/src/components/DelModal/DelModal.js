import React from 'react';
import { DelModalContainer, Container } from './DelModalStyle';

// eslint-disable-next-line react/prop-types
const DelModal = ({ isOpen, onCancel, onConfirm, warningMessage }) => {
  if (!isOpen) return null;

  return (
    <DelModalContainer className="modal">
      <Container className="modal-content">
        <h2>
          😢
          <br />
          정말 탈퇴 하시겠어요?
        </h2>
        <p>{warningMessage}</p>
        <button className="noBtn" onClick={onCancel}>
          남아있을게요
        </button>
        <button className="yesBtn" onClick={onConfirm}>
          네,탈퇴할래요
        </button>
      </Container>
    </DelModalContainer>
  );
};

export default DelModal;
