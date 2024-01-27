import React from 'react';
import styled from 'styled-components';
import { useRef, useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PwdSearchModal from './PwdSearchModal';

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
    .input-input{
      width: 200px;
      height: 20px;
      padding: 10px;
    }

    .btn-div{
        display: flex;
        justify-content: center;
    }
    .btn-div2{
        display: flex;
        gap :5px;

        & button{
            width: 60px;
            height: 20px !important;
            font-size: 10px;
            padding: 0px;
        }
    }
`
const Login = () => {

    // 네비게이트
   const navigate = useNavigate();
   const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
   
    useEffect(
        ()=>{
            if(loginMember && loginMember?.memberNo)
            {   alert('잘못된 접근입니다')
                navigate("/member/home")
            }
        }
    ,[])

  
    //로긴멤버
    let loginMemberVo = {};

    //저장멤버
    const rememberMember = JSON.parse(sessionStorage.getItem("rememberMember"))



    let cbRef = useRef() 
  
    

   //전화번호
    const [phoneNumber, setPhoneNumber] = useState(rememberMember?.phone ||'');

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
      
      
  
        let patcherble = true;

      
        function clickLogin(){
            
            
             loginMemberVo = { 
              phone : phone?.current.value,
              pwd : pwd?.current.value
            }
            
            if(!patcherble){
                return;
            }
            patcherble =false;

            fetch("http://127.0.0.1:8888/app/member/login",{
                method: "post",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(loginMemberVo),
            })
            .then( (resp) => {
                return resp.json()})
                .then( (data)=>{
                if(data.status==="good"){

                    console.log(cbRef.current.value)

                    if(cbRef.current.checked){
                        sessionStorage.setItem("rememberMember", JSON.stringify({phone : phone.current.value}))
                    }else{
                        sessionStorage.removeItem("rememberMember")
                    }

                    alert(data.msg);
                   
                    sessionStorage.setItem("loginMember", JSON.stringify(data.loginMember));
                    
                    navigate('/member')
                }else{
                    alert(data.msg)
                    
                    return;
                }
            })
            .catch()
            .finally( () => {patcherble = true}) 
     }

     //엔터키시 로그인
     const keydown = (e) => {
        if(e.key ==='Enter'){
            clickLogin()
        }
     }

     //조인창 이동
     const clickJoin = () => {
        navigate('/join')
     }

     const [checkModal,setCheckModal] = useState(false);


     const openModal =()=>{
        setCheckModal(true)
     }

     const closeModal = ()=>{
        setCheckModal(false)
     }
    
 



  
    return (
    <>
        <StyledLoginDiv>
            <div>
                <h1>그래이 아파트 로그인</h1>
                <img src="\resources\logo.svg" alt="logo" />
            </div>

            <div>
                <form action="">
                    {rememberMember?.phone ?  
                    <input className='input-input' value={phoneNumber}  type="text" name='phone' placeholder="전화번호 11자리('-'빼고입력)" ref={phone}  maxLength="13" onInput={(e) => autoHyphen2(e.target)}  />
                    :
                    <input className='input-input'  type="text" name='phone' placeholder="전화번호 11자리('-'빼고입력)" ref={phone}  maxLength="13" onInput={(e) => autoHyphen2(e.target)}  />
                    } <br />
                    <input className='input-input'  type="password" name='pwd' placeholder='비밀번호' ref={pwd}  onKeyDown={keydown}/>
                    <div>
                    <input  type="checkbox" ref={cbRef} value={'good'} name="rememberPwd" id="check" />
                    <label for="check">아이디 기억하기</label>
                    </div>
                </form>
            </div>


            <div>
                <div className='btn-div'>
                    <button onClick={clickLogin} className='sty02_btn' >로그인</button>
                </div>

                <div className='btn-div2'>
                    <button className='sty01_btn' onClick={openModal} >비밀번호 찾기</button>
                    <button onClick={clickJoin} className='sty01_btn'>회원가입</button>
                </div>

            
            </div>

          

            <PwdSearchModal isOpen={checkModal} closeModal={closeModal} ></PwdSearchModal>

            
        </StyledLoginDiv>
    </>
    );
};

export default Login;
