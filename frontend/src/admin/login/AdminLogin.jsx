import React from 'react';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        gap: 20px;
        margin-bottom: 50px;
    }



`

const AdminLogin = () => {

    const navigate = useNavigate();


    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
    useEffect(
      ()=>{
          if(loginMember && loginMember?.managerNo)
          {   alert('잘못된 접근입니다')
              navigate("/admin/home")
          }
      }
  ,[])

  let loginMemberVo = {}
  
  let id = useRef(); 
  let pwd = useRef(); 

      let patcherble = true;
    const clcikLogin = (event) => {
        event.preventDefault()
        loginMemberVo = { 
            id : id.current.value,
            pwd : pwd.current.value
          }

       

          

          if(id.current.value.length<=0){
            alert("아이디를 입력하세요")
            id.current.focus()
            return;
          }

          if(pwd.current.value.length<=0){
            alert("패스워드를 입력하세요")
            pwd.current.focus()
            return;
          }
          
          if(!patcherble){
              return;
          }
          patcherble =false;

          fetch("http://127.0.0.1:8888/app/admin/login",{
                method: "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(loginMemberVo),
            })
            .then( (resp) => {
                return resp.json()})
                .then( (data)=>{
                if(data.status==="good"){
                    
                    alert(data.msg);
                    sessionStorage.setItem("loginMember", JSON.stringify(data.loginManger));
                  
                    navigate("/admin/home")
                    
                    
                }else{
                    alert(data.msg)
                    
                    
                    return;
                }
            })
            .catch()
            .finally( () => {patcherble = true}) 
     }

    return (
        <StyledLoginDiv>
            <div>
                <h2>그래이 아파트 관리자 로그인</h2>
                <img src="\resources\logo.svg" alt="logo" />
            </div>

            <div>
                <form action="">
                    <input ref={id}  type="text" name='phone' placeholder="아이디"  />
                    <br />
                    <input ref={pwd} type="password" name='pwd' placeholder='비밀번호' />
                    <br/> 
                </form>
            </div>

            <div>
            <button onClick={clcikLogin}className='sty02_btn' >로그인</button>
            </div>

	

           
        </StyledLoginDiv>
    );
};

export default AdminLogin;