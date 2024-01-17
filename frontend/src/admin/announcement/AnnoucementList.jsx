import React from 'react';
import styled from 'styled-components';

const AnnouncementList = () => {

    const StyledAnnoucementDiv  = styled.div`
             width: 100%;
            height: 100%;
            display: flex;
            flex-direction : column;
    `


    return (
        <StyledAnnoucementDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>설문투표 조회</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">제목</label>
                <div className="form_box">
                  <input type="text" name="title" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">제목제목</label>
                <div className="form_box">
                  <input type="text" name="title" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">제목제목제목</label>
                <div className="form_box">
                  <input type="text" name="title" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">제목</label>
                <div className="form_box">
                  <input type="text" name="title" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">제목제목</label>
                <div className="form_box">
                  <input type="text" name="title" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">제목제목</label>
                <div className="form_box">
                  <select class="sel_box">
                    <option value="">일반문의</option>
                    <option value="">기능문의</option>
                    <option value="">신고문의</option>
                  </select>
                </div>
              </div>
              {/*필요 시 추가 가능*/}
            </div>

            <div className="btn_div">
              <div>
                <button className="sty01_btn">초기화</button>
              </div>
              <div>
                <button className="sty02_btn">검색</button>
              </div>
            </div>
          </div>
          <div class="ad_tbl_box data mt40">
            <table>
              <caption>관리자 투표 테이블</caption>
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
                  <th scope="col">작성자ID</th>
                  <th scope="col">제 목</th>
                  <th scope="col">내 용</th>
                  <th scope="col">조회수</th>
                  <th scope="col">작성일자</th>
                  <th scope="col">마감일자</th>
                  <th scope="col">공개여부</th>
                  <th scope="col">허가여부</th>
                </tr>
              </thead>
              <tbody>
               
                  <h1>loding</h1>
                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </StyledAnnoucementDiv>
    );
};

export default AnnouncementList;