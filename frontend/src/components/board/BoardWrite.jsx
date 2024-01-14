import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
    const navigator = useNavigate();

    const [category, setCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [fileObj, setFileObj] = useState();
    const handleChangeCategory = ()=>{}
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value);
    }
    const handleChangeContent =(e)=>{
        setContent(e.target.value);
    }
    const handleChangeFile = (e)=>{
        setFileObj(e.target.files);
    
    let isFetching = false;
    }

    const categoryVoList = categoryVoList

    return (
        <div>
            <div>소통게시판</div>
            <form>
                <div>
                    <select value={selectedCategory}  onChange={handleChangeCategory}>
                        <option value="">카테고리 선택</option>
                        {categoryVoList.map(vo=>(
                            <option value={vo.categoryNo}>{vo.categoryName}</option>))}
                    </select>
                    </div>
                <div><input type='text' name='title' placeholder='제목을 입력하세요.' onChange={handleChangeTitle}/></div>
                <div><input type='textarea' name='content' placeholder='내용을 입력하세요.' onChange={handleChangeContent}/></div>
                <div><input type='file' name='files' onChange={handleChangeFile}/></div>
            </form>
            <button onClick={()=>{navigator("/board/list");}}>취소</button>
        </div>
    );
};

export default BoardWrite;
