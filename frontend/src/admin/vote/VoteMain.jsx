import React from 'react';

    // table{
    //     /* 테이블 */
    //     width: 100%;
    //     & th {
    //         padding: 15px 0;
    //         background-color: #f0f0f0;
    //         border-right: 1px solid #ddd;
    //         border-bottom: 1px solid #ddd;
    //         vertical-align: middle;
    //         text-align: center;
    //         font-size: 13px;
    //         font-weight: 300;
    //         color: #949494;
    //         &:last-child {
    //             border-right: none;
    //         }
    //     }
    //     & tbody td {
    //         padding: 15px 10px;
    //         background-color: #fff;
    //         border-right: 1px solid #ddd;
    //         border-bottom: 1px solid #ddd;
    //         vertical-align: middle;
    //         word-break: break-all;
    //         text-align: center;
    //         font-size: 13px;
    //         font-weight: 300;
    //         color: var(--font-color);
            
    //         &:last-child {
    //             border-right: none;
    //         }
    //         & a {
    //             font-size: 13px;
    //             font-weight: 300;
    //             color: var(--font-color);
    //             & :hover {
    //                 color: #000;
    //                 text-decoration: underline;
    //             }
    //         }
    //     }
        
    // }

const VoteMain = () => {
    return (
        <div>
            <div className='wrap'>
                <div className="search_box"></div>
                <div class="tbl_box data mt40">
                    <table>
                        <caption>OOOO 테이블</caption>
                        <colgroup>
                            <col width="" />
                            <col width="" />
                            <col width="" />
                            <col width="" />
                            <col width="" /> 
                            <col width="" />
                            <col width="" />
                            <col width="" />
                            <col width="" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">내용</th>
                                <th scope="col">조회수</th>
                                <th scope="col">작성일자</th>
                                <th scope="col">수정일자</th>
                                <th scope="col">고정여부</th>
                                <th scope="col">공개여부</th>
                            </tr>
                        </thead>
                        <tbody>         
							<tr>
								<td>1testtest</td>
								<td>1testtest</td>
								<td>1testtest</td>
 								<td>1testtest</td> 
								<td>1testtest</td>
								<td>1testtest</td>
								<td>1testtest</td>
								<td>1testtest</td>
								<td>1testtest</td>     
							</tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VoteMain;