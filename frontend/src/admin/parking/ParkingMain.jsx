import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ParkingList from './ParkingList';



const ParkingMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<ParkingList/>}/>            
        </Routes>
    );
};

export default ParkingMain;