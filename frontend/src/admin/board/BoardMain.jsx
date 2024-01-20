import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardEdit from './BoardEdit';

const BoardMain = () => {
    return (
        <Routes>
            <Route path='list' element={<BoardList />}/>    
            <Route path='detail/:boardNo' element={<BoardDetail />}/>    
            <Route path='edit' element={<BoardEdit />}/>    
            admin  
        </Routes>
    );
};

export default BoardMain;