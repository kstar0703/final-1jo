import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FacilityList from './FacilityList';

const FacilityMain = () => {
    return (
        <Routes>
            <Route path='admin/list' element={<FacilityList />}/>
            admin
        </Routes>
    );
};

export default FacilityMain;