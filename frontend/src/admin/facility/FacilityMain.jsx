import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FacilityInsert from './FacilityInsert';
import FacilityEdit from './FacilityEdit';
import FacilityNoticeList from './notice/FacilityNoticeList';
import FacilityList from './FacilityList';
import FacilitiesList from './FacilitiesList';
import FacilityHistoryList from './history/FacilityHistoryList';


const FacilityMain = () => {
    return (
        <Routes>
            <Route path='list' element={<FacilityList />}/>
            <Route path='lists' element={<FacilitiesList />}/>
            <Route path='insert' element={<FacilityInsert />}/>
            <Route path='edit/:facilitiesNo' element={<FacilityEdit />}/>
            <Route path='notice/:facilitiesNo' element={<FacilityNoticeList />}/>
            <Route path='history' element={<FacilityHistoryList />}/>
        </Routes>
    );
};

export default FacilityMain;