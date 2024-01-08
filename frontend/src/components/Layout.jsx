import React from 'react';
import Header from './Header';
import Navi from './Navi';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';

const StyledLayoutDiv = styled.div`
    width: 100%;
`;
const Layout = () => {
    return (
        <div>
            <StyledLayoutDiv>
                <Header />
                <Navi />
                <Main />
                <Footer />
            </StyledLayoutDiv>
        </div>
    );
};

export default Layout;