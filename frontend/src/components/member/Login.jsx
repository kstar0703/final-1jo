import React from 'react';
import styled from 'styled-components';

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
    return (
    <>

    function login(e) {
        () => {

        }
        
    }

        <StyledLoginDiv>
            <div>
                <h1>로그인</h1>
                <img src="\resources\logo.svg" alt="logo" />
            </div>

            <div>
                <form action="">
                    <input type="text" name='phone' placeholder='전화번호'/>
                    <br />
                    <input type="password" name='pwd' placeholder='패스워드'/>
                    <div>
                    <input type="checkbox" name="" id="check" />
                    <label for="check">아이디 기억하기</label>
                    </div>
                </form>
            </div>


            <div>
                <div>
                    <button>로그인</button>
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
