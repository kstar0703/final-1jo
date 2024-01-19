import { React,useRef, useState ,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// 관리자 수락 및 조회 
const StyledMemberDiv = styled.div`
width: 100%;

display: flex;
flex-direction : column;
`


const ParkingList = () => {
    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>공지사항</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">작성자</label>
                <div className="form_box">
                  <input type="text" name="id"  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01" >제목</label>
                <div className="form_box">
                  <input type="text" name="title"   />
                </div>
              </div>
          
               <div className="search_item">
                <label form="sel01" >내용</label>
                <div className="form_box">
                  <input type="text" name="content"   />
                </div>
              </div>

            
              <div className="search_item">
                <label form="sel01">등록시작일</label>
                <div className="form_box">
                  <input type="date" name='startDate'   />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">등록종료일</label>
                <div className="form_box">
                  <input type="date" name='endDate'  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">숨김여부</label>
                <div className="form_box">
                  <select name='delYn' class="sel_box"  >
                    <option value='all'></option>
                    <option value='Y'>숨김</option>
                    <option value="N">공개</option>
                  </select>
                </div>
                </div>
            </div>

            <div className="btn_div">
              <div>
                <button className="sty01_btn"  >초기화</button>
              </div>
              <div>
                <button className="sty02_btn"  >검색</button>
              </div>

              <div>
                <button className="sty02_btn">공지사항 작성</button>
              </div>
            </div>

             
  
          </div>

          <div class="ad_tbl_box data mt40">
            <table>
              <caption>공지사항 검색</caption>
              <colgroup>
                <col width="100px" />
                <col width="" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
               
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">게시글 번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope='col'>등록일</th>
                  <th scope='col'>상태</th>
                  <th scope='col'>상태처리</th>
                  <th scope='col'>게시글 상세조회 </th>
                 
                </tr>
              </thead>
              <tbody>
          

                
                  
                    
              </tbody>
            </table>
          </div>
        </div>
      </StyledMemberDiv>
    );
};

export default ParkingList;