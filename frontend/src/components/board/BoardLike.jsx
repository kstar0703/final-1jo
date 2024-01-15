import React from 'react';
import { useParams } from 'react-router-dom';
import { useReplyCount } from '../../context/BoardReplyCountContext';

const BoardLike = () => {
    // const {boardNo} = useParams();
    // const {replyCount, setReplyCount} = useReplyCount();
    return (
        <div>
            {/* 공감 {replyCount}
            {setReplyCount} */}
        </div>
    );
};

export default BoardLike;