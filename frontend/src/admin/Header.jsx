import React from 'react';
import styled from 'styled-components';
import Navi from './Navi';
import { useNavigate } from 'react-router-dom';

const StyledHeaderDiv = styled.div`
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: end;
  & div {
      display: flex;
      align-items: center;
      margin-right: 2%;
      & span {
          margin: 10px;
        }
  }
  .logout{
    border-radius:20px;
    padding: 7px 15px;
    &:hover{
        color: #fff;
        background-color: #394538;
    }
  }
`;


const Header = () => {

    const navigator = useNavigate();
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
    return (
        <StyledHeaderDiv>
            <div onClick={()=>{navigator('/admin/home')}}>
                <img src='../../resources/ico_info.svg' />
                <span>{loginMember?.id}님</span>
                <button className='logout' onClick={(e)=>{
                    e.stopPropagation();
                    sessionStorage.removeItem("loginMember")
                    navigator('/admin')}}>로그아웃</button>
            </div>

        </StyledHeaderDiv>
    );
};

export default Header;