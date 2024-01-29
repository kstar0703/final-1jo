import React, {useEffect,useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../page/Pagination';

const StyledVoteListDiv = styled.div`
  width: 100%;
  height: 100%;
  /* .seach_box_bg {
    height: 200px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    & form input {
      width: 200px;
      height: 40px;
      border-radius: 10px;
      margin: 10px;
      text-align: center;
    }
    & form input[type="submit"] {
      width: 100px;
      &:hover {
        background-color: lightcoral;
        color: #fff;
      }
    }
  }
  .tbl_box {
    display: flex;
    justify-content: center;
    align-items: center;
    & table {
      width: 80%;
      & th {
        padding: 15px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        vertical-align: middle;
        text-align: center;
        font-size: 13px;
        font-weight: 300;
        &:last-child {
          border-right: none;
        }
      }
      & tbody td {
        padding: 15px 10px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        vertical-align: middle;
        word-break: break-all;
        text-align: center;
        font-size: 13px;
      }
    }
  } */
`;



const VoteList = () => {
    const navigator = useNavigate();
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember")).memberNo;
    let [voteVoList,setVoteVoList] = useState([]);
    const [pvo,setPvo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [updateEffect,setUpdateEffect] = useState('');


    //fetch
    const loadVoteVoList = () => {
        fetch(`http://127.0.0.1:8888/app/vote/list?replyNo=${loginMember}&currentPage=${currentPage}`)
        .then( resp => resp.json() )
        .then((data)=>{
          setVoteVoList(data.voList);
          setPvo(data.pageVo);
        } )
        ;
    }
    useEffect(()=>{
        loadVoteVoList();
    },[updateEffect]);
    
    
    let keyword = useRef();
    const SearcInput = (e) => {
        //키워드 값 넣기
        keyword = {
            title : e.target.value
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        //fetch 갔다가 값 가져오기
        fetch(`http://127.0.0.1:8888/app/vote/select?title=${keyword.title}`)
        .then(resp => (resp.json()))
        .then((data)=>{
          setVoteVoList(data.voList);
          setPvo(data.pageVo);
        })
        ;
    }

    const handlePageChange = (page) => {
      //페이지 

      setCurrentPage(page);
      setUpdateEffect(updateEffect+'a');

    };
    
    return (
        <StyledVoteListDiv>
            <div className='wrap'>
                <div className='seach_box_bg'>
                  <div className='mb30'><h1>설문투표</h1></div> 
                    <form onSubmit={handleSubmit}>
                        <input onBlur={SearcInput} type='text' name='title' placeholder='키워드 검색'/>
                        <input type='submit' value="검색"/>
                    </form>
                </div>

                <div className="tbl_box mt40">
                    <table>
                        <caption>OOOO 테이블</caption>
                        <colgroup>
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
                                <th scope="col">제목</th>
                                <th scope="col">시작일자</th>
                                <th scope="col">마감일자</th>
                                <th scope="col">마감여부</th>
                                <th scope="col">조회수</th>
                                <th scope="col">내투표</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                voteVoList.length ===0
                                ?
                                <h1>검색 결과 없음</h1>
                                :
                                voteVoList.map( vo=>
                                    (<tr onClick={()=>{navigator(`/vote/detail/${vo.voteNo}`)}} key={vo.no} >{/*key={vo.no} */}
                                        <td>{vo.voteNo}</td>
                                        <td>{vo.title}</td>
                                        <td>{vo.enrollDate}</td>
                                        <td>{vo.deadlineDate}</td>
                                        <td>{vo.hit}</td>
                                        <td>{vo.acceptYn === 'Y' ? '진행' : '마감'}</td>
                                        <td>{vo.replyStatus}</td>
                                    </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {}
                <div>
                  <Pagination pvo={pvo} currentPage={currentPage} onPageChange={handlePageChange}/>
                </div>
            </div>
        </StyledVoteListDiv>
    );
};

export default VoteList;