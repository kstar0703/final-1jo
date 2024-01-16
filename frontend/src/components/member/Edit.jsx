import React from 'react';
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
            gap:  10px;
            margin: 5px;
        }

        & div input{
            background-color: white;
        }

        
    }
`

const Edit = () => {
    return (
        <StyledDiv>
            {/* 처음 메인창 */}
            <div>
             <img src="\resources\logo.svg" alt="logo" />
             <span>개인정보 수정</span>
            </div>
            {/* 정보 수정 영역창 */}
            <div>
            
            {/* 전화번호 */}
            <div>
            <img src='\resources\ico_tel.svg'/>
            <input type="text"  name='phone'  maxLength='13' disabled={true} value={'010-5382-4910'}/>
            </div>

            <div>
                <div>
                <img src="\resources\person.svg" alt="" /><input name='name' type="text" placeholder='이름' />
                </div>
            </div>

            </div>
            
           
        </StyledDiv>
    );
};

export default Edit;