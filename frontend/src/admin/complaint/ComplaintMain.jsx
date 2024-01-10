import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComplaintList from './ComplaintList';

const ComplaintMain = () => {
    return (
        <Routes>
            <Route path='admin/mySumitList' element={<ComplaintList />}/>
            admin
        </Routes>
    );
};

export default ComplaintMain;