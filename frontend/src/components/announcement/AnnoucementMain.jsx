import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnouncementList from './AnnoucementList';
import AnnoucementDetail from './AnnoucementDetail';

const AnnouncementMain = () => {
    return (
        <Routes>
            <Route path='list' element={<AnnouncementList />}/>
            <Route path='detail/:announcementNo' element={<AnnoucementDetail/>}/>
        </Routes>
    );
};

export default AnnouncementMain;