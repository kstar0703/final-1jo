import React from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';


const StyledJoinDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color:  #F5F5F5;
    display: flex;
    align-items: center;
    padding: 100px;
    flex-direction: column;

    & > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 1em;
        gap :10px;
    }

    & > div:nth-of-type(2){
        display: flex;
        flex-direction: column;

        gap : 20px;
        
        & > div {
                display: flex;
                
             
             & > input {
                margin-left: 1em;
                margin-right: 1em;
                padding: 1.1em;
                width: 200px;
             }  

             & > button {
                width: 10em;

                &:hover {
                    background-color: antiquewhite;
                    cursor: pointer;
                }
             }
        }

       
    }
   


    

    




  

`


const Join = () => {

    
    const [phoneNumber, setPhoneNumber] = useState('');
     //하이픈 추가함수
     const autoHyphen2 = (target) => {
        target.value = target.value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
          .replace(/(\-{1,2})$/, "");
        setPhoneNumber(target.value);
      }





    return (
        <StyledJoinDiv>
        <div>
             <img src="\resources\logo.svg" alt="logo" />
             <span>회원가입</span>
        </div>

        <div>
           
            <div>
            <img src='\resources\ico_tel.svg'/>
            <input type="text" name='phone' placeholder="전화번호 11자리('-'빼고 입력)" onInput={(e) => autoHyphen2(e.target)} maxLength='13' />
            <button> 중복확인 </button>
            </div>

            <div style={{ display: 'none' }}>
               <img src="\resources\check.svg"/> <span>아이디 중복확인 완료되었습니다</span>
               <img src="\resources\!mark.svg"/> <span>아이디 중복확인 실패</span>
            </div>
            
            {/* 세번째 디브 */}
            <div>
            <img src="\resources\person.svg" alt="" /><input type="text" placeholder='이름' />
            </div>
            {/* 세번째 디브 아래 조건(이름) */}
            <div style={{ display: 'none' }}>
               <img src="\resources\!mark.svg"/> <span>이름은 필수 입력 입니다.</span>
            </div>

            {/* 네번째 디브 */}
            <div>
                <img src="\resources\person.svg" alt="" />
                <input type="email" name="email"  placeholder='email'/>
                <button> 이메일인증 </button>
            </div>
            
             {/* 네번째 디브 아래 조건(이름) */}
             <div style={{ display: 'none' }}>
               <img src="\resources\!mark.svg"/> <span>이메일 인증이 완료되었습니다</span>
            </div>

            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" placeholder='비밀번호' />
            </div>

            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" placeholder='비밀번호 확인' />
                <spaa>확인완료</spaa>
                </div>

            <div>
                <img src="\resources\person.svg" alt="" />
                <input type="text" placeholder='생년월일 ex)960703' maxLength={6} />
            </div>

            <div>
                [세대 모달검색창]
            </div>
            
            <div>
            <span>세대주/세대원 : </span>
            <label> <input type="radio" name="group" value="Y" />세대주  </label>
            <label> <input type="radio" name="group" value="N" /> 세대원 </label>
            </div>

            <div>
            <span>성별 : </span>
            <label> <input type="radio" name="group" value="Y" />남자  </label>
            <label> <input type="radio" name="group" value="N" /> 여자 </label>
            </div>


                
          

          



  
 
        

        </div>
        
        
        

        </StyledJoinDiv>
    );
};

export default Join;