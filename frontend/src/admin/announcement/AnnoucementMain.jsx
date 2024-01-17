import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnouncementList from './AnnoucementList';

const AnnouncementMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<AnnouncementList />}/>
        </Routes>
    );
};

export default AnnouncementMain;