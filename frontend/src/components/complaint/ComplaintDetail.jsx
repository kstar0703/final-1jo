import React, {useEffect,useState,useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledComplaintDetailDiv = styled.div`
  width: 100%;
  height: 100%;

`;

const ComplaintDetail = () => {
    const navigator = useNavigate();
    const {complaintNo} = useParams();
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));
    const [compVo, setCompVo] = useState();

    const loadCompVo = () => {
      fetch(`http://127.0.0.1:8888/app/complaint/mySumitDetail?complaintNo=${complaintNo}&memberNo=${loginMember.memberNo}`)
      .then(resp => (resp.json()))
      .then((data)=>{
        console.log(data);
        setCompVo(data)
      })
      ;
    }
    useEffect(()=>{
      loadCompVo();
    },[])

    return (
      <StyledComplaintDetailDiv>
        <div className="wrap">
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
                    <div> {compVo?.title}</div>
                    <div>{compVo?.complaintNo}</div>
                  </th>
                </tr>
                <tr>
                  <th>
                    <div>{compVo?.status === "N" ? "미처리" : "처리완료"}</div>
                    <div>
                      <div>접수일자 : {compVo?.enrollDate}</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>
                    <div className="content_text">
                      {compVo?.content
                        ? compVo?.content.replaceAll("<br/>", "\r\n")
                        : " "}
                    </div>
                  </th>
                </tr>
                {
                  compVo?.reply 
                  ?
                  <tr>
                    <th>답변 내용 : {compVo?.reply}</th>

                </tr> 

                  :
                  <></>
                }
                <tr>
                  <th>
                    <div>
                      {compVo?.imgVoList.map((vo) => (
                        <img
                          width="50%"
                          src={vo.path + vo.imgName}
                          alt={vo.originName}
                        />
                      ))}
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d_btn_div">
            <div>
              <button
                className="sty01_btn"
                onClick={() => {
                  navigator("/complaint/list");
                }}
              >
                목록가기
              </button>
            </div>
          </div>
        </div>
      </StyledComplaintDetailDiv>
    );
};

export default ComplaintDetail;