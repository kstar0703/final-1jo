import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FacilityList from './FacilityList';
import FacilityInsert from './FacilityInsert';
import FacilityEdit from './FacilityEdit';


const FacilityMain = () => {
    return (
        <Routes>
            <Route path='list' element={<FacilityList />}/>
            <Route path='insert' element={<FacilityInsert />}/>
            <Route path='edit/:facilityNo' element={<FacilityEdit />}/>
        </Routes>
    );
};

export default FacilityMain;