import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnnouncementList from './AnnoucementList';
import AnnoucementDetail from './AnnoucementDetail';
import AnnoucementWrite from './AnnoucementWrite';
import AnnoucementChange from './AnnoucementChange';

const AnnouncementMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<AnnouncementList />}/>
            <Route path='/detail/:announcementNo' element={<AnnoucementDetail/>}/> 
            <Route path='/write' element={<AnnoucementWrite/>}/> 
            <Route path='/change/:announcementNo' element={<AnnoucementChange/>}/>
        </Routes>
    );
};

export default AnnouncementMain;