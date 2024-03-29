import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardWrite from './BoardWrite';
import BoardEdit from './BoardEdit';
import BoardLike from './BoardLike';
import BoardReply from './reply/BoardReplyList';
import BoardDetail from './BoardDetail';
import BoardWriteComplete from './BoardWriteComplete';


const BoardMain = () => {

    return (
        <Routes>
            <Route path='list' element={<BoardList />}/>            
            <Route path='write' element={<BoardWrite />}/>
            <Route path='edit/:boardNo' element={<BoardEdit />}/>
            <Route path='detail/:boardNo' element={<BoardDetail />}/>
            <Route path='like' element={<BoardLike />}/>
            <Route path='reply' element={<BoardReply />}/>
            <Route path='write/complete' element={<BoardWriteComplete />}/>
        </Routes>
    );
};

export default BoardMain;