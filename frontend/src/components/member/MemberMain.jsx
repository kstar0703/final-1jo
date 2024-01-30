import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Edit from './Edit';
import MyPage from './MyPage';
import ChangePwd from './ChangePwd';




const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    

  
    
`;

const MemberMain = () => {
    return (
        <StyledMainDiv>

             <Routes>

                <Route path='*' element={<Home/>} />
                <Route path='edit' element={<Edit/>} />             
                <Route path='mypage' element={<MyPage/>} />             
                <Route path='changePwd' element={<ChangePwd/>} />
                <Route path='quit'></Route>             
            </Routes>      
        </StyledMainDiv>
    );
};

export default MemberMain;