import React from 'react';
import styled from 'styled-components';
import ComplaintMain from './complaint/ComplaintMain';
import VoteMain from './vote/VoteMain';
import BoardMain from './board/BoardMain';
import FacilityMain from './facility/FacilityMain';
import ParkingMain from './parking/ParkingMain';
import ManagementMain from './management/ManagementMain';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import { Route, Routes } from 'react-router-dom';
import AnnouncementMain from './announcement/AnnoucementMain';

const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  & table,
  tr,
  th,
  td {
    border: 1px solid #000;
  }
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <Routes>
                <Route path='/' element={<h1>관리자 메인화면</h1>} />
                <Route path='/announcement/*' element={<AnnouncementMain />}/>
                <Route path='/vote/*' element={<VoteMain />}/>
                <Route path='/board/*' element={<BoardMain />} />
                <Route path='/facility/*' element={<FacilityMain/>}/>
                <Route path='/parking/*' element={<ParkingMain/>}/>
                <Route path='/complaint/*' element={<ComplaintMain/>}/>
                <Route path='/management/*' element={<ManagementMain/>}/>
                <Route path='*' element={<ErrorPageNotFound />}/> 
            </Routes>

        </StyledMainDiv>
    );
};

export default Main;