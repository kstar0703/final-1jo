import React from 'react';

const ManagementList = () => {
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

export default ManagementList;