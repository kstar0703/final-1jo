import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';
import BoardEdit from './BoardEdit';
import BoardDetail from './BoardDetail';
import BoardLike from './BoardLike';
import BoardReply from './BoardReply';


const BoardMain = () => {
    return (
        <Routes>
            <Route path='list' element={<BoardList />}/>            
            <Route path='write' element={<BoardWrite />}/>
            <Route path='edit' element={<BoardEdit />}/>
            <Route path='detail/:boardNo' element={<BoardDetail />}/>
            <Route path='like' element={<BoardLike />}/>
            <Route path='reply' element={<BoardReply />}/>
        </Routes>
    );
};

export default BoardMain;