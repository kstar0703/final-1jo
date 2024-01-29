import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagementList from './ManagementList';
import ManagementEdit from './ManagementEdit';
import ManagementWrite from './ManagementWrite';

const ManagementMain = () => {
    return (
        <Routes>
            <Route path='list' element={<ManagementList />}/>
            <Route path='edit' element={<ManagementEdit />}/>
            <Route path='write' element={<ManagementWrite />}/>
            admin
        </Routes>
    );
};

export default ManagementMain;