import React from 'react';
import styled from 'styled-components';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UnitSearchModal from './UnitSearchModal';


const StyledJoinDiv = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;
    display: flex;
    align-items: center;
    padding: 100px;
    flex-direction: column;

    & > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 1em;
        gap: 10px;
    }

    & > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        gap: 20px;

        & > div:nth-of-type(10) {
            & > button {
                width: 100%;
            }
        }

        & > div {
            & > input {
                margin-left: 1em;
                margin-right: 1em;
                padding: 1.1em;
                width: 200px;
            }

            & > button {
                width: 10em;
            }
        }

        .sumbitDiv{
          display: flex;
          align-items: center;
          justify-content: center;
        } 
    }

    .sty01_span:hover{
    background-color: #ccc;   
}

.input-unit{
  
  width: 300px !important
}
`;

const Join = () => {
    
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


    //상태 업데이트용
    const[updateState,setUpdateState] =useState('');
    //조인인 정보
    const [JoinMemberInfo,setInfo] = useState();

  
     //하이픈 추가함수
    const [phoneNumber, setPhoneNumber] = useState('');
     const autoHyphen2 = (target) => {
        
       
        target.value = target.value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
          .replace(/(\-{1,2})$/, "");
        setPhoneNumber(target.value);
      }

      let patcherble= true;

    //onChange 
    const onChange = (event) =>{
      const {name , value} = event.target;
      setInfo({
          ...JoinMemberInfo,
        [name] : value,
      }); 
    }

    //중복체크
    const [duplication, setduplication] = useState('');
    
    //아래돔 요소 접근
    let duplicationInput = useRef();
    let duplicationDiv = useRef();
      
    const duplicationcheck = (e) => {

      // 아이디 중복검사
      if(!patcherble){ return;}

      patcherble =false;

      fetch("http://127.0.0.1:8888/app/member/validateId",{
          method: "post",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(JoinMemberInfo),
      })
      .then( (resp) => {
          return resp.json()})
          .then( (data)=>{
            duplicationDiv.current.style.display=''
          if(data.status==="good"){
             duplicationInput.current.disabled = true;
             duplicationInput.current.style.backgroundColor = 'lightgrey';
              setduplication(data.status)
             
          }else{    
              setduplication(data.status)
            return;
          }
      })
      .catch()
      .finally( () => {patcherble = true}) 
      }

      //엔터시 중복확인
      const phoneKeydown = (e) => {
         if(e.code ==='Enter'){
          duplicationcheck()
         }
      }

      // useRef()모음 

      //이름
      let name = useRef();
      // 이름  아래 필수값 디브 
      let RequirednameDiv = useRef()
      //비밀번호 체크
      let pwdRef = useRef()
      let pwdCheckRef = useRef()

      let pwdCheck =useRef(false)
      let pwdCheckCheck = useRef(false)

      let emailRef = useRef()
      let emailCheckRef = useRef()
      
      let brithRef = useRef()

      let ownerRef = useRef()
      let genderRef = useRef()

      let unitNoRef = useRef()

      let arrayRef = useRef([duplicationInput,name,pwdRef,pwdCheckRef,emailRef,brithRef])
      
      let findUnitRef = useRef()

      
      

      const onBlurName = (e) => {
        if (e.target.value.length <= 1) {
          RequirednameDiv.current.style.display = '';
          e.target.focus();
        } else if (e.target.value.length >= 2) {
          RequirednameDiv.current.style.display = 'none';
        }
      };
      
      let patcherbleJoin = true
      //이메일

      const [emailState, setEmailState] = useState(false);
      const [authCode, setAuthCode] = useState('');
      const [authCodeDiv, setAuthCodeDiv] =useState(false)
      const [emailStatus,setEmailStatus] = useState(true);
      // 이메일 중복확인
      const emailCheck = ()=>{

        const value = emailRef?.current.value
       
        if (!value || value.trim() === '') {
           alert('이메일은 필수 입력값 입니다')
           emailRef?.current.focus()
             return
       }  
        
        if(!patcherbleJoin){
          return
        }

        patcherbleJoin = false;
        
        fetch("http://127.0.0.1:8888/app/member/emailCheck",{
          method: "post",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            'email' : emailRef?.current.value
          }),
      })
      .then( (resp) => {
          return resp.json()})
          .then( (data)=>{
          if(data.status==="good"){
            alert('이메일 중복확인 완료')
            emailRef.current.disabled = true;
              setEmailState(true)
          }else{  
            alert('중복된 이메일입니다')  
            return;
          }
      })
      .catch()
      .finally( () => {patcherbleJoin = true}) 
      }


      // 이메일 인증번호 발송
     const authorizeEmail = ()=>{

       const value = name?.current.value
       
       if (!value || value.trim() === '') {
          alert('이름을 입력하세요')
          
            name?.current.focus();
            return
      }

      if(!patcherbleJoin){
        return
      }

      patcherbleJoin = false;
      
      fetch("http://127.0.0.1:8888/app/member/authorizeEmail",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          'email' : emailRef?.current.value
          ,'name' : name?.current.value
        }),
    })
    .then( (resp) => {
        return resp.json()})
        .then( (data)=>{
        if(data.status==="good"){
          alert('인증번호 발송!')
          setAuthCodeDiv(true)
          setAuthCode(data.num);
          console.log(data.num)

        }else{    
          return;
        }
    })
    .catch()
    .finally( () => {patcherbleJoin = true}) 
    }

    
    
    const checkemailNum = ()=>{
      if(emailCheckRef?.current.value == authCode){
        
        emailCheckRef.current.disabled=true;
        setEmailStatus(false)
        alert('인증성공')
      }else{
        alert('인증번호가 다릅니다')
      }
    } 


    // 비밀번호--------------------------------------------------------------------------------------
    // 비번 정규식 
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;

    let newPwdSpan = useRef()
    const checkMessage = ['비밀번호는 10자리 이상입니다','조건에 부합합니다','대소문자 특수문자중 하나가 들어가야 합니다']
    
    const onInputNewPwd = (e) =>{
       
        pwdCheck.current=false
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
            pwdCheck.current=true
        }
            setUpdateState(updateState+'a')
    }

      
      let newPwdSpanCheck = useRef();
      const onInputNewPwdCheck = (e) =>{
              pwdCheckCheck.current=false;
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
  
              if(e.target.value !== pwdRef.current.value){
                  newPwdSpanCheck.current.textContent ='비밀번호 불일치'
                  newPwdSpanCheck.current.style.color ='red' 
              }else{
                  newPwdSpanCheck.current.textContent ='비밀번호가 일치합니다'
                  newPwdSpanCheck.current.style.color ='blue'
                  pwdCheckCheck.current=true;
                  
              }
          }
  
          setUpdateState(updateState+'a')
      }

       //세대 찾기--------------------------------------------------------------------------
      
      const [isOpen,setIsOpen] =useState(false)
      
      
       const ModalOpenUnit = () =>{
          setIsOpen(true)
        
      }

      const closeModal = () =>{
          setIsOpen(false)
      }

      

      
    
      //제출--------------------------------------------------------------------------------
      const ClickJoin = (e) => {

        console.log(unitNoRef?.current.value)

        const hasEmptyValue = arrayRef.current.some((item) => {
          if (!item?.current?.value) {
            alert("필수 값을 채워주세요");
            item.current?.focus();
            return true; // 배열 순회 중단
          }
          return false; // 계속해서 다음 필드 검사
        });
      
        if (hasEmptyValue) {
        
          return;
        }

        if(duplication !== 'good'){
          duplicationInput?.current?.focus()
          alert('중복확인을 완료하세요')
          return 
        }

        if(!emailState){
          alert('이메일 중복검사를 완료하세요')
          emailRef?.current?.focus()
          return
        }

        if(emailStatus){        
          alert('이메일 인증번호 확인을 완료하세요')
          emailCheckRef?.current?.focus()
          return
        }

        if(!pwdCheck?.current){
          alert('비밀번호를 확인 하세요')
          pwdRef?.current.focus()
          return
        }

        if(!pwdCheckCheck.current){
          alert('비밀번호가 일치하지 않습니다')
          pwdCheckRef?.current?.focus()
          return
        }


        if(!JoinMemberInfo?.ownerYn){
          ownerRef?.current.focus()
          alert('세대주 여부를 선택하세요')
          return
        }

        if(!JoinMemberInfo?.gender){
          genderRef?.current.focus()
          alert('성별을 선택하세요')
          return
        }

   

        if(!unitNoRef?.current.value){
          alert('세대 정보 찾기를 완료하세요')
          console.log(findUnitRef.current)
          findUnitRef?.current?.click();

          return
        }
        

      
          

       
        
        if(!patcherbleJoin){return;}
        
      patcherbleJoin =false;

      fetch("http://127.0.0.1:8888/app/member/join",{
          method: "post",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify(JoinMemberInfo),
      })
      .then( (resp) => {
          return resp.json()})
          .then( (data)=>{
          if(data.status==="good"){
              alert('회원가입성공!')
              navigate('/')
          }else {    
            alert(data.msg)
            return;
          }
      })
      .catch()
      .finally( () => {patcherbleJoin = true}) 
      }

    return (
        <StyledJoinDiv>
         {/* 1 */}
        <div>
             <img src="\resources\logo.svg" alt="logo" />
             <span>회원가입</span>
        </div>
        {/* 2 */}
        <div>
           
            {/* 1  */}
            <div>
            <img src='\resources\ico_tel.svg'/>
            <input type="text" ref={duplicationInput} name='phone' placeholder="전화번호 11자리('-'빼고 입력)" onChange={onChange} onInput={(e) => autoHyphen2(e.target)} maxLength='13' disabled={false} onKeyDown={phoneKeydown} />
            <button onClick={duplicationcheck} className='sty02_btn'> 중복확인 </button>
            </div>

            {/*2 중복확인  */}
            <div ref={duplicationDiv} style={{ display: 'none' }}>
            {duplication === '' ? null : (
        duplication ==='good' ? (
          <>
            <img src="\resources\check.svg" alt="확인 아이콘" />
            <span>아이디 중복확인 완료되었습니다</span>
          </>
        ) : (
          <>
            <img src="\resources\!mark.svg" alt="실패 아이콘" />
            <span>아이디 중복확인 실패</span>
          </>
        )
      )}
            </div>
            
            {/*3 이름 */}
            <div>
            <img src="\resources\person.svg" alt="" /><input ref={name} name='name' type="text" placeholder='이름' onChange={onChange} onBlur={onBlurName} />
            </div>
            {/* 4 이름 입력 안했을때 */}
            <div ref={RequirednameDiv} style={{ display: 'none' }}>
               <img src="\resources\!mark.svg"/> <span>이름은 필수 입력 입니다.</span>
            </div>

            {/* 5*/}
            <div>
                <img src="\resources\person.svg" alt="" />
                <input ref={emailRef} type="email" name="email"  placeholder='email' onChange={onChange}/>
                { !emailState ? 
                <button className='sty02_btn' onClick={emailCheck} > 이메일중복체크 </button>
                :
                <button className='sty02_btn' onClick={authorizeEmail}> 이메일인증 </button>
                }
            </div>
            { authCodeDiv ? 
              
             <div>
                <img src="\resources\person.svg" alt="" />
                <input ref={emailCheckRef} useRef  placeholder='인증번호를 입력하세요' />
                
                {emailStatus ? 
                <button className='sty02_btn' onClick={checkemailNum}> 인증번호 확인 </button>
                    :
                <button className='sty01_btn sty01_span' disabled={true}>인증확인 완료</button>
                }
            </div>

              :
              
              
              ''
             
            } 
            
           
            {/* 7 */}
            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" ref={pwdRef} placeholder='비밀번호' name='pwd' onChange={onChange} onInput={onInputNewPwd}/>
                <span ref={newPwdSpan}></span>
            </div>

            {/* 8 */}
            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" ref ={pwdCheckRef} placeholder='비밀번호 확인' onInput={onInputNewPwdCheck} />
                <span ref={newPwdSpanCheck}></span>
                </div>

            {/* 9 */}
            <div>
                <img src="\resources\person.svg" alt="" />
                <input type="text" name='birth' ref={brithRef} placeholder='생년월일 ex)960703' maxLength={6} onChange={onChange} />
               
            </div>

            {/* 10 */}
            <div className='sumbitDiv'>
                <button className='sty02_btn' onClick={ModalOpenUnit} ref={findUnitRef} >세대 찾기</button>
            </div>
            {/* 11 */}
            <div>
              <span>세대 정보 : </span>
                <input className='input-unit' ref={unitNoRef} style={{display:'none'}} name='unitNo' disabled ={true} onChange={onchange} ></input>
             
            </div>
            
            {/* 12 */}
            <div>
            <span>세대주/세대원 : </span>
            <label> <input type="radio" name="ownerYn" value="Y" onChange={onChange} ref={ownerRef}/>세대주  </label>
            <label> <input type="radio" name="ownerYn" value="N" onChange={onChange}/> 세대원 </label>
            </div>

            {/* 13 */}
            <div>
            <span>성별 : </span>
            <label> <input type="radio" name="gender" value="M" onChange={onChange} ref={genderRef} />남자  </label>
            <label> <input type="radio" name="gender" value="F" onChange={onChange} /> 여자 </label>
            </div>

            <div className='sumbitDiv'>
              <button onClick={ClickJoin} className='sty02_btn'>가입</button>
            </div>
        </div>
        
        
        <UnitSearchModal closeModal={closeModal} isOpen={isOpen} setInfo={setInfo} unitNoRef={unitNoRef} > </UnitSearchModal>
        
        </StyledJoinDiv>
    );
};

export default Join;