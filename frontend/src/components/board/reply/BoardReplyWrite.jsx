import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardReplyWriteDiv = styled.div`
    .reply_write_box{
        display: flex;
        flex-direction: column;
        padding: 20px 0 20px 0;
        & form {
            width: 100%;

            & textarea {
                width: 100%;
                margin-right: 20px;
                min-height: 100px;
                resize: none;
            }
        }
        & button {
            margin: 10px;
            float: right;
        }
        

    }
`;

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
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault(); 

          }
        }
    return (
        <StyledBoardReplyWriteDiv>
            <div className='reply_write_box'>
                    <form>
                        <textarea rows="10" cols="50" name='content' placeholder='댓글을 입력하세요.' onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                        <button className='sty02_btn' type='submit' onClick={handleSubmit}>등록</button>
                    </form>
            </div>
        </StyledBoardReplyWriteDiv>
    );
};

export default BoardReplyWrite;