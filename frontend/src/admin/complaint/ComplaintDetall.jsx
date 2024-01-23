import React, {useRef,useCallback,useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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
  const {complaintNo} = useParams();
  
  //useState 설정
  const [compVo, setCompVo] = useState([]);
  const [managerVoList, setManagerVoList] = useState([]);
  const [reply, setReply] = useState([]);
  const managerNo = useRef();
  const delYn = useRef();
  const status = useRef();


  //textArear 자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    const loadCompVo = () => {
      console.log({complaintNo});
      fetch(`http://127.0.0.1:8888/app/complaint/adminDetail?complaintNo=${complaintNo}`)
      .then(resp=>(resp.json()))
      .then((data)=>{setCompVo(data)})
    } 
    useEffect(()=>{
      loadCompVo();
      managerList();
    },[])

    const hendleSubmit = () => {
      fetch("http://127.0.0.1:8888/app/complaint/clear",{
        method : "POST"
        ,headers : {
          "Content-Type": "application/json",
        }
        ,body : JSON.stringify(
          {
            managerNo : managerNo.current.value,
            delYn : delYn.current.value,
            complaintNo,
          }
        ),
      })
      .then((resp) =>resp.json())
      .then((data)=>{
        if(data === 1){
          alert("답변 및 수정 완료")
        }else{
          alert("에러발생")
        }
      })
    }

    const managerList = () => {
      fetch("http://127.0.0.1:8888/app/admin/managerSelect")
      .then(resp =>(resp.json()))
      .then((data)=>{setManagerVoList(data);})
    }

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
                  <td>
                    { compVo.managerNo > 0
                        ?
                        compVo.managerNo
                        :
                        <div class="form_box">
                          <select ref={managerNo} class="sel_box">
                            {
                              managerVoList?.map((vo)=>(
                                <option value={vo.managerNo}>{vo.managerNo}</option>
                              ))
                            }
                          </select>
                        </div>                        
                      }
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label form="">작성자</label>
                  </th>
                  <td>{compVo?.dong+ "동 "+ compVo?.ho+ "호 " + compVo?.name + " 님"}</td>
                  <th scope="row">
                    <label form="">작성일자</label>
                  </th>
                  <td>{compVo?.enrollDate}</td>
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
                      <select ref={status} class="sel_box">
                        <option value="Y">진행</option>
                        <option value="N">마감</option>
                      </select>
                    </div>
                  </td>
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
                  <td colspan="3">
                    <p>{compVo.content}</p>
                    {
                      compVo?.imgVoList?.map((vo)=> (
                        <img width={500+"px"} src={vo.path + vo.imgName} alt={vo.originName} />
                    ))
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <label for="inp_03">민원 처리 답변</label>
                  </th>
                  <td colspan="3">{compVo.reply}</td>
                </tr>
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
              <button onClick={hendleSubmit} className="sty02_btn">답변 및 수정</button>
            </div>
          </div>
        </div> 
      </div>
    </StryledComplaintDetailDiv>
  );
};

export default ComplaintDetall;