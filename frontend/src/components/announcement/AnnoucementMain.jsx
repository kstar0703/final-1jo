import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnoucementList from './AnnoucementList';

const AnnoucementMain = () => {
    return (
        <Routes>
            <Route path='list' element={<AnnoucementList />}/>
        </Routes>
    );
};

export default AnnoucementMain;