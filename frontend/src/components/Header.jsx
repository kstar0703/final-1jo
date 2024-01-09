import React from 'react';
import styled from 'styled-components';
import Navi from './Navi';

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
    return (
        <StyledHeaderDiv>
            <div className='logo'>
                <img src='resources/logo.svg'/>
                <img src='resources/logo.svg'/>
                <img src='resources/logo.svg'/>
            </div>
            <Navi />
            <div className='info'>
                <img src='resources/ico_info.svg' />
                <span>유저 님</span>
            </div>
        </StyledHeaderDiv>
    );
};

export default Header;