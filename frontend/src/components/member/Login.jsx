import React from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';

const StyledLoginDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color:  #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & >div:first-child{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 50px;
    }





    
  
   
 
  
`
const Login = () => {

    let loginMemberVo = {};

   //전화번호
    const [phoneNumber, setPhoneNumber] = useState('');

    const phone = useRef();
    const pwd = useRef();

    //하이픈 추가함수
    const autoHyphen2 = (target) => {
        target.value = target.value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
          .replace(/(\-{1,2})$/, "");
        setPhoneNumber(target.value);
      }



 

        function clickLogin(){
                
             loginMemberVo = { 
              phone : phone.current.value,
              pwd : pwd.current.value
            } 

            console.log(loginMemberVo)
          

            fetch("http://127.0.0.1:8080/app/member/login",{
                method: "post",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(loginMemberVo),
            })
            .then( (resp) => {
                return resp.json()})
            .then( (data)=>{
                if(data.staut==="good"){
                    alert("로그인 성공!")
                    sessionStorage.setItem("loginMemberVo", JSON.stringify(data.loginMemberVo));
                }else{
                    alert("로그인 실패")
                    return;
                }
            })

            

            







         

        

       
     }
 



  
    return (
    <>
        <StyledLoginDiv>
            <div>
                <h1>로그인</h1>
                <img src="\resources\logo.svg" alt="logo" />
            </div>

            <div>
                <form action="">
                    <input type="text" name='phone' placeholder="예) 010-1234-5678" ref={phone}  maxLength="13" onInput={(e) => autoHyphen2(e.target)}  />
                    <br />
                    <input type="password" name='pwd' placeholder='패스워드' ref={pwd}/>
                    <div>
                    <input type="checkbox" name="" id="check" />
                    <label for="check">아이디 기억하기</label>
                    </div>
                </form>
            </div>


            <div>
                <div>
                    <button onClick={clickLogin}>로그인</button>
                </div>
                <div>
                    <span >비밀번호 찾기 </span>
                    <span>회원가입</span>
                </div>

            
            </div>

            <div>
                [카피라이트 어쩌구 이미지 추가]
            </div>

            
        </StyledLoginDiv>
    </>
    );
};

export default Login;
