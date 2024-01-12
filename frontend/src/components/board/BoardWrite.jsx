import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
    const navigator = useNavigate();
    const handleChangeFile = ()=>{

    }
    return (
        <div>
            <div>소통게시판</div>
            <form>
                <div>카테고리선택</div>
                <div><input type='text' name='title' placeholder='제목을 입력하세요.' /></div>
                <div><input type='textarea' name='content' placeholder='내용을 입력하세요.'/></div>
                <div><input type='file' name='files' onChange={handleChangeFile}/></div>
            </form>
            <button onClick={()=>{navigator("/board/list");}}>취소</button>
        </div>
    );
};

export default BoardWrite;
