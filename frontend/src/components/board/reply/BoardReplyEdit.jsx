import React, { useState } from 'react';

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
        <div>
            <form onSubmit={submitReplyEdit}>
                <div><input type='textarea' name='content'value={editedContent} onChange={handleReplyChange}/></div>
                <div><input type='submit' value='등록'></input></div>
                <div><button onClick={()=>{editCancel()}}>취소</button></div>
            </form>
        </div>
    );
};

export default BoardReplyEdit;