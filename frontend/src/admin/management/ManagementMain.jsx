import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagementList from './ManagementList';
import ManagementEdit from './ManagementEdit';

const ManagementMain = () => {
    return (
        <Routes>
            <Route path='list' element={<ManagementList />}/>
            <Route path='edit' element={<ManagementEdit />}/>
            admin
        </Routes>
    );
};

export default ManagementMain;