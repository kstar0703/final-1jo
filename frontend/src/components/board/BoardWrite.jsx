import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardWrite = () => {
    const navigator = useNavigate();

    const [categoryVoList, setCategoryVoList] = useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8888/app/board/category")
        .then(resp=>resp.json())
        .then(data=>{setCategoryVoList(data.categoryVoList);})
    }, []);

    const [selectedCategory, setSelectedCategory] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [fileObj, setFileObj] = useState();


    const handleChangeCategory = (e)=>{
        setSelectedCategory(e.target.value);
    }
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value);
    }
    const handleChangeContent =(e)=>{
        setContent(e.target.value);
    }
    const handleChangeFile = (e)=>{
        setFileObj(e.target.files[0]);
        // if(e.target.files.length > 0){
        //     setFileObj([...e.target.files]);
        // }else{
        //     setFileObj([]);
        // }
    }
    useEffect(()=>{
        console.log(fileObj);
    }, [fileObj]);
    //const writerNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).no
    const writerNo = 1
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("categoryNo", selectedCategory);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("writerNo", writerNo);
        formData.append("files", fileObj);
        // if(fileObj){
        //     if(Array.isArray(fileObj) && fileObj.length > 0){
        //         fileObj.forEach((file, index)=>{
        //             formData.append(`files[${index}]`, file);
        //         });
        //     }else{
        //         formData.append("files", fileObj);            
        //     }
        // }

        console.log(formData);

        fetch("http://127.0.0.1:8888/app/board/write", {
            method: "POST",
            // headers: {
            //     "Content-Type" : "multipart/form-data"
            // },
            body: formData
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                navigator("/board/write/complete");
            }else{
                navigator("/*");
            }
        })

    }


    return (
        <div>
            <div>소통게시판</div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <select value={selectedCategory}  onChange={handleChangeCategory}>
                        <option value="">카테고리 선택</option>
                        {categoryVoList.map(vo=>(
                            <option key={vo.categoryNo} value={vo.categoryNo}>{vo.categoryName}</option>))}
                    </select>
                    </div>
                <div><input type='text' name='title' placeholder='제목을 입력하세요.' onChange={handleChangeTitle}/></div>
                <div><input type='textarea' name='content' placeholder='내용을 입력하세요.' onChange={handleChangeContent}/></div>
                <div><input type='file' name='files' multiple='multiple' onChange={handleChangeFile}/></div>
                <div><input type='submit' value='등록'/> </div>
            </form>
            <button onClick={()=>{navigator("/board/list");}}>취소</button>
        </div>
    );
};

export default BoardWrite;
