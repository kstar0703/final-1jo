import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <div>소통게시판</div>
            <div>게시물이 등록되었습니다.</div>
            <div>
                <button onClick={handleLatestPost}><strong>작성한 글 확인</strong></button>
                <button onClick={()=>{navigator("/board/list")}}>목록보기</button>
                <button onClick={()=>{navigator("/board/write")}}>글쓰기</button>
            </div>
        </div>
    );
};

export default BoardWriteComplete;