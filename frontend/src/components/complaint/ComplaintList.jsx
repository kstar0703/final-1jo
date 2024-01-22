import React, {useEffect,useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledComplaintListDiv = styled.div`
    width: 100%;
    height: 100%;
    .top_btn_box{
        width: 90%;
        display: flex;
        justify-content: end;
        & button{
            margin: 0 2px;
        }
    }
`;
 

const ComplaintList = () => {
    const navigator = useNavigate();

    //회원번호
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));

    //useState
    let [compVoList,setCompVoList] = useState([]);
    const [staBtn ,  setStaBtn] = useState(
      false
    );
    //fetch 불러오기
    const loadCompVoList = () =>{
        fetch(`http://127.0.0.1:8888/app/complaint/mySumitList?memberNo=${loginMember.memberNo}`)
        .then(resp => (resp.json()))
        .then((data)=>{setCompVoList(data)})
        ;
    }
    useEffect(()=>{
        loadCompVoList();
    },[])

    const handleSelect = () =>{
      if(staBtn === true){
        setStaBtn(
          false
        )
      }else{
          setStaBtn(
            true
          )
        }
    }
    
    return (
      <StyledComplaintListDiv>
        <div className="wrap">
          <div className="seach_box_bg">
            <div className="pageTitle mb30">
              <h1>나의 민원 내역</h1>
            </div>
          </div>
          <div className="top_btn_box mt40">
            <div>{staBtn ? 

              <button onClick={handleSelect} className='sty02_btn'>전체 조회</button>
              :
              <button onClick={handleSelect} className="sty01_btn">미처리 조회</button>
            }
              <button
                className="sty02_btn"
                onClick={() => {
                  navigator("/complaint/write");
                }}
              >
                민원 접수
              </button>
            </div>
          </div>
          <div className="tbl_box mt10">
            <table>
              <caption>나의 민원 처리 내역 테이블</caption>
              <colgroup>
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">민원이미지</th>
                  <th scope="col">민원번호</th>
                  <th scope="col">민원 제목</th>
                  <th scope="col">작성 일자</th>
                  <th scope="col">민원 처리 상태</th>
                </tr>
              </thead>
              <tbody>
                { !staBtn
                ?
                compVoList.map((vo) => (
                  <tr
                    onClick={() => {
                      navigator(`/complaint/detail/${vo.complaintNo}`);
                    }}
                    key={vo.complaintNo}
                  >
                    <td>
                      <img
                        width="60%"
                        height="60%"
                        src={
                          vo.path + vo.imgName
                        }
                        alt={vo.imgName}
                      ></img>
                    </td>
                    <td>{"NUM" + vo.complaintNo}</td>
                    <td>
                      {vo.title}
                    </td>
                    <td>{vo.enrollDate}</td>
                    <td>
                      {vo.status === 'N'
                        ?
                        "처리중"
                        :
                        "처리완료"
                      }
                    </td>
                  </tr>
                ))
                :
                compVoList.filter((vo)=>{return vo.status ==='N'}).map((vo) => (
                  <tr
                    onClick={() => {
                      navigator(`/complaint/detail/${vo.complaintNo}`);
                    }}
                    key={vo.complaintNo}
                  >
                    <td>
                      <img
                        width="60%"
                        height="60%"
                        src={
                          vo.path + vo.imgName
                        }
                        alt={vo.imgName}
                      ></img>
                    </td>
                    <td>{"NUM" + vo.complaintNo}</td>
                    <td>
                      {vo.title}
                    </td>
                    <td>{vo.enrollDate}</td>
                    <td>
                      {vo.status === 'N'
                        ?
                        "처리중"
                        :
                        "처리완료"
                      }
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
      </StyledComplaintListDiv>
    );
};

export default ComplaintList;