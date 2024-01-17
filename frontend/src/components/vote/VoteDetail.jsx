import React ,{useEffect,useState} from 'react';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteDetailDiv = styled.div`
  width: 100%;
  height: 100%;
  .detail_heard_box {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tbl_detail_box {
    display: flex;
    justify-content: center;
    align-items: center;
    & table {
      width: 80%;
      font-size: 13px;
      font-weight: 300;
      border-top: 1px solid #000;
      border-bottom: 1px solid #ddd;
      & tbody tr th {
        padding: 15px 0;
        border-bottom: 1px solid #ddd;
        vertical-align: middle;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 100px;
        & div {
          display: flex;
          gap: 30px;
        }
      }
      & tbody tr:last-child th {
        display: flex;
        text-align: center;
        justify-content: center;
        & span {
          padding-bottom: 3em;
        }

        & div {
          width: 100%;
          flex-direction: column;
          & .cont {
            margin: 3em 0 2.5em;
          }
          & button {
            border-radius: 20px;
            height: 70px;
          }
        }
      }

    }
  }
`;

const VoteDetail = () => {

  const navigator = useNavigate();

  // 로그인 멤버 
  const memberNo = JSON.parse(sessionStorage.getItem("loginMember")).memberNo;

  // Params로 받아온 글 번호
  const {voteNo} = useParams();
  
  const [pageInfo, setpageInfo] = useState({
    voteNo,
    prtcNo: memberNo,
  });

  //fetch ::: 글 정보 불러오기 + 회원 투표 여부 조회하기 +종료 되었는지 확인후 정보 가져오기
  let [voteVo, setVoteVo] = useState([]);
  let [voteVoList, setVoteVoList] = useState([]);
  let [voteVoHistory, setVoteVoHistory] = useState([]);
  const loadVoteVo = () => {
    fetch("http://127.0.0.1:8888/app/vote/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageInfo),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setVoteVo(data);
        setVoteVoList(data.voList);
        setVoteVoHistory(data.voHistory)
        const deadLine = new Date(data.deadlineDate);
        const today = new Date();
        // 마감일자 + 현재 시간 비교문
        if(deadLine < today){
          alert("마감된 투표입니다.");
        // 이미 투표한 게시글 확인
        }else if(data.count !== '0'){
          alert("이미 투표한 게시글입니다.");
        }
        
      });
  };
  // 1번만 렌더링
  useEffect(() => {
    loadVoteVo();
  }, []);

  // 투표 항목 + 로그인 회원 번호 담을 변수
  const [radio, setRadio] = useState([]);

  // 항목 클릭 이벤트
  const handleClickRadio = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // 회원 id
    const writerNo = JSON.parse(sessionStorage.getItem("loginMember")).memberNo;
    
    setRadio({
      [name]: value,
      prtcNo: writerNo,
      voteNo: voteNo,
    });
  };
  //fetch ::: 투표 완료 시 정보 보내기
  const HandleSubmit = (e) => {
    if (radio.length < 1) {
      return alert("투표 후 다시 진행해주세요");
    }
    fetch("http://127.0.0.1:8888/app/vote/voting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(radio),
    })
      .then(resp => (resp.json()))
      .then((data)=>{
            if(data === 1){
                navigator("/vote/list");
                alert("투표가 완료되었습니다.");
            }
        });
  };
  
  return (
    <StyledVoteDetailDiv>
      <div className="wrap">
        <div className="detail_heard_box">
          <h1>설문 투표</h1>
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
                  <div>{voteVo.title}</div>
                  <div>{voteVo.hit}</div>
                </th>
              </tr>
              <tr>
                <th>
                  <div>관리자</div>
                  <div>
                    <div>등록일자 : {voteVo.enrollDate}</div>
                    <div>마감일자 : {voteVo.deadlineDate}</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <div>
                    <div className="cont">
                      <h1>{voteVo.content}</h1>
                    </div>
                    {
                      voteVoHistory.length === 0
                      ?
                      voteVoList.map((vo) => (
                      <span>
                        <ul>
                          <li>
                            <label>
                              <input
                                type="radio"
                                value={vo.itemNo}
                                name="itemNo"
                                checked = { voteVo.count === '0' ? null : false}
                                onChange={handleClickRadio}
                              />{" "}
                              {vo.voteOrder}번 {vo.itemName}
                            </label>
                          </li>
                        </ul>
                      </span>
                    ))
                    :
                    voteVoHistory.map((vo) => (
                      <div className='history'>
                        <h3>투표 결과</h3>
                        <div>{vo.voteOrder}번 {vo.voteName}</div>
                        <div>총 투표 수 : {vo.voteCount}표</div>
                      </div>
                    ))
                    }
                    {/*투표 안하고 누르면 막고 팝업창 띄우기*/}
                    { 
                      voteVo.count === '0' && voteVoHistory.length === 0
                    ?
                      <button onClick={HandleSubmit}>투표하기</button>
                      :
                      <></>
                    }
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </StyledVoteDetailDiv>
  );
};

export default VoteDetail;