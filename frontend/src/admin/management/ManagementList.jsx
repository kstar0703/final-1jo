import React from 'react';
import styled from 'styled-components';

const StyledManagementListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    div > div > table > tbody > tr > td {
        text-align: center !important;
    }
`;

const ManagementList = () => {
    return (
        <StyledManagementListDiv>
            <div className="ad_wrap">
                <div className="ad_search_box_bg">
                    <div className="ad_tit">
                        <h2>관리비</h2>
                    </div>

                    <div className="ad_search_box">
                        <div className="search_item">
                            <label form="sel01">세대번호</label>
                                <div className="form_box">
                                    <input type="text" name="id" />
                                </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01" >동</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                    
                        <div className="search_item">
                            <label form="sel01" >호</label>
                            <div className="form_box">
                            <input type="text" name="content" />
                            </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01">사용시작</label>
                            <div className="form_box">
                            <input type="date" name='startDate' />
                            </div>
                        </div>

                        <div className="search_item">
                            <label form="sel01">사용종료</label>
                            <div className="form_box">
                            <input type="date" name='endDate' />
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
                    </div>
                </div>
                    
                <div class="ad_tbl_box data mt40">
                    <table>

                        <caption>소통 게시판</caption>

                        <colgroup>
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                        
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col">청구번호</th>
                            <th scope="col">사용년월 </th>
                            <th scope="col">세대번호</th>
                            <th scope="col">동</th>
                            <th scope="col">호</th>
                            <th scope='col'>일반관리비</th>
                            <th scope='col'>세대사용료</th>
                            <th scope='col'>커뮤니티사용료</th>
                            <th scope='col'>관리비합계</th>
                            {/*상세연결*/}
                            <th scope='col'>관리</th>
                            {/*수정버튼*/}
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
        </StyledManagementListDiv>
    );
};

export default ManagementList;