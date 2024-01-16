import React from 'react';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChangePwdDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;


    & >:first-child{
        width: 50%;
        height: 50%;
        background-color: #ccc;
        display: flex;
        flex-direction: column;
       
        gap : 100px;


        
        & > div:first-of-type{
                width: 100%;
                display: flex;
                justify-content: center;
                   
        }

        & > div:nth-of-type(2){
            display: flex;
            flex-direction : column;
            align-items: center;
            
            
            & > div {
                display: flex;
                flex-direction: column;
                    
                margin: 0.5em;
                
                & > input{
                    width: 20vw;
                    height: 4vh;
                }

                & > button{
                    margin: 10px;
                    width: 10vw;
                }
            }

        }
    }
` 

const ChangePwd = () => {

    let currentPwd = useRef();
    let newPwd = useRef();
    let newPwdCheck = useRef();

    const[changeVo,setChangeVo] = useState(
        {   
            "no" : JSON.parse(sessionStorage.getItem("loginMember")).memberNo,
            "phone" : JSON.parse(sessionStorage.getItem("loginMember")).phone,
            "pwd" : newPwd,
         "currentPwd" : newPwd
        }
    )


    
    const[updateState,setUpdateState] = useState('');

    
    const naviGate = useNavigate()

    const navigate = useNavigate(); 

    const onClickCancel = () =>{
        navigate('/member/mypage')
    }
    // 비번 정규식 
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;

    let newPwdSpan = useRef();

    const checkMessage = ['비밀번호는 10자리 이상입니다','조건에 부합합니다','대소문자 특수문자중 하나가 들어가야 합니다']
    
    let pwdCheck =useRef();
    const onBlurNewPwd = (e) =>{
        console.log(pwdCheck)
        pwdCheck=false
        if(e.target.value.length ==0){
            newPwdSpan.current.textContent =''
            newPwdSpan.current.style.color ='black'
        }
        else if(e.target.value.length <= 10){
            newPwdSpan.current.textContent =checkMessage[0]
            newPwdSpan.current.style.color ='black'
        }else if(!regex.test(e.target.value)){
            newPwdSpan.current.textContent ='대소문자 특수문자중 하나가 들어가야 합니다'
            newPwdSpan.current.style.color ='red'
        }else if(regex.test(e.target.value)){
            newPwdSpan.current.textContent =checkMessage[1]
            newPwdSpan.current.style.color ='blue'
            pwdCheck=true
        }
            setUpdateState(updateState+'a')
    }

    let pwdCheckCheck =useRef(false);
    // 패스워드 체크
    let newPwdSpanCheck = useRef();
    const onBlurNewPwdCheck = (e) =>{
            console.log('호출')
            pwdCheckCheck=false;
        if(e.target.value.length ==0){
            newPwdSpan.current.textContent =''
            newPwdSpan.current.style.color ='black'
        }
        else if(e.target.value.length <= 10){
            newPwdSpanCheck.current.textContent =checkMessage[0]
            newPwdSpanCheck.current.style.color ='black'
        }else if(!regex.test(e.target.value)){
            newPwdSpanCheck.current.textContent ='대소문자 특수문자중 하나가 들어가야 합니다'
            newPwdSpanCheck.current.style.color ='red'
        }else if(regex.test(e.target.value)){
            newPwdSpanCheck.current.textContent =checkMessage[1]
            newPwdSpanCheck.current.style.color ='blue' 

            if(e.target.value !== newPwd.current.value){
                newPwdSpanCheck.current.textContent ='비밀번호 불일치'
                newPwdSpanCheck.current.style.color ='red' 
            }else{
                newPwdSpanCheck.current.textContent ='비밀번호가 일치합니다'
                newPwdSpanCheck.current.style.color ='blue'
                pwdCheckCheck=true;
                
            }
        }

        setUpdateState(updateState+'a')
    }

    const clickChange = ()=>{
        console.log(pwdCheck)
        console.log(pwdCheckCheck)
        if(currentPwd.current.value.length<=0){
            alert('비밀번호는 필수 입력값 입니다.')
            currentPwd.current.focus()
            return;
        }

        if(newPwd.current.value.length<=0){
            alert('필수 입력값 입니다.')
            currentPwd.current.focus()
            return;
        }

        if(newPwdCheck.current.value.length<=0){
            alert('필수 입력값 입니다.')
            currentPwd.current.focus()
            return;
        }

       

        if(JSON.parse(sessionStorage.getItem("loginMember")).pwd !== currentPwd.current.value ){
            alert('기존 비밀번호랑 일치하지 않습니다')
            currentPwd.current.focus()
            return;
        }
       
        if(pwdCheck){
            alert('비밀번호가 조건에 부합하지 않습니다.')
            newPwd.current.focus()
            return;
        }
        
        if(pwdCheckCheck){
            alert('비밀번호가 일치하지 않습니다.')
            newPwdCheck.current.focus()
            return
        }

        console.log('하이')
    } 

   








         

    return (
        <ChangePwdDiv>
            <div>
                {/* 1번 */}
                <div>
                    <h1>비밀번호 변경</h1>
                </div>

                {/* 2번 */}
                <div>
                    <div>
                        <input type="password" placeholder='기존 비밀번호' ref={currentPwd}  />
                        
                    </div>

                    <div>
                        <input type="password" placeholder='신규 비밀번호[대소문자특수문자 하나이상 포함]' ref={newPwd} onChange={onBlurNewPwd}  />
                        <span ref={newPwdSpan} ></span>
                    </div>

                    <div>
                        <input type="password" placeholder='신규 비밀번호 확인' onChange={onBlurNewPwdCheck} ref={newPwdCheck}   />
                        <span ref={newPwdSpanCheck}></span>
                    </div>
                    
                    <div>
                        <button onClick={clickChange}>비밀번호 변경</button>

                        <button onClick={onClickCancel}>취소</button>

                    </div>

                </div>

            </div>        
        </ChangePwdDiv>
    );
};

export default ChangePwd;