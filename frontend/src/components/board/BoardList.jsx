import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../page/Pagination';

const StyledBoardListDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
    }
    .left{
        text-align: left;
        padding: 0 30px;
    }
    .btn_bottom {
        width: 80%;
        display: flex;
        align-items: center;
        padding-top: 20px;
    }
    .btn_under{
        flex-direction: column;
    }

`;

const BoardList = () => {
    //형식변환
    const formatDate = (dateString)=>{
        const option1 = {year: 'numeric', month:'2-digit', day:'2-digit'};
        const preDate = new Date(dateString);
        const today = new Date();
        const isToday = 
            preDate.getDate() === today.getDate() &&
            preDate.getMonth() === today.getMonth() &&
            preDate.getFullYear() === today.getFullYear();
        if(isToday){
            return preDate.toTimeString().substring(0, 5);
        }else{
            return preDate.toLocaleDateString(undefined, option1).substring(0,12);
        }
    }
    
    //페이징
    const [pvo,setPvo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [updateEffect,setUpdateEffect] = useState('');
    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log("선택한페이지" + currentPage);
        setUpdateEffect(updateEffect+'a');
        loadBoardVoList();
    };

    //검색
    const [boardVo, setBoardVo] = useState({});
    const onChange = (e)=>{
        const value = e.target.value;
        setBoardVo({
            ...boardVo,
            searchKeyword: value
        });
    }
    const onClickSearch = (e)=>{
        e.preventDefault();
        loadBoardVoList();
    }

    //데이터조회
    const [boardVoList, setBoardVoList] = useState([]);
    const loadBoardVoList = ()=>{
        console.log(boardVo);
        fetch("http://127.0.0.1:8888/app/board/list", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                pageVo: {currentPage:currentPage},
                ...boardVo
            })
        })
        .then(resp=>resp.json())
        .then(data=>{
            setBoardVoList(data.boardVoList);
            setPvo(data.pageVo);
        });
    }

    
    useEffect(()=>{
        loadBoardVoList();
    }, [updateEffect]);
    const navigator = useNavigate();

    return (
        <StyledBoardListDiv>
            <div className='wrap'>
                {/* 검색창 */}
                    <div className='seach_box_bg'>
                    <div className='mb30'><h1>소통 게시판</h1></div>    
                        <form >
                            <input  type='text' name='searchKeyword' placeholder='키워드 검색' onChange={onChange}/>
                            <input type='submit' value="검색" onClick={onClickSearch}/>
                        </form>
                    </div>

                {/* 본문 */}
                <div className="tbl_box mt40 btn_under">
                    <table>
                        <colgroup>
                                    <col width="10" />
                                    <col width="46" />
                                    <col width="160" />
                                    <col width="50" />
                                    <col width="50" /> 
                                    <col width="1" />
                                    <col width="1" />
                        </colgroup>
                        <thead>
                                <th></th>
                                <th>카테고리</th>
                                <th >제목</th>
                                <th>글쓴이</th>
                                <th>작성일</th>
                                <th>공감</th>  
                                <th>조회</th>
                        </thead>
                        <tbody>
                            {
                                boardVoList.length === 0?
                                <h1>loading..</h1>
                                :
                                boardVoList.map(vo=>
                                    <tr key={vo.boardNo}>
                                        <td>{vo.boardNo}</td>
                                        <td>{vo.categoryName}</td>
                                        <td className='left' onClick={()=>{navigator(`/board/detail/${vo.boardNo}`)}}>{vo.title}</td>
                                        <td>{vo.dong}동 {vo.name}</td>
                                        <td>{formatDate(vo.enrollDate)}</td>
                                        <td>{vo.likeCount}</td>
                                        <td>{vo.hit}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                <div className='btn_bottom'>
                    <button onClick={()=>{navigator("/board/write");}} className='sty02_btn'>글쓰기</button>
                </div>
                <div>
                  <Pagination pvo={pvo} currentPage={currentPage} onPageChange={handlePageChange}/>
                </div>
                </div>
            </div>
            
        </StyledBoardListDiv>
    );
};

export default BoardList;