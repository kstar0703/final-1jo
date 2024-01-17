import React ,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteMainDiv = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    .ad_wrap{
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
                width: 65%;
                display: flex;
                justify-content: end;
                gap: 20px 55px;
                & button {
                    width: 100px;
                    height: 28px;
                }
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
                    text-align: center;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }
`;

const VoteList = () => {

    const navigator = useNavigate();

    //fetch
    let [voteVoList,setVoteVoList] = useState([]);

    const loadVoteVoList = () => {
        fetch("http://127.0.0.1:8888/app/vote/adminList")
        .then(resp => resp.json())
        .then((data)=>{setVoteVoList(data);})
        ;
    }
    useEffect(()=>{
        loadVoteVoList();
    },[])
    
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
                {voteVoList.length === 0 ? (
                  <h1>loding</h1>
                ) : (
                  voteVoList.map((vo) => (
                    <tr
                      onClick={() => {
                        navigator(`/vote/detail/${vo.voteNo}`);
                      }}
                    >
                      {/*key={vo.no} */}
                      <td>{vo.voteNo}</td>
                      <td>{vo.managerId}</td>
                      <td>{vo.title}</td>
                      <td>{vo.content}</td>
                      <td>{vo.hit}</td>
                      <td>{vo.enrollDate}</td>
                      <td>{vo.deadlineDate}</td>
                      <td>{vo.delYn}</td>
                      <td>{vo.acceptYn}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </StyledVoteMainDiv>
    );
};

export default VoteList;
