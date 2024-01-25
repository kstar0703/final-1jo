import React, { useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledLayoutDiv = styled.div`
     width: 100vw;
    /* height: 100vh;  */
`;
const Layout = () => {

    const navigate =useNavigate()
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
    useEffect(
        ()=>{
            if(!loginMember || !(loginMember?.memberNo))
            {   alert('로그인 상태가 아닙니다')
                navigate("/")
            }
        }
    ,[])



    return (
        <div>
            <StyledLayoutDiv>
                <Header />
                <Main />
                {/* <Footer /> */}
            </StyledLayoutDiv>
        </div>
    );
};

export default Layout;