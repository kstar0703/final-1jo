import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const customModalStyles = {
    // 여기가 모달창 밖에 부분 처리
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    // 여기가 모달창 안쪽영역 
    content: {
      width: "600px",
      height: "200px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
     
    },
  };
   const ModalDiv =  styled.div`
    
    display: flex;
   `
  

const ModalTest = ({ isOpen, closeModal ,title }) => {
    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customModalStyles}
      >
        <h2>{title}</h2>
        <button onClick={closeModal}>네</button>
        <button onClick={closeModal}>아니요</button>
      </ReactModal>
    );
};

export default ModalTest;