import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import ParkingRegister from './ParkingRegister';

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
      width: "80vh",
      height: "80vh",
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
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  

    & > :nth-child(2)  {
        display: flex;
        
        gap: 20px;

        & button {
            width: 100px;
        }
    }  
   `


const ParkingModal = ({ isOpen, closeModal ,title , fecthJava }) => {


    const ajaxJava = async()=> {
        await fecthJava();
       closeModal()

   }

    return (
        <ReactModal
        isOpen={isOpen}
        style={customModalStyles}
        onRequestClose={closeModal}
      >

      <ModalDiv>
            <ParkingRegister/>


            <div>
                <button className='sty02_btn good-div-end' onClick={closeModal}>목록으로</button>
            </div>
        </ModalDiv>
        
      </ReactModal>
    );
};

export default ParkingModal;