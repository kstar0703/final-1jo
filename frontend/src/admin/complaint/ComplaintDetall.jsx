import React, {useRef,useCallback,useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReplyModal from '../../components/complaint/ReplyModal';

const StryledComplaintDetailDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
img{
  padding: 10px;
}
`;

const ComplaintDetall = () => {
  const navigator = useNavigate();
  //글번호 받아오기
  const { complaintNo } = useParams();
  const loginMember = JSON.parse(sessionStorage.getItem("loginMember")).managerNo;
  //useState 설정
  const [compVo, setCompVo] = useState([]);
  const managerNo = useRef();
  const [update, setUpdate] = useState();

  //textArear 자동 스크롤 필요 없으면 지우기
  // const textRef = useRef();
  // const handleResizeHeight = useCallback(() => {
  //   textRef.current.style.height = textRef.current.scrollHeight + "px";
  // }, []);


  //로딩 시 값 불러오기
  const loadCompVo = () => {
    fetch(
      `http://127.0.0.1:8888/app/complaint/adminDetail?complaintNo=${complaintNo}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setCompVo(data);
      });
  };
  useEffect(() => {
    loadCompVo();
  }, [update]);

  //답변수정 모달
  const [modalOpen, setModalOepn] = useState(false);

  //프롭스로 모달에 전달해서 사용
  const modalCloseClick = () => {
    setModalOepn(false);
  };
  //해당 컴포넌트 사용
  const modalOpenClicik = () => {
    setModalOepn(true);
  };
  //필요 없으면 지우기
  const replySubmit = () => {
    setUpdate(update +'1')
  };

  /*필요없으면 지우기*/
  const hendleSubmit = () => {
    fetch("http://127.0.0.1:8888/app/complaint/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        managerNo: managerNo.current.value,
        complaintNo,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data === 1) {
          alert("답변 및 수정 완료");
        } else {
          alert("에러발생");
        }
      });
  };

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
                  <td>{compVo?.complaintNo}</td>
                  <th scope="row">
                    <label form="">담당자</label>
                  </th>
                  <td>{compVo?.managerNo}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">작성자</label>
                  </th>
                  <td>
                    {compVo?.dong +
                      "동 " +
                      compVo?.ho +
                      "호 " +
                      compVo?.name +
                      " 님"}
                  </td>
                  <th scope="row">
                    <label form="">작성일자</label>
                  </th>
                  <td>{compVo?.enrollDate}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">공개여부</label>
                  </th>
                  <td>{compVo?.delYn === "Y" ? "비공개" : "공개"}</td>
                  <th scope="row">
                    <label form="">민원처리상태</label>
                  </th>
                  <td>{compVo?.status === "Y" ? "미처리" : "처리완료"}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">민원 글 제목</label>
                  </th>
                  <td colspan="3">{compVo?.title}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">민원 내용</label>
                  </th>
                  <td colspan="3" className="content_text">
                    <p>
                      {compVo?.content
                        ? compVo?.content.replaceAll("<br/>", "\r\n")
                        : " "}
                    </p>
                    {compVo?.imgVoList?.map((vo) => (
                      <img
                        width={500 + "px"}
                        src={vo.path + vo.imgName}
                        alt={vo.originName}
                      />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label for="inp_03">민원 처리 답변</label>
                  </th>
                  <td colspan="3">
                    {compVo.reply != null
                      ? compVo.reply
                      : "민원 처리 후 '민원처리 조회'에서 '답변 작성' 버튼을 눌러 답변을 적어주세요"}
                  </td>
                </tr>
                {compVo?.status === "Y" ? (
                  <tr>
                    <th scope="row">
                      <label form="">민원 처리 일자</label>
                    </th>
                    <td>{compVo?.replyDate}</td>
                    <th scope="row">
                      <label form=""></label>
                    </th>
                    <td></td>
                  </tr>
                ) : (
                  ""
                )}
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
            {compVo?.managerNo === loginMember ? (
              <div>
                <button onClick={modalOpenClicik} className="sty02_btn">
                  답변 수정
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ReplyModal
        fecthJava={replySubmit}
        closeModal={modalCloseClick}
        isOpen={modalOpen}
        title="민원처리 답변 작성"
        compVo={compVo}
      />
    </StryledComplaintDetailDiv>
  );
};

export default ComplaintDetall;