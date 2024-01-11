import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';
import BoardEdit from './BoardEdit';
import BoardLike from './BoardLike';
import BoardReply from './reply/BoardReplyList';
import BoardDetailMain from './BoardDetailMain';


const BoardMain = () => {
    return (
        <Routes>
            <Route path='list' element={<BoardList />}/>            
            <Route path='write' element={<BoardWrite />}/>
            <Route path='edit' element={<BoardEdit />}/>
            <Route path='detail/:boardNo' element={<BoardDetailMain />}/>
            <Route path='like' element={<BoardLike />}/>
            <Route path='reply' element={<BoardReply />}/>
        </Routes>
    );
};

export default BoardMain;