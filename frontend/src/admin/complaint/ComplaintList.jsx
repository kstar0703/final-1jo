import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../components/modal/Modal";
import ReplyModal from "../../components/complaint/ReplyModal";

const StyledComplaintListDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ComplaintList = () => {
    const navigator = useNavigate();
    const managerNo = JSON.parse(sessionStorage.getItem("loginMember")).managerNo
    const titleRef = useRef();
    const managerRef = useRef();
    const enrollsRef = useRef();
    const enrolleRef = useRef();
    const status = useRef();
    const delRef = useRef();

    
    const [compVoList, setCompVoList] = useState([]);
    const loadCompVoList = () => {
      fetch("http://127.0.0.1:8888/app/complaint/adminList")
      .then(resp =>(resp.json()))
      .then((data)=>{
        setCompVoList(data)
      })
    }

    const [update,setUpdate] = useState();
    useEffect(()=>{
      loadCompVoList();
      console.log(managerNo);
    },[update])
    
    const [modalOpen,setModalOepn] = useState(false);
    const [compVo, setCompVo] = useState();

    //프롭스로 모달에 전달해서 사용
    const modalCloseClick = () =>{
      setModalOepn(false)
    }
    //해당 컴포넌트 사용
    const modalOpenClicik = (x) =>{
      setCompVo(x)
      setModalOepn(true)
      
    }
    //필요 없으면 지우기
    const replySubmit = () => {
      alert("성공함");
    } 
    
    //예 아니오 모달
    const [ynModalOpen, setYnModalOpen] = useState(false);
    const [yesNo, setYesNo] = useState();
    //닫기
    const ynModalCloseClick = () =>{
      setYnModalOpen(false)
    }
    //열기
    const ynModalOpenClick = (vo) => {

      console.log(vo)
      setYesNo({...vo})
      setYnModalOpen(true)
    }
    //실행되야 할 함수
    const delYnSubmit = () => {

      console.log(yesNo)
      fetch("http://127.0.0.1:8888/app/complaint/clear",{
        method : "POST"
        ,headers : {
          "Content-Type": "application/json",
        }
        ,body : JSON.stringify(
          {
            managerNo : managerNo,
            delYn : yesNo.delYn === 'Y' ? 'N':'Y',
            complaintNo : yesNo.complaintNo,
          }
        ),
      })
      .then((resp) =>resp.json())
      .then((data)=>{
        if(data === 1){
          alert("답변 및 수정 완료")
          setUpdate(update +'1')
        }else{
          alert("에러발생")
        }
      })
    }
    
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
                <input ref={managerRef} type="text" name="manager" />
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
                <select ref={delRef} class="sel_box">
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
              <button className="sty01_btn">답변</button>
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
              <col width="" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">담당자</th>
                <th scope="col">작성자</th>
                <th scope="col">제 목</th>
                <th scope="col">작성일자</th>
                <th scope="col">공개여부</th>
                <th scope="col">민원처리상태</th>
                <th scope="col">민원 처리</th>
              </tr>
            </thead>
            <tbody>
              {compVoList.map((vo) => (
                <tr>
                  <td
                    onClick={() => {
                      navigator(`/admin/complaint/detail/${vo.complaintNo}`);
                    }}
                    key={vo.complaintNo}
                  >
                    {vo.complaintNo}
                  </td>
                  <td>{vo.managerNo > 0 ? vo.managerNo : "미지정"}</td>
                  <td>{vo.dong + "동" + vo.ho + "호" + vo.name}</td>
                  <td>{vo.title}</td>
                  <td>{vo.enrollDate}</td>
                  <td>
                    <p className="sty01_p">
                      {vo.delYn === "N" ? "공개" : "비공개"}
                    </p>
                    <button
                      className="sty02_btn_m"
                      onClick={() => {
                        ynModalOpenClick(vo);
                      }}
                    >
                      변경하기
                    </button>
                  </td>
                  <td>{vo.status === "Y" ? "처리완료" : "미처리"}</td>
                  <td>
                    {vo.status === "Y" ? (
                      "답변완료"
                    ) : (
                      <button
                        className="sty01_btn_m"
                        onClick={() => {
                          modalOpenClicik(vo);
                        }}
                      >
                        답변 작성
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        fecthJava={delYnSubmit}
        closeModal={ynModalCloseClick}
        isOpen={ynModalOpen}
        title="정말 공개여부를 변경하시겠습니까?"
      />
      <ReplyModal
        fecthJava={replySubmit}
        closeModal={modalCloseClick}
        isOpen={modalOpen}
        title="민원처리 답변 작성"
        compVo={compVo}
      />
    </StyledComplaintListDiv>
  );
};

export default ComplaintList;
