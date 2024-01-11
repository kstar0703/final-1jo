import React from 'react';
import styled from 'styled-components';

const StyledVoteDetailDiv = styled.div`
     .detail_box {
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
    }
    .detail_box .tbl_box {
        border-top: 1px solid #333;
    }
    .detail_box .tbl_box tr:first-child th {
        border-top: 0;
    }
    .detail_box .tbl_box td {
        padding: 5px 10px;
        text-align: left;
    }

    .tbl_box.data {
        border-top: 1px solid #333;
    }
    .tbl_box.data table th {
        padding: 10px;
    }
    .tbl_box.data table td {
        padding: 7px 0;
    }

`;

const VoteDetail = () => {
    return (
        // <StyledVoteDetailDiv>
        //      <div class="container">
        //         <div class="tit_box">
        //             <h2>공지사항 상세 조회</h2>
        //         </div>

        //         <div class="detail_box">
        //             <div class="tbl_group">
        //                 <div class="tbl_box">
        //                     <table>
        //                         <caption>공지사항 상세 테이블</caption>
        //                         <colgroup>
        //                             <col width="15%"/>
        //                             <col width="35%"/>
        //                             <col width="15%"/>
        //                             <col width="35%"/>
        //                         </colgroup>
        //                         <tbody>
        //                             <tr>
        //                                 <th scope="row"><label for="">글번호</label></th>
        //                                 <td>001</td>
        //                                 <th scope="row"><label for="">조회수</label></th>
        //                                 <td>1001</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row"><label for="">작성일자</label></th>
        //                                 <td>2023.11.11 23:00</td>
        //                                 <th scope="row"><label for="">수정일자</label></th>
        //                                 <td>2023.11.11 23:30</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row"><label for="">공개여부</label></th>
        //                                 <td>
        //                                     <div class="form_box">
        //                                         <select class="sel_box">
        //                                             <option value="">공개</option>
        //                                             <option value="">비공개</option>
        //                                         </select>
        //                                     </div>
        //                                 </td>
        //                                 <th scope="row"><label for="">고정여부</label></th>
        //                                 <td>
        //                                     <div class="form_box">
        //                                         <select class="sel_box">
        //                                             <option value="">고정</option>
        //                                             <option value="">미고정</option>
        //                                         </select>
        //                                     </div>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row"><label for="">작성자</label></th>
        //                                 <td colspan="3">관리자</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row"><label for="inp_03">제목</label></th>
        //                                 <td colspan="3">
        //                                     <div class="form_box">
        //                                         <input type="text" id="inp_03">
        //                                     </div>
        //                                 </td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row"><label for="inp_03">내용</label></th>
        //                                 <td colspan="3">
        //                                     <div class="form_box">
        //                                         <textarea >

        //                                         </textarea>
        //                                         {/* <!-- <input type="text" id="inp_03"> --> */}
        //                                     </div>
        //                                 </td>
        //                             </tr>
                                    
        //                         </tbody>
        //                     </table>
        //                 </div>
                        
        //             </div>

        //             <div class="btn_box_group right mt20">
        //                 <div class="btn_box">
        //                     <a href="" class="btn_grayline">목록가기</a>
        //                 </div>
        //                 <div class="btn_box">
        //                     <a href="" class="btn_blue">수정하기</a>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>
        // </StyledVoteDetailDiv>
    );
};

export default VoteDetail;