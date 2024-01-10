import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';


const BoardMain = () => {
    return (
        <Routes>
            <Route path='admin/list' element={<BoardList />}/>    
            admin  
        </Routes>
    );
};

export default BoardMain;