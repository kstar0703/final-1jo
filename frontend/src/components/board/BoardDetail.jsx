import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardLike from './BoardLike';
import BoardReplyWrite from './reply/BoardReplyWrite';
import BoardReplyList from './reply/BoardReplyList';
import BoardSearch from './reply/BoardSearch';
import styled from 'styled-components';

const StyledBoardDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .reply_box{
        border: 0.5px lightgray;
        background-color: #F1F1F1;
        padding: 10px 30px 20px 30px;
    }
    .title_box{
        display: flex;
        flex-direction: column;
        gap: 10px;
        & :first-child {
            font-size: 10px;
        }
    }
    .info_box{
        display: flex;
        justify-content: space-between;
        & div:first-child {
            flex-direction: row;
        }
    }
    .content_box{
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: baseline;
        & :first-child{
            min-height: 300px;
            
        }
        & :nth-child(2){
            justify-content: initial;
            height: 20px;
        }
    }
    .btn_bottom {
        width: 80%;
        display: flex;
        align-items: center;
        padding-top: 20px;
    }
    .btn_under{
        flex-direction: column;
    }
    .btn_space{
        justify-content: space-between;
    }

    
`;

const BoardDetail = () => {
   let {boardNo} = useParams();

    const [boardVo, setBoardVo] = useState({
        boardNo : boardNo
    });    
    const [replyCount, setReplyCount] = useState();
    
    useEffect(()=>{
        const loadBoardVo = ()=>{
            fetch(`http://127.0.0.1:8888/app/board/detail/${boardNo}`)
            .then(resp=>resp.json())
            .then(data=>{
                setBoardVo(data.boardVo);
                setReplyCount(data.boardVo.replyCount);
            });
        }

        loadBoardVo();
    }, [boardNo]);
    const navigator = useNavigate();

    const handleDelete = ()=>{
        const answerDel = window.confirm("정말 삭제하시겠습니까?");
        console.log(answerDel);
        if(answerDel){
            fetch("http://127.0.0.1:8888/app/board/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(boardVo)
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "good"){
                    navigator("/board/list");
                    alert("삭제 완료")
                }else{
                    alert("삭제 실패")
                }
        })
        } else{console.log("삭제가 취소되었습니다.");}
    }

    return (
        <StyledBoardDetailDiv>
            <div className="wrap">
                <div className="detail_heard_box">
                    <h1>소통 게시판</h1>
                </div>

                <div className="tbl_detail_box btn_under">
                    <table>
                        <tbody> 
                            <caption>소통 게시판 상세보기 테이블</caption>
                                <colgroup>
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                </colgroup>
                            <tr>
                                <th scope="col">
                                    <div className='title_box'>
                                        <div>{boardVo.categoryName}</div>
                                        <div>{boardVo.title}</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className='info_box'>
                                    <div>
                                        <div>{boardVo.dong}동 {boardVo.name}</div>
                                        <div>공감 {boardVo.likeCount}</div>
                                        <div>조회 {boardVo.hit}</div>
                                        <div>댓글 {replyCount}</div>
                                    </div>
                                    <div >
                                        <div>{boardVo.enrollDate}</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className='content_box'>
                                    <div>{boardVo.content}</div>
                                    <div>댓글수 {replyCount} 수정해야함</div>
                                    <BoardLike boardNo={boardNo}/>
                                </th>
                            </tr>
                            <tr>
                                <div className='reply_box mb20'>
                                    <BoardReplyList />
                                    <BoardReplyWrite boardNo={boardNo} setReplyCount={setReplyCount}/>
                                    <BoardSearch />
                                </div>
                            </tr>
                        </tbody>
                    </table>
                    <div className='btn_bottom btn_space '>
                        <div>
                            <button className="sty02_btn" onClick={()=>{navigator("/board/list");}}>목록으로</button>
                        </div>
                        
                        <div>
                            <button className="sty01_btn" onClick={()=>{navigator(`/board/edit/${boardNo}`)}}>수정</button>
                            <button className="sty01_btn ml10" onClick={()=>{handleDelete()}}>삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </StyledBoardDetailDiv>
    );
};

export default BoardDetail;