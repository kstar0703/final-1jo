import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > :first-child{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        font-size: 30px;
    
    }

    & > :nth-child(2){
        display: flex;
        flex-direction: column;
        align-items: center;
        
      

        & div{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            
            gap:  10px;
            margin: 5px;
            margin-left: 1em;
        }

        & div input{
            background-color: white;
            padding: 1em;
            height: 50px;
            width: 400px;
        }

        & div input[type=radio]{
            width: 20px;
            height: 20px;
        }
        
        .backDiv{
            display: flex;
            justify-content: center;
            align-items: center;
            
            &> button{
                width: 49%;
                height: 50px;
            }
        }

        
    }
`

const Edit = () => {

      const navigate = useNavigate()
      // 로그인정보
      const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))


      const back = () =>{
        navigate('/member/mypage')
      }

      const changePwd = () => {
        navigate('/member/changePwd')
      }


    return (
        <StyledDiv>
            {/* 처음 메인창 */}
            <div>
             <img src="\resources\logo.svg" alt="logo" />
             <span>개인정보 확인</span>
            </div>
            {/* 정보 수정 영역창 */}
            <div>
            
            {/* 전화번호 */}
            <div>
            <img src='\resources\ico_tel.svg'/>
            <input type="text"  name='phone'  maxLength='13' disabled={true} value={loginMember.phone}/>
            </div>

            <div>
                <div>
                <img src="\resources\person.svg" alt="" /><input name='name' type="text" disabled={true} placeholder='이름' value={loginMember.name} />
                </div>
            </div>

            <div>
                <div>
                <img src="\resources\person.svg" alt="" /><input name='name' type="text" placeholder='이메일' disabled={true} value={loginMember.email} />
                </div>
            </div>

            <div>
                <div>
                <img src="\resources\person.svg" alt="" /><input name='name' type="text" placeholder='이메일' disabled={true} value={loginMember.birth} />
                </div>
            </div>

            <div>
                <span>주소 :</span>
                <span>101동 1400호</span>
            </div>

         
            <div>
            <span>세대주/세대원 : </span>
            <label> <input type="radio" name="ownerYn" value="Y"  checked={loginMember.ownerYn === 'Y'} disabled={true}/>세대주  </label>
            <label> <input type="radio" name="ownerYn" value="N" checked={loginMember.ownerYn === 'N'} disabled={true}  /> 세대원 </label>
            </div>

            <div>
            <span>성별 : </span>
            <label> <input type="radio" name="gender" value="Y" checked={loginMember.gender === 'M'} disabled={true}  />남자  </label>
            <label> <input type="radio" name="gender" value="N" checked={loginMember.gender === 'F'} disabled={true}  /> 여자 </label>
            </div>

            <div className='backDiv'>
                <button onClick={back}>뒤로 가기</button>
                <button onClick={changePwd}>비밀번호 변경</button>
            </div>
        </div>

       
            
           
        </StyledDiv>
    );
};

export default Edit;