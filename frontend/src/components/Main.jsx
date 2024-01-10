import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnoucementMain from './announcement/AnnoucementMain';
import VoteMain from './vote/VoteMain';
import BoardMain from './board/BoardMain';
import FacilityMain from './facility/FacilityMain';
import ParkingMain from './parking/ParkingMain';
import ComplaintMain from './complaint/ComplaintMain';
import ManagementMain from './management/ManagementMain';
import ErrorPageNotFound from './error/ErrorPageNotFound';


const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>메인화면</h1>} />
            <Route path='/announcement/*' element={<AnnoucementMain />}/>
            <Route path='/vote/*' element={<VoteMain />}/>
            <Route path='/board/*' element={<BoardMain />} />
            <Route path='/facility/*' element={<FacilityMain/>}/>
            <Route path='/parking/*' element={<ParkingMain/>}/>
            <Route path='/complaint/*' element={<ComplaintMain/>}/>
            <Route path='/management/*' element={<ManagementMain/>}/>
            <Route path='*' element={<ErrorPageNotFound />}/> 
        </Routes>
    );
};

export default Main;