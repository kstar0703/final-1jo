import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardLike from './BoardLike';
import BoardReplyWrite from './reply/BoardReplyWrite';
import BoardReplyList from './reply/BoardReplyList';

const BoardDetail = () => {
   let {boardNo} = useParams();

    const [boardVo, setBoardVo] = useState({
        boardNo : boardNo
    });    
    
    useEffect(()=>{
        const loadBoardVo = ()=>{
            fetch(`http://127.0.0.1:8888/app/board/detail/${boardNo}`)
            .then(resp=>resp.json())
            .then(data=>{setBoardVo(data.boardVo);
            });
        }

        loadBoardVo();
    }, [boardNo]);
    const navigator = useNavigate();

    return (
        <div>
            {
                boardNo?
                (
                <div>
                    <div>{boardVo.categoryName}</div>
                    <div>{boardVo.title}</div>
                    <div>{boardVo.dong}동 {boardVo.name}</div>
                    <div>공감 {boardVo.likeCount}</div>
                    <div>조회 {boardVo.hit}</div>
                    <div>{boardVo.enrollDate}</div>
                    <div>댓글 {boardVo.replyCount}</div>
                    -------------------------------------------
                    <div>{boardVo.content}</div>
                    <div>댓글수 1</div>
                    <BoardLike />
                    <div>
                        <BoardReplyList />
                        <BoardReplyWrite />
                        댓글검색
                    </div>

                </div>
                )
                :
                (<h1>loading..</h1>)
            }
            <button onClick={()=>{navigator("/board/list");}}>목록으로</button>
        </div>
    );
};

export default BoardDetail;