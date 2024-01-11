import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 100vh;
`;
const Layout = () => {
    return (
        <div>
            <StyledLayoutDiv>
                <Header />
                <Main />
                {/* <Footer /> */}
            </StyledLayoutDiv>
        </div>
    );
};

export default Layout;