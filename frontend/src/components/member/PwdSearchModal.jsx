import React,{useState,useRef} from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useHref } from 'react-router-dom';

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
      height: "600px",
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
    gap : 80px;
    padding: 20px;

    & > :nth-child(2)  {
        display: flex;
        gap: 20px;

        & button {
            width: 100px;
        }
    }
    
    .div-btn{
      display: flex;
      align-items: center;
      gap:10px
    }

    .div-btn2{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap:10px;

      & input{
        width: 200px;
        height: 40px;
      }
    }
   `

const PwdSearchModal = ({ isOpen,closeModal}) => {

  const [emailCheck,SetUpdateCheck] =useState(false);

  let phoneRef = useRef();
  let emailRef = useRef();

  const [phoneNumber, setPhoneNumber] = useState('');

  //하이픈 추가함수
  const autoHyphen2 = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/(\-{1,2})$/, "");
    setPhoneNumber(target.value);
  }
    

    let patcherble= true
    const ajaxJava = ()=> {
        
      if(!(phoneRef.current?.value)){
        alert('전화번호를 입력하세요')
        phoneRef.current.focus()
        return
      }
      

     if(!(emailRef.current?.value)){
        alert('이메일을 입력하세요')
        emailRef.current.focus()
        return
      }
      
      if(!patcherble){
          return;
      }
      patcherble =false;

      fetch("http://127.0.0.1:8888/app/member/isEmailInUse",{
          method: "post",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email : emailRef.current.value,
            phone : phoneRef.current.value
          }),
      })
      .then( (resp) => {return resp.json()})
      .then( (data)=>{
          if(data.status==="good"){
              alert('성공')
              emailRef.current.disabled = true;
              phoneRef.current.disabled = true;
              SetUpdateCheck(true)
          }else{
              alert('등록된 이메일이 없습니다')
              
              return;
          }
      })
      .catch()
      .finally( () => {patcherble = true}) 
}





    const issueTempPwd = ()=> {
        
     
      
      if(!patcherble){
          return;
      }
      patcherble =false;

      fetch("http://127.0.0.1:8888/app/member/findPassWord",{
          method: "post",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email : emailRef.current.value,
            phone : phoneRef.current.value
          }),
      })
      .then( (resp) => {return resp.json()})
      .then( (data)=>{
          if(data.status==="good"){
              alert('임시 비밀번호를 발급 했습니다 꼭 비밀번호를 변경해주세요')
             closeModal()
             SetUpdateCheck(false)
          }else{
              alert('발급실패')
              
              return;
          }
      })
      .catch()
      .finally( () => {patcherble = true
      }) 
}



    

  

    return (
        <ReactModal
        isOpen={isOpen}
        style={customModalStyles}
        onRequestClose={closeModal}
      >

      <ModalDiv>
            <h1>비밀번호 찾기</h1>
            
            <h3>아이디와 등록하신 이메일을 입력하세요.</h3>
            <div className='div-btn2'>
             

            <input  type="text" name='phone' placeholder="전화번호 11자리('-'빼고입력)" ref={phoneRef}  maxLength="13" onInput={(e) => autoHyphen2(e.target)}  />
              <input type="text" ref= {emailRef} name="phone" placeholder='이메일 '/>
            </div>
            
            <div className='div-btn'>
              {emailCheck ? 
                <button className='sty02_btn' onClick={issueTempPwd}>임시비밀 번호 발송</button>
                :
                <button className='sty02_btn' onClick={ajaxJava}>이메일 확인</button>

              }
                <button className='sty01_btn' onClick={closeModal}>취소</button>
            </div>
        </ModalDiv>
        
      </ReactModal>
    );
};

export default PwdSearchModal;