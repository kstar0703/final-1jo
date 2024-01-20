import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BoardReplyEdit from './BoardReplyEdit';
import styled from 'styled-components';

const StyledBoardReplyListDiv = styled.div`
    .reply_info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 5px;
    & :first-child{
        margin-right: 10px;
    }
    & div {
        display: flex;
        flex-direction: row;
    }
    }
    button{
        background-color: #F1F1F1;
    }
    .reply_list_box{
        padding: 15px 0px;
    }
`;

const BoardReply = () => {
    let {boardNo} = useParams();
    const boardVo = {boardNo};
    const [replyVoList, setReplyVoList] = useState([]);
    const [editingReply, setEditingReply] = useState(null);

    const loadReplyList = ()=>{
        fetch("http://127.0.0.1:8888/app/board/replyList", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(boardVo)
        }
        )
        .then(resp=>resp.json())
        .then(data=>{setReplyVoList(data.replyVoList);})
    }

    useEffect(()=>{
        loadReplyList();
    }, [boardNo]);
    
    const handleDelete = (replyVo)=>{
        const answerDel = window.confirm("정말 삭제 하시겠습니까?");
        if(answerDel){
            fetch("http://127.0.0.1:8888/app/board/replyDelete", {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(replyVo)
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "good"){
                    alert("삭제 완료");
                    loadReplyList();
                }else{
                    alert("삭제 실패");
                }
            })
        }        
    }
    const handleEdit = (replyVo) =>{
        console.log("클릭됨");
        setEditingReply(replyVo);
    }
    const handleChangeEditCancel = () => {
        setEditingReply(null);
        loadReplyList();
    }

    return (
        <StyledBoardReplyListDiv>

            {
                replyVoList.length === 0?
                <div>댓글작성</div>
                :
                replyVoList.map(replyVo=>
                    <div className='reply_list_box'>
                        <div className='reply_info'>
                            <div>
                                <div>{replyVo.dong}동 {replyVo.name}</div>
                                <div>{replyVo.enrollDate}</div>
                            </div>
                            <div>
                                <div><button onClick={()=>{handleEdit(replyVo)}}>수정</button></div>
                                <div><button onClick={()=>{handleDelete(replyVo)}}>삭제</button></div>
                            </div>

                        </div>
                        <div>
                            <div>{replyVo.content}
                                {editingReply === replyVo && (
                                    <div>
                                        <BoardReplyEdit replyVo={replyVo} cancelState={handleChangeEditCancel}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )
            }
        </StyledBoardReplyListDiv>
    );
};

export default BoardReply;