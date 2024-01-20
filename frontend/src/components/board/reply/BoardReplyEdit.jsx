import React, { useState } from 'react';
import styled from 'styled-components';

const StyledBoardReplyEditDiv = styled.div`
    form{
        padding: 25px 0 0 25px;
        & textarea {
            width: 100%;
            resize: none;
            border: 0.1px solid #ccc;
        }
        
    }
    .btn_space{
        justify-content: space-between;
        width: 100%;
    }
    .btn_bottom {
        width: 100%;
        display: flex;
        padding-top: 5px;
    }
    .btn_color{
        background-color: #ccc;
        &:hover{
        background-color: lightcoral;
        color: #fff;
    }
    }
`;

const BoardReplyEdit = ({replyVo, cancelState}) => {
    const [editedContent, setEditedContent] = useState(replyVo.content);

    const handleReplyChange =(e)=>{
        setEditedContent(e.target.value);
    }

    const submitReplyEdit = (e)=>{
        e.preventDefault();
        const updatedReplyVo = {
            ...replyVo,
            content : editedContent
        };
        fetch("http://127.0.0.1:8888/app/board/replyEdit", {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(updatedReplyVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                cancelState();
            }else{
                alert("수정실패");
            }
        })
    }
    const editCancel = ()=>{
        cancelState();
    }
    
    return (
        <StyledBoardReplyEditDiv>
            <form onSubmit={submitReplyEdit}>
                <textarea name='content'rows='6' cols='50' value={editedContent} onChange={handleReplyChange}/>
                <div className='btn_bottom btn_space'>
                    <div><button className='sty01_btn btn_color' onClick={()=>{editCancel()}}>취소</button></div>
                    <div><input type='submit' className='sty02_btn' value='등록'></input></div>
                </div>
            </form>
        </StyledBoardReplyEditDiv>
    );
};

export default BoardReplyEdit;