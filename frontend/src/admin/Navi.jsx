import React from 'react';
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