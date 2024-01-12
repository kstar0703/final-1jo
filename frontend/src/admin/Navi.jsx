import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
    & .logo{
        margin: 20px 0 100px;
    }
    & div:hover {
      border-radius: 3px;
      padding: 2px;
      background-color: pink;
      padding: 5px;
      color: #fff;
  }
`;

const Navi = () => {
    return (
      <StyledNaviDiv className="container">
        <div className="logo">
          <img src="resources/logo.svg" />
          <img src="resources/logo.svg" />
        </div>
        <div><Link to="announcement/list">공지사항</Link></div>
        <div><Link to="vote/list">설문투표</Link></div>
        <div><Link to="board/list">소통게시판</Link></div>  
        <div><Link to="facility/list">커뮤니티</Link></div>
        <div><Link to="parking/list">방문예약</Link></div>
        <div><Link to="complaint/mySumitList">민원처리</Link></div>
        <div><Link to="management/list">관리비조회</Link></div>
      </StyledNaviDiv>
    );
};

export default Navi;