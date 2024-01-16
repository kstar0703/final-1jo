import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardLike from './BoardLike';
import BoardReplyWrite from './reply/BoardReplyWrite';
import BoardReplyList from './reply/BoardReplyList';
import BoardSearch from './reply/BoardSearch';

const BoardDetail = () => {
   let {boardNo} = useParams();

    const [boardVo, setBoardVo] = useState({
        boardNo : boardNo
    });    
    const [replyCount, setReplyCount] = useState();
    
    useEffect(()=>{
        const loadBoardVo = ()=>{
            fetch(`http://127.0.0.1:8888/app/board/detail/${boardNo}`)
            .then(resp=>resp.json())
            .then(data=>{
                setBoardVo(data.boardVo);
                setReplyCount(data.boardVo.replyCount);
            });
        }

        loadBoardVo();
    }, [boardNo]);
    const navigator = useNavigate();

    const handleDelete = ()=>{
        const answerDel = window.confirm("정말 삭제하시겠습니까?");
        console.log(answerDel);
        if(answerDel){
            fetch("http://127.0.0.1:8888/app/board/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(boardVo)
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "good"){
                    navigator("/board/list");
                    alert("삭제 완료")
                }else{
                    alert("삭제 실패")
                }
        })
        } else{console.log("삭제가 취소되었습니다.");}
    }

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
                    <div>댓글 {replyCount}</div>
                    -------------------------------------------
                    <div>{boardVo.content}</div>
                    <div>댓글수 {replyCount} 수정해야함</div>
                    <BoardLike boardNo={boardNo}/>
                    <div>
                        <BoardReplyList />
                        <BoardReplyWrite boardNo={boardNo} setReplyCount={setReplyCount}/>
                        <BoardSearch />
                    </div>

                </div>
                )
                :
                (<h1>loading..</h1>)
            }
            <div>
                <button onClick={()=>{navigator("/board/list");}}>목록으로</button>
                <button onClick={()=>{navigator(`/board/edit/${boardNo}`)}}>수정</button>
                <button onClick={()=>{handleDelete()}}>삭제</button>
            </div>
        </div>
    );
};

export default BoardDetail;