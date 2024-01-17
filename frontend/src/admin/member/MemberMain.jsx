import React from 'react';
import SerachMember from './SerachMember';
import { Route, Routes } from 'react-router-dom';


const MemberMain = () => {
    return (
        <Routes>
        <Route path='/search' element={<SerachMember />}/>
        </Routes>
    );
};

export default MemberMain;