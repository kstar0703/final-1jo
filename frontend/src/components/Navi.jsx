import React from 'react';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & div{
        font-size: 0.8em;
        display: flex;
        &:hover{
            border-radius: 3px;
            padding: 2px;
            background-color: #000;
            color: #fff;
        }
    }
    
`;

const Navi = () => {
    return (
        <StyledNaviDiv>
            
            
            <div>공지사항</div>
            <div>설문투표</div>
            <div>소통게시판</div>
            <div>커뮤니티</div>
            <div>방문예약</div>
            <div>민원처리</div>
            <div>관리비조회</div>

        </StyledNaviDiv>
    );
};

export default Navi;