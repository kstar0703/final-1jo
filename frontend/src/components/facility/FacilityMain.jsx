import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FacilityList from './FacilityList';

const FacilityMain = () => {
    return (
        <Routes>
            <Route path='list' element={<FacilityList />}/>
        </Routes>
    );
};

export default FacilityMain;