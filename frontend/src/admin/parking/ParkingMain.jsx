import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ParkingList from './ParkingList';

const ParkingMain = () => {
    return (
        <Routes>
            <Route path='admin/list' element={<ParkingList />}/>
            admin
        </Routes>
    );
};

export default ParkingMain;