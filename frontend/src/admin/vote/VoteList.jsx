import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from "../../components/page/Pagination";

const StyledVoteMainDiv = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    /* .ad_wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        & .ad_search_box_bg{
            width: 100%;
            height: 400px;
            background-color: #f0f0f0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & .ad_tit {
                width: 65%;
                margin: 0.5em;
            }
            & .ad_search_box{
                width: 60vw;
                padding: 25px;
                background-color: #fff;
                border-radius: 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap : 30px 55px;
                margin: 15px 0;
                
                
                & .search_item{
                    align-items: center;
                    & label{
                        min-width: 100px;
                    }
                    & .form_box{
                        
                        height : 35px;
    
                        & input, select{
                            width: 11vw;
                            border: 1px solid #ccc;
                            border-radius: 5px;
    
                            &:hover{
                                background-color: aliceblue;
                            }
                        }
                    }
                }
            }
            & .btn_div{
                width: 68%;
                display: flex;
                justify-content: end;
                gap: 10px 20px;
            }
    
        }
        & .ad_tbl_box{
            display: flex;
            justify-content: center;
            
            & table, tr, th, td{
                border : 1px solid #ccc ;
            }
            & table{
                border-top: 2px solid #000 ;
                
                & thead th{
                    background-color: #f0f0f0 !important;
                    border-right: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    vertical-align: middle;
                    font-size: 13px;
                    font-weight: 300;
                    color: #949494;
                    padding: 15px 15px;
                    &:last-child {
                        border-right: none;
                    }
                }
                
                & tbody td{
                    padding: 15px 15px;
                    background-color: #fff;
                    border-right: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    vertical-align: middle;
                    font-size: 13px;
                    font-weight: 300;
                    text-align: center !important;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    } */
`;

const VoteList = () => {
    const navigator = useNavigate();
    //fetch
    let [voteVoList,setVoteVoList] = useState([]);
    const [managerVoList, setManagerVoList] = useState([]);
    const [pvo, setPvo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [updateEffect, setUpdateEffect] = useState("");  
    const loadVoteVoList = () => {
        fetch(
          `http://127.0.0.1:8888/app/vote/adminList?currentPage=${currentPage}`
        )
          .then((resp) => resp.json())
          .then((data) => {
            setVoteVoList(data.voList);
            setPvo(data.pageVo);
          });
    }
    useEffect(() => {
      loadVoteVoList();
      managerList();
    }, [updateEffect]);
    
    const titleRef = useRef();
    const managerRef = useRef();
    const enrollsRef = useRef();
    const enrolleRef = useRef();
    const deadsRes = useRef();
    const deadeRes = useRef();
    const delRes = useRef();
    const acceptRes = useRef();

    const handleSearch = () => {

      fetch("http://127.0.0.1:8888/app/vote/adminSelect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voList : {
            title: titleRef.current.value,
            managerNo: managerRef.current.value,
            enrollDateStart: enrollsRef.current.value,
            enrollDateEnd: enrolleRef.current.value,
            deadlineDateStart: deadsRes.current.value,
            deadlineDateEnd: deadeRes.current.value,
            delYn: delRes.current.value,
            acceptYn: acceptRes.current.value,
          },
          pageVo :{
            currentPage: currentPage,
          }
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setVoteVoList(data.voList);
          setPvo(data.pageVo);
        });
    }

    const managerList = () => {
      fetch("http://127.0.0.1:8888/app/admin/managerSelect")
      .then(resp =>(resp.json()))
      .then((data)=>{setManagerVoList(data);})
    } 

    const handleResetBtn = () => {
      titleRef.current.value = '';
      managerRef.current.value = '';
      enrollsRef.current.value = '';
      enrolleRef.current.value = '';
      deadsRes.current.value = '';
      deadeRes.current.value = '';
      delRes.current.value = '';          
      acceptRes.current.value = '';
    }

    const handlePageChange = (page) => {
      //페이지

      setCurrentPage(page);
      setUpdateEffect(updateEffect + "a");
    };

    return (
      <StyledVoteMainDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>설문투표 조회</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">제목</label>
                <div className="form_box">
                  <input
                    ref={titleRef}
                    type="text"
                    name="title"
                    placeholder=" -"
                  />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">담당자</label>
                <div class="form_box">
                  <select ref={managerRef} class="sel_box">
                    <option value=""> - </option>
                    {managerVoList?.map((vo) => (
                      <option value={vo.managerNo}>{vo.managerNo}</option>
                    ))}
                  </select>
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
                <label form="sel01">마감::시작</label>
                <div className="form_box">
                  <input ref={deadsRes} type="date" name="deadlineDateStart" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">마감::종료 </label>
                <div className="form_box">
                  <input ref={deadeRes} type="date" name="deadlineDateEnd" />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">투표진행</label>
                <div className="form_box">
                  <select ref={acceptRes} class="sel_box">
                    <option value=""> -</option>
                    <option value="R">대기</option>
                    <option value="Y">진행</option>
                    <option value="N">마감</option>
                  </select>
                </div>
              </div>
              <div className="search_item">
                <label form="sel01">공개여부</label>
                <div className="form_box">
                  <select ref={delRes} class="sel_box">
                    <option value=""> -</option>
                    <option value="N">공개</option>
                    <option value="Y">비공개</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="btn_div">
              <div>
                <button onClick={handleResetBtn} className="sty01_btn">
                  초기화
                </button>
              </div>
              <div>
                <button onClick={handleSearch} className="sty02_btn">
                  검색
                </button>
              </div>
              <div>
                <button
                  className="sty01_btn"
                  onClick={() => {
                    navigator("/admin/vote/write");
                  }}
                >
                  작성
                </button>
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
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">담당자</th>
                  <th scope="col">제 목</th>
                  <th scope="col">조회수</th>
                  <th scope="col">작성일자</th>
                  <th scope="col">마감일자</th>
                  <th scope="col">공개여부</th>
                  <th scope="col">투표진행</th>
                </tr>
              </thead>
              <tbody>
                {voteVoList?.length === 0 ? (
                  <h1>검색 결과 없음</h1>
                ) : (
                  voteVoList?.map((vo) => (
                    <tr
                      onClick={() => {
                        navigator(`/admin/vote/detail/${vo.voteNo}`);
                      }}
                    >
                      {/*key={vo.no} */}
                      <td>{vo.voteNo}</td>
                      <td>{vo.managerId}</td>
                      <td>{vo.title}</td>
                      <td>{vo.hit}</td>
                      <td>{vo.enrollDate}</td>
                      <td>{vo.deadlineDate}</td>
                      <td>{vo.delYn === "N" ? "공개" : "비공개"}</td>
                      <td>
                        {vo.acceptYn === "N"
                          ? "마감"
                          : vo.acceptYn === "R"
                          ? "대기"
                          : "진행"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div>
            <Pagination
              pvo={pvo}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </StyledVoteMainDiv>
    );
};

export default VoteList;
