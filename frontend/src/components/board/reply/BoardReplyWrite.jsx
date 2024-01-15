import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardReplyWrite = () => {
    const {boardNo} = useParams();
    // const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).no
    const memberNo = 1
    const [inputReplyVo, setInputReplyVo] = useState({
        boardNo : boardNo,
        memberNo : memberNo
    });
    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setInputReplyVo({
            ...inputReplyVo,
            [name] : value
        });
    }
    const handleSubmit = ()=>{
        fetch("http://127.0.0.1:8888/app/board/replyWrite", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputReplyVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data.msg);
        })
    }
    return (
        <div>
            <form>
                <input type='textarea' name='content' placeholder='댓글을 입력하세요.' onChange={handleInputChange}/>
                <div>
                    <button type='submit' onClick={handleSubmit}>작성</button>
                </div>
            </form>
        </div>
    );
};

export default BoardReplyWrite;