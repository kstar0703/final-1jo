import React from 'react';
import styled from 'styled-components';

const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  & table,
  tr,
  th,
  td {
    border: 1px solid #000;
  }
`;

const Main = () => {
    return (
        <StyledMainDiv>
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
        </StyledMainDiv>
    );
};

export default Main;