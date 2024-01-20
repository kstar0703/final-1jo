import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledComplaintListDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ComplaintList = () => {
    const titleRef = useRef();
    const managerRef = useRef();
    const enrollsRef = useRef();
    const enrolleRef = useRef();
    const status = useRef();
    const delRes = useRef();

  return (
    <StyledComplaintListDiv>
      <div className="ad_wrap">
        <div className="ad_search_box_bg">
          <div className="ad_tit">
            <h2>민원처리 조회</h2>
          </div>

          <div className="ad_search_box">
            <div className="search_item">
              <label form="sel01">제목</label>
              <div className="form_box">
                <input ref={titleRef} type="text" name="title" />
              </div>
            </div>

            <div className="search_item">
              <label form="sel01">담당자</label>
              <div className="form_box">
                <input ref={managerRef} type="text" name="title" />
              </div>
            </div>

            <div className="search_item">
              <label form="sel01">작성::시작</label>
              <div className="form_box">
                <input ref={enrollsRef} type="date" name="enrollDateStart" />
              </div>
            </div>

            <div className="search_item">
              <label form="sel01"> 작성::종료 </label>
              <div className="form_box">
                <input ref={enrolleRef} type="date" name="enrollDateEnd" />
              </div>
            </div>

            <div className="search_item">
              <label form="sel01">민원처리</label>
              <div className="form_box">
                <select ref={status} class="sel_box">
                  <option value="N">진행</option>
                  <option value="Y">처리</option>
                </select>
              </div>
            </div>

            <div className="search_item">
              <label form="sel01">공개여부</label>
              <div className="form_box">
                <select ref={delRes} class="sel_box">
                  <option value="N">공개</option>
                  <option value="Y">비공개</option>
                </select>
              </div>
            </div>
          </div>

          <div className="btn_div">
            <div>
              <button className="sty01_btn">초기화</button>
            </div>
            <div>
              <button className="sty02_btn">검색</button>
            </div>
            <div>
              <button className="sty01_btn">작성</button>
            </div>
          </div>
        </div>

        <div class="ad_tbl_box data mt40">
          <table>
            <caption>관리자 민원처리 테이블</caption>
            <colgroup>
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
                <th scope="col">담당자</th>
                <th scope="col">제 목</th>
                <th scope="col">작성일자</th>
                <th scope="col">공개여부</th>
                <th scope="col">민원처리상태</th>
                <th scope="col">민원 처리 일자</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </StyledComplaintListDiv>
  );
};

export default ComplaintList;
