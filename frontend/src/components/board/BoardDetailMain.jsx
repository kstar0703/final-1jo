import React from 'react';
import BoardDetail from './BoardDetail';
import BoardReply from './reply/BoardReplyList';
import BoardLike from './BoardLike';

const BoardDetailMain = () => {
use
    return (
        <div>
            <BoardDetail boardNo={boardNo}/>
            <BoardLike />
            <BoardReplyMain />
        </div>
    );
};

export default BoardDetailMain;