import React from 'react';
import { Link } from 'react-router-dom';
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
            
            <div><Link to="/announcement/list">공지사항</Link></div>
            <div><Link to="/vote/list">설문투표</Link></div>
            <div><Link to="/board/list">소통게시판</Link></div>
            <div><Link to="/facility/list">커뮤니티</Link></div>
            <div><Link to="/parking/list">방문예약</Link></div>
            <div><Link to="/complaint/mySumitList">민원처리</Link></div>
            <div><Link to="/management/list">관리비조회</Link></div>

        </StyledNaviDiv>
    );
};

export default Navi;