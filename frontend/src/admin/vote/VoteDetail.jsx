import React, {useRef,useCallback,useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
     /* .ad_wrap{
        background-color: #f0f0f0;

        & .ad_detail_box{
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & .ad_tit {
                padding: 20px;
                width: 80%;
                margin: 0.5em;
            }
            & .ad_tbl_box{
                width: 80%;
                height: 100%;
                padding: 20px;
                border-radius: 10px;
                background-color: #fff;
                & table{
                    width: 100%;
                    & th {
                        font-size: 13px;
                        font-weight: 300;
                        vertical-align: middle;
                        padding: 15px 0;
                        background-color: #eee;
                    }
                    & td{
                        
                        padding: 5px 10px;
                        text-align: left;
                    } */

                    /* & input, select {
                        width: 100%;
                    }
                    & textarea {
                        width: 100%;
                        resize: none;
                    }
                }
            }
        }
    }  */
    .item_data{
        & th {
            padding: 15px 10px;
        }
        & td {
            padding: 0px 20px;
            & p{
                margin: 0 auto;
            }
        }
    }
    .deadline_div_sty{
        display: flex;
        justify-content: center;
        align-items : center;
        & button{
            margin-left: 10px;
        }
    }


`;


const VoteDetail = () => {
    const navigator = useNavigate();
    
    //글번호 받아오기
    const {voteNo} = useParams();
    
    //useState 설정
    const [voteVo, setVoteVo] = useState([]);
    const [voteVoList,setVoteVoList] = useState([]);
    const [titleValue,setTitleValue] = useState([]);
    const [contentValue,setContentValue] = useState([]);
    const [delYnValue , setDelYnValue] = useState([]);
    const [acceptYnValue, setAcceptYnValue] = useState([]);

    //페이지 로딩 시 정보 받아오기 (게시글 + 투표 항목)
    const loadVoteVo = () =>{
        fetch(`http://127.0.0.1:8888/app/vote/adminDetail?voteNo=${voteNo}`)
        .then((resp)=>resp.json())
        .then((data)=>{
            setVoteVo(data);
            setVoteVoList(data.voList);
            setTitleValue(data.title);
            setContentValue(data.content);
            setDelYnValue(data.delYn);
            setAcceptYnValue(data.acceptYn);
        })
        ;
    }
    useEffect(()=>{
        loadVoteVo();
    },[])

    //textArear 자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);


    //수정하기 버튼 기능 onChange를 이용해서 select 값 받아서 묶어서 넘기기
    const acceptYn = useRef();
    const delYn = useRef();
    
    const handleSubmit = () => {
         fetch("http://127.0.0.1:8888/app/vote/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
            title: titleValue,
            content: contentValue,
            delYn: delYn.current.value,
            acceptYn: acceptYn.current.value,
            voteNo,
          }
          ),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            if (data === 1) {
              alert("수정이 완료되었습니다.");
              navigator("/admin/vote/list");
            }
          });

    }


    return (
        <StyledVoteDetailDiv>
            <div className='ad_wrap'>
                <div class="ad_detail_box">
                    <div className="ad_tit">
                        <h2>설문투표 상세 조회</h2>  
                    </div>

                    <div className='ad_tbl_box'>  
                        <table>
                        <caption>설문투표 상세 테이블</caption>
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                </colgroup>                        
                            <tbody>
                                <tr>
                                    <th scope="row"><label form=''>작성일자</label></th>
                                    <td>{voteVo.enrollDate}</td>
                                    <th scope="row"><label form=''>마감일자</label></th>
                                    <td>{voteVo.deadlineDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form=''>공개여부</label></th>
                                    <td>
                                        <div class="form_box">
                                            <select ref={delYn} value={delYnValue} onChange={(e)=>{setDelYnValue(e.target.value)}} class="sel_box" >
                                                <option value="N">공개</option>
                                                <option value="Y">비공개</option>
                                            </select>
                                        </div>
                                    </td>
                                    <th scope="row"><label form=''>투표 진행</label></th>
                                    <td>
                                        {
                                            voteVo.acceptYn === 'N' /*여기서 마감일자가 현재시간이 지난 이후 인지 확인하기*/
                                            ? 
                                            <div className='deadline_div_sty'><p>마감</p> <button className='sty02_btn_m'>마감 연장</button></div> 
                                            : 
                                        <div class="form_box">
                                            <select ref={acceptYn} value={acceptYnValue} onChange={(e)=>{setAcceptYnValue(e.target.value)}} class="sel_box">
                                                <option value="R">대기</option>
                                                <option value="Y">진행</option>
                                                <option value="N">마감</option>
                                            </select>
                                        </div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">작성자 번호</label></th>
                                    <td>관리자 {voteVo.managerNo}</td>
                                    <th scope="row"><label form="">수정일자</label></th>
                                    <td>{voteVo.modifyDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">제목</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <input type="text" onChange={(e)=>{setTitleValue(e.target.value)}} value={titleValue}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label for="inp_03">글설명</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <textarea ref={textRef} onChange={(e)=>{setContentValue(e.target.value)}} onInput={handleResizeHeight} type="text-area" placeholder="값을 입력해주세요" value={contentValue}></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="4" scope="row"><label form=''>투표항목</label></th>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                    {
                                        voteVoList.map((vo) => (
                                    <span>
                                        <tr className='item_data'>
                                            <th>{vo?.voteOrder}</th>
                                            <td><p>{vo?.itemName}</p><p>00%</p></td>
                                        </tr>
                                    </span>
                                    ))
                                    }   
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label for="inp_03">투표 결과</label></th>
                                    <td>찬성</td>
                                    <td>1번</td>
                                    <td>150표 / 80%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ad_btn_div mt20">
                        <div>
                            <button className='sty01_btn' onClick={()=>{navigator('/admin/vote/list')}}>목록가기</button>
                        </div>
                        <div>
                            <button className='sty02_btn' onClick={handleSubmit}>수정하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </StyledVoteDetailDiv>      
    );
};

export default VoteDetail;