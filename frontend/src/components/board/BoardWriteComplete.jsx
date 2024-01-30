import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardWriteCompleteDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title{
        height: 80px;
        margin-top: 50px;
    }
    .content{
        border: 1px solid #ccc;
        border-radius: 11px;
        width: 500px;
        height: 250px;
        padding: 40px 30px 30px 30px;
        gap: 10px;
        text-align: center;
        margin-top: 50px;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }
    .btn{
        padding-top: 30px;
        display: flex;
        justify-content: center;
        gap: 10px;
    }

`;

const BoardWriteComplete = () => {
    const navigator = useNavigate();
    // const writerNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).no
    const writerNo = 1
    const [boardNo, setBoardNo] = useState();
    console.log(writerNo);
    const handleLatestPost = ()=>{
        fetch(`http://127.0.0.1:8888/app/board/findLatestPost/${writerNo}`)
        .then(resp=>resp.json())
        .then(data=>setBoardNo(data.boardNo));

    }
    navigator(`/board/detail/${boardNo}`)
    return (
        <StyledBoardWriteCompleteDiv>
            <div className='wrap'>
                <div className='title'><h1>소통게시판</h1></div>
                <div className='content'>
                    <div><h2>게시물이 등록되었습니다.</h2></div>
                    <div className='btn'>
                        <button onClick={handleLatestPost} className='sty02_btn'>작성한 글 확인</button>
                        <button onClick={()=>{navigator("/board/list")}} className='sty01_btn'>목록보기</button>
                        <button onClick={()=>{navigator("/board/write")}} className='sty01_btn'>글쓰기</button>
                    </div>
                </div>
            </div>
        </StyledBoardWriteCompleteDiv>
    );
};

export default BoardWriteComplete;