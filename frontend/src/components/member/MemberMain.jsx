import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Edit from './Edit';




const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color:  #F5F5F5;
    
`;

const MemberMain = () => {
    return (
        <StyledMainDiv>

             <Routes>
                <Route path='*' element={<Home/>} />
                <Route path='edit' element={<Edit/>} />             
            </Routes>      
        </StyledMainDiv>
    );
};

export default MemberMain;