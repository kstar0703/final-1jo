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

        & > div:nth-of-type(10){
           
            & > button {
                width: 100%;
            }
        }
        /* 이건 디브 */
        & > div {
            
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

    //조인인 정보
    const [JoinMemberInfo,setInfo] = useState({unitNo : 1});

    //전체 ref정보 
    let ref = useRef([]);





     //하이픈 추가함수
    const [phoneNumber, setPhoneNumber] = useState('');
     const autoHyphen2 = (target) => {
        
        console.ref
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
         
        let duplicationInput = useRef();

       let duplicationDiv = useRef();
      const duplicationcheck = (e) => {


        if(!patcherble){
          return;
      }

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

      //이름
      let name = useRef();

      // 이름  아래 필수값 디브 
      let RequirednameDiv = useRef()
      

      const onBlurName = (e) => {
        if (e.target.value.length <= 1) {
          RequirednameDiv.current.style.display = '';
          e.target.focus();
        } else if (e.target.value.length >= 2) {
          RequirednameDiv.current.style.display = 'none';
        }
      };

      //이메일

      const [email, setEmail] = useState('');
      const [isValidEmail, setIsValidEmail] = useState(true);
      let emailDiv = useRef();
    
      

      let patcherbleJoin = true
      //제출
      const ClickJoin = (e) => {
      
          console.log('제출')

        if(!patcherbleJoin){
          return;
      }

      patcherbleJoin =false;

      fetch("http://127.0.0.1:8080/app/member/join",{
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
          }else{    
             
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
            <button onClick={duplicationcheck}> 중복확인 </button>
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
                <input type="email" name="email"  placeholder='email'/>
                <button> 이메일인증 </button>
            </div>
            
             {/* 6 */}
             <div ref={emailDiv} style={{ display: 'none' }}>
               <img src="\resources\!mark.svg"/> <span>이메일 인증이 완료되었습니다</span>              
            </div>
            {/* 7 */}
            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" placeholder='비밀번호' name='pwd' onChange={onChange}/>
            </div>

            {/* 8 */}
            <div>
                <img src="\resources\password.svg" alt="" />
                <input type="password" placeholder='비밀번호 확인' />
                <spaa>확인완료</spaa>
                </div>

            {/* 9 */}
            <div>
                <img src="\resources\person.svg" alt="" />
                <input type="text" name='birth' placeholder='생년월일 ex)960703' maxLength={6} onChange={onChange} />
            </div>

            {/* 10 */}
            <div>
                <button>세대 찾기</button>
            </div>
            {/* 11 */}
            <div>
                <span>101동 1400호</span>
            </div>
            
            {/* 12 */}
            <div>
            <span>세대주/세대원 : </span>
            <label> <input type="radio" name="ownerYn" value="Y" onChange={onChange} />세대주  </label>
            <label> <input type="radio" name="ownerYn" value="N" onChange={onChange} /> 세대원 </label>
            </div>

            {/* 13 */}
            <div>
            <span>성별 : </span>
            <label> <input type="radio" name="gender" value="Y" onChange={onChange} />남자  </label>
            <label> <input type="radio" name="gender" value="N" onChange={onChange} /> 여자 </label>
            </div>

            <div>
              <input type="submit" name="join" onClick={ClickJoin} value='가입' />
            </div>

        </div>
        
        
        
        

        </StyledJoinDiv>
    );
};

export default Join;