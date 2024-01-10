import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagementList from './ManagementList';

const ManagementMain = () => {
    return (
        <Routes>
            <Route path='list' element={<ManagementList />}/>
        </Routes>
    );
};

export default ManagementMain;