import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnouncementList from './AnnoucementList';

const AnnouncementMain = () => {
    return (
        <Routes>
            <Route path='admin/list' element={<AnnouncementList />}/>
            admin
        </Routes>
    );
};

export default AnnouncementMain;