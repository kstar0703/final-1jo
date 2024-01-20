import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityNoticeDiv = styled.div`

`;

const FacilityNoticeList = () => {
    const {facilitiesNo} = useParams();
    return (
        <StyledFacilityNoticeDiv>
            <div className="ad_wrap">
                <div className="ad_search_box_bg">
                    <div className="ad_tit">
                        <h2>시설 공지사항</h2>
                    </div>

                    <div className="ad_search_box">
                        <div className="search_item">
                            <label form="sel01">번호</label>
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
                            <button className="sty02_btn" >게시판으로 이동</button>
                        </div>
                    </div>
                </div>
                    
                <div class="ad_tbl_box data mt40">
                    <table>

                        <caption>시설 공지사항</caption>

                        <colgroup>
                            <col width="100px" />
                            <col width="" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope='col'>조회</th>
                            <th scope="col">작성자</th>
                            <th scope='col'>작성일</th>
                            <th scope='col'>수정일</th>
                            <th scope='col'>삭제여부</th>
                            <th scope='col'>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    // boardVoList.length === 0
                                    // ?
                                    // <h1>loading..</h1>
                                    // :
                                    // boardVoList.map(vo => <tr key={vo.boardNo} onClick={()=>{navigator(`/admin/board/detail/${vo.boardNo}`)}}>
                                    //         <td>{vo.boardNo}</td>
                                    //         <td>{vo.categoryName}</td>
                                    //         <td>{vo.title}</td>
                                    //         <td>댓글수 수정</td>
                                    //         <td>{vo.dong}동 {vo.name} (아이디)</td>
                                    //         <td>{vo.hit}</td>
                                    //         <td>{vo.likeCount}</td>
                                    //         <td>{vo.enrollDate}</td>
                                    //         <td>{vo.delYn}</td>
                                    //         <td><button className='sty02_btn'>규제</button></td>
                                    //         {/*규제되면 버튼 비활성화*/} 
                                    //     </tr>
                                    // )
                                }
                        </tbody>
                    </table>
                </div>
            </div> 
        </StyledFacilityNoticeDiv>
    );
};

export default FacilityNoticeList;