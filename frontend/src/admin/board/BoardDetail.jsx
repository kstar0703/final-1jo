import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
`;

const BoardDetail = () => {
    const { boardNo } = useParams();
    return (
        <StyledBoardDetailDiv>
            <div className='ad_wrap'>
                <div class="ad_detail_box">
                    <div className="ad_tit">
                        <h2>소통 게시판 상세 조회</h2>  
                    </div>

                    <div className='ad_tbl_box'>  
                        <table>
                        <caption>소통 게시판 상세 테이블</caption>
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                </colgroup>                        
                            <tbody>
                                <tr>
                                    <th scope="row"><label form=''>글번호</label></th>
                                    <td></td>
                                    <th scope="row"><label form=''>조회수</label></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form=''>등록일</label></th>
                                    <td></td>
                                    <th scope="row"><label form=''>수정일</label></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form=''>삭제여부</label></th>
                                    <td>
                                        <div class="form_box">
                                            <select class="sel_box" >
                                                <option value="N">X</option>
                                                <option value="Y">O</option>
                                            </select>
                                        </div>
                                    </td>
                                    <th scope="row"><label form=''>규제여부</label></th>
                                    <td>
                                        <div class="form_box">
                                            <select class="sel_box">
                                                <option value="Y">X</option>
                                                <option value="N">O</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">작성자명</label></th>
                                    <td></td>
                                    <th scope="row"><label form="">세대정보</label></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">카테고리</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <input type="text" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label for="inp_03">제목</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <textarea type="text-area" placeholder="값을 입력해주세요" ></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="4" scope="row"><label form=''>본문</label></th>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                    {/* {
                                        voteVoList.map((vo) => ( */}
                                    <span>
                                        <tr className='item_data'>
                                            <th></th>
                                            <td></td>
                                        </tr>
                                    </span>
                                    {/* ))
                                    }    */}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label for="inp_03">첨부파일</label></th>
                                    <td colspan="4">첨부파일이름</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ad_btn_div mt20">
                        <div>
                            <button className='sty01_btn' >목록가기</button>
                        </div>
                        <div>
                            <button className='sty01_btn' >규제</button>
                        </div>
                        <div>
                            <button className='sty02_btn' >본문확인</button>
                        </div>
                    </div>

                </div>
            </div>

        </StyledBoardDetailDiv>
    );
};

export default BoardDetail;