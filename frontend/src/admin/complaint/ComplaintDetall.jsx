import React, {useRef,useCallback,useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StryledComplaintDetailDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;

const ComplaintDetall = () => {
  const navigator = useNavigate();

  //글번호 받아오기
  const { voteNo } = useParams();

  const delYn = useRef();

  //useState 설정
  const [voteVo, setVoteVo] = useState([]);
  const [voteVoList, setVoteVoList] = useState([]);
  const [titleValue, setTitleValue] = useState([]);
  const [contentValue, setContentValue] = useState([]);

  //textArear 자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

  return (
    <StryledComplaintDetailDiv>
      <div className="ad_wrap">
        <div class="ad_detail_box">
          <div className="ad_tit">
            <h2>민원처리 상세 조회</h2>
          </div>

          <div className="ad_tbl_box">
            <table>
              <caption>민원처리 상세 테이블</caption>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    <label form="">민원번호</label>
                  </th>
                  <td></td>
                  <th scope="row">
                    <label form="">담당자</label>
                  </th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">작성자 번호</label>
                  </th>
                  <td></td>
                  <th scope="row">
                    <label form="">작성일자</label>
                  </th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">공개여부</label>
                  </th>
                  <td>
                    <div class="form_box">
                      <select ref={delYn} class="sel_box">
                        <option value="N">공개</option>
                        <option value="Y">비공개</option>
                      </select>
                    </div>
                  </td>
                  <th scope="row">
                    <label form="">민원처리상태</label>
                  </th>
                  <td>
                    <div class="form_box">
                      <select class="sel_box">
                        <option value="Y">진행</option>
                        <option value="N">마감</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">민원 처리 일자</label>
                  </th>
                  <td></td>
                  <th scope="row">
                    <label form=""></label>
                  </th>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">제목</label>
                  </th>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">민원 내용</label>
                  </th>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <th scope="row">
                    <label for="inp_03">민원 처리 답변</label>
                  </th>
                  <td colspan="3">
                    <div class="form_box">
                      <textarea
                        ref={textRef}
                        onChange={(e) => {
                          setContentValue(e.target.value);
                        }}
                        onInput={handleResizeHeight}
                        type="text-area"
                        placeholder="값을 입력해주세요"
                        value={contentValue}
                      ></textarea>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ad_btn_div mt20">
            <div>
              <button
                className="sty01_btn"
                onClick={() => {
                  navigator("/admin/complaint/list");
                }}
              >
                목록가기
              </button>
            </div>
            <div>
              <button className="sty02_btn">수정하기</button>
            </div>
          </div>
        </div> 
      </div>
    </StryledComplaintDetailDiv>
  );
};

export default ComplaintDetall;