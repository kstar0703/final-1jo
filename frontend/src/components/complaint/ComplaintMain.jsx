import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComplaintList from './ComplaintList';

const ComplaintMain = () => {
    return (
        <Routes>
            <Route path='mySumitList' element={<ComplaintList />}/>
        </Routes>
    );
};

export default ComplaintMain;