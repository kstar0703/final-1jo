import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledComplaintDetailDiv = styled.div`
width: 100%;
height: 100%;


`;

const ComplaintDetail = () => {
    const navigator = useNavigate();

    return (
        <StyledComplaintDetailDiv>
            <div className='wrap'>
                <div className="detail_heard_box">
                    <h1>민원 신청 정보</h1>
                </div>
                <div className="tbl_detail_box">
          <table>
            <caption>투표 상세보기 테이블</caption>
            <colgroup>
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">
                  <div> 제목이란 이런 것이다</div>
                  <div>NUM01</div>
                </th>
              </tr>
              <tr>
                <th>
                  <div>미처리</div>
                  <div>
                    <div>접수일자 : 2024-01-19 05:13:55</div>
                    {/* <div>추가가능</div> */}
                  </div>
                </th>
              </tr>
                <tr>
                    <th>
                        <div>내용입니다 내용입니다. 내용입니다.</div>
                    </th>
              </tr>
              <tr>
                <th>
                    <div>
                        <img width='50%' src='../../resources/logo.svg' alt='img01'/>
                    </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
          <div className="d_btn_div">
          <div>
              <button className="sty01_btn" onClick={()=>{navigator('/complaint/list')}}>목록가기</button>
            </div>
        </div>    
            </div>
        </StyledComplaintDetailDiv>
    );
};

export default ComplaintDetail;