import React from 'react';
import styled from 'styled-components';
import Navi from './Navi';
import { useNavigate } from 'react-router-dom';

const StyledHeaderDiv = styled.div`
    width: 100vw;
    height: 10vh;
    border-bottom: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    place-items: center center;
    .info{
        display: flex;
        align-items: center;
        & span{
            margin-left: 10px;
        }
    }
`;
const Header = () => {
    // 로그인 멤버 
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
    const navigator = useNavigate();

    const clickLogin = () => {
        navigator("/")
    }

    const clickMyPage = () =>{
        navigator("member/home")
    }
    
    return (
        <StyledHeaderDiv>
            <div className='logo' onClick={()=>{navigator("/member/home");}}>
                <img className='logo_img' src='../resources/logo.png'/>
                {/* <img src='resources/logo.svg'/> */}
                {/* <img src='resources/logo.svg'/> */}
            </div>
            <Navi />
            <div className='info' onClick={clickMyPage}>
                <img src='/resources/ico_info.svg' />
                {loginMember ? <span>{loginMember.name}님 </span> : <button onClick={clickLogin}>로그인</button> }
            </div>
        </StyledHeaderDiv>
    );
};

export default Header;