import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    div > div > table > tbody > tr > td {
        text-align: center !important;
        &:nth-child(3) {
            text-align: left !important;
        }
    }
    .mod_btn{
        width: 50px;
    }
`;

const BoardList = () => {
    
    const [boardVoList, setBoardVoList] = useState([]);
    const loadBoardVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/board/admin/list")
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
            setBoardVoList(data.boardVoList);})
        ;
    }
    useEffect(()=>{
        loadBoardVoList();
    }, []);
    const navigator = useNavigate();

    const [banYn, setBanYn] = useState(false);
    const handleBan = (boardNo)=>{
        fetch(`http://127.0.0.1:8888/app/board/admin/ban/${boardNo}`)
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                setBanYn(data.banYn);
                alert("규제처리완료");
            }
        })
    }
    useEffect(()=>{
                loadBoardVoList();
    }, [banYn]);


    return (
        <StyledBoardListDiv>
            <div className="ad_wrap">
                <div className="ad_search_box_bg">
                    <div className="ad_tit">
                        <h2>소통 게시판</h2>
                    </div>

                    <div className="ad_search_box">
                        <div className="search_item">
                            <label form="sel01">작성자</label>
                                <div className="form_box">
                                    <input type="text" name="id" />
                                </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01" >제목</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                    
                        <div className="search_item">
                            <label form="sel01" >내용</label>
                            <div className="form_box">
                            <input type="text" name="content" />
                            </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01">검색시작일</label>
                            <div className="form_box">
                            <input type="date" name='startDate' />
                            </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01">검색종료일</label>
                            <div className="form_box">
                            <input type="date" name='endDate' />
                            </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01">삭제여부</label>
                            <div className="form_box">
                                <select name='delYn' className="sel_box">
                                    <option value='all'></option>
                                    <option value='Y'>삭제</option>
                                    <option value="N">미삭제</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="btn_div">
                        <div>
                            <button className="sty01_btn" >초기화</button>
                        </div>
                        <div>
                            <button className="sty02_btn" >검색</button>
                        </div>
                        <div>
                            <button className="sty02_btn" onClick={()=>{navigator("/board/list")}}>게시판으로 이동</button>
                        </div>
                    </div>
                </div>
                    
                <div class="ad_tbl_box data mt40">
                    <table>

                        <caption>소통 게시판</caption>

                        <colgroup>
                            <col width="100px" />
                            <col width="100px" />
                            <col width="" />
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                        
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col">번호</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">제목</th>
                            <th scope="col">댓글수</th>
                            <th scope="col">글쓴이</th>
                            <th scope='col'>조회</th>
                            <th scope='col'>공감</th>
                            <th scope='col'>작성일</th>
                            <th scope='col'>삭제여부</th>
                            <th scope='col'>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    boardVoList.length === 0
                                    ?
                                    <h1>loading..</h1>
                                    :
                                    boardVoList.map(vo => <tr key={vo.boardNo} >
                                            <td>{vo.boardNo}</td>
                                            <td>{vo.categoryName}</td>
                                            <td onClick={()=>{navigator(`/admin/board/detail/${vo.boardNo}`)}}>{vo.title}</td>
                                            <td>{vo.replyCount}</td>
                                            <td>{vo.dong}동 {vo.name}<br/>({vo.phone})</td>
                                            <td>{vo.hit}</td>
                                            <td>{vo.likeCount}</td>
                                            <td>{vo.enrollDate}</td>
                                            <td>{vo.delYn}</td>
                                            <td>
                                                {vo.banYn === "Y"?"규제완료"
                                                :
                                                <button className='sty02_btn mod_btn' onClick={()=>{handleBan(vo.boardNo)}}>규제</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                        </tbody>
                    </table>
                </div>
                  
            </div> 

                            {/* <div>
                                <div>검색어 </div>
                                <select name='searchType'>
                                    <option value='boardNo'>번호</option>
                                    <option value='categoryNo'>카테고리</option>
                                    <option value='writer'>글쓴이</option>
                                    <option value='content'>내용</option>
                                </select>

                            </div> */}

                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>카테고리</th>
                                        <th>제목</th>
                                        <th>글쓴이</th>
                                        <th>작성일</th>
                                        <th>공감</th>  
                                        <th>조회</th>
                                        <th>삭제여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        boardVoList.length === 0
                                        ?
                                        <h1>loading..</h1>
                                        :
                                        boardVoList.map(vo => <tr key={vo.boardNo} onClick={()=>{navigator(`/admin/board/detail/${vo.boardNo}`)}}>
                                                <td>{vo.boardNo}</td>
                                                <td>{vo.categoryName}</td>
                                                <td>{vo.title}</td>
                                                <td>{vo.dong}동 {vo.name}</td>
                                                <td>{vo.enrollDate}</td>
                                                <td>{vo.likeCount}</td>
                                                <td>{vo.hit}</td>
                                                <td>{vo.delYn}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table> */}
                         
        </StyledBoardListDiv>
    );
};

export default BoardList;