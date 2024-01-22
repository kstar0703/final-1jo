import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';
import Navi from './Navi';

const StyledLayoutDiv = styled.div`
    width: 100vw; //1920px
    height: 100vh;
    display: grid;
    grid-template-rows: 0.8fr 9.2fr;
    position: relative;
    & div{
        display: flex;
    }
`;
const Layout = () => {
    return (
        <StyledLayoutDiv>
            <Header />
            <div>
                <Navi />
                <Main />
            </div>
            <Footer />
        </StyledLayoutDiv>
    );
};

export default Layout;