import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComplaintList from './ComplaintList';
import ComplaintDetail from './ComplaintDetail';
import ComplaintWrite from './ComplaintWrite';

const ComplaintMain = () => {
    return (
        <Routes>
            <Route path='list' element={<ComplaintList />}/>
            <Route path='detail/:complaintNo*' element={<ComplaintDetail />}/>
            <Route path='write' element={<ComplaintWrite />}/>
        </Routes>
    );
};

export default ComplaintMain;