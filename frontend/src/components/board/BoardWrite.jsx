import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    form{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .btn_under{
        flex-direction: column;
    }
    .content_box{
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: baseline;
        min-height: 370px;
        & textarea {
            border: none;
                width: 100%;
                flex: 1;
                margin-right: 20px;
                resize: none;
            }
    }
    .btn_space{
        justify-content: space-between;
    }
    .btn_bottom {
        width: 80%;
        display: flex;
        align-items: center;
        padding-top: 20px;
    }
    .info_box{
        padding: 0;
        height: 52px;
        & div > input {
            width: 100%;
            height: 50px;
        }
    }
`;

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
       // setFileObj(e.target.files[0]);
        setFileObj(e.target.files);
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
        // formData.append("files", fileObj);
        for (let i = 0; i < fileObj.length; i++) {
            formData.append("files", fileObj[i]);
         }

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
        <StyledBoardWriteDiv>
            <div className="wrap">
                <div className="detail_heard_box">
                    <h1>소통 게시판</h1>
                </div>

                <div className="tbl_detail_box btn_under">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <table>
                        <tbody> 
                            <caption>소통 게시판 수정하기 테이블</caption>
                                <colgroup>
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                </colgroup>
                            <tr>
                                <th scope="col">
                                    <div className='title_box'>
                                        <div>
                                            <select value={selectedCategory}  onChange={handleChangeCategory}>
                                                <option value="">카테고리 선택</option>
                                                {categoryVoList.map(vo=>(
                                                <option key={vo.categoryNo} value={vo.categoryNo}>{vo.categoryName}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className='info_box'>   
                                    <div>
                                        <input type='text' name='title' placeholder='제목을 입력하세요.' onChange={handleChangeTitle}/>
                                    </div>
                                </th>
                                <th className='content_box'>
                                        <textarea name='content' rows="6" cols="50" placeholder='내용을 입력하세요.' onChange={handleChangeContent}/>
                                </th>
                                <th>
                                    <div>
                                        <input type='file' name='files' multiple='multiple' onChange={handleChangeFile}/>
                                    </div>    
                                </th>
                            </tr>
                        </tbody>
                    </table>       
                    <div className='btn_bottom btn_space'>
                        <div>
                        <button className='sty01_btn' onClick={()=>{navigator("/board/list");}}>취소</button>

                        </div>
                        <div>
                        <input type='submit' value='등록' className='sty02_btn'/> 
                            
                        </div>
                    </div>
                    </form>
                </div>           
            </div>
        </StyledBoardWriteDiv>
    );
};

export default BoardWrite;
