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
            min-height: 100px;
            align-items: center;
            justify-content: center;
            
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
    .like_area{
        display: flex;
        justify-content: center;
        text-align: center;
        border: 0.3px solid #ccc;
        width: 120px;
        height: 60px;
    }
    .align_inner{
        display: flex;
        flex-direction: column;
    }
    .container_btnbox{
        height: 60px !important;
        border-bottom: 0.5px solid #ccc;
    }
    .bottom_no{
        border-bottom: none
        ;
    }
    .pink_btn{
        background-color: pink;
    }
    .img_area {
        display: flex;
        gap: 10px; 
        width: 100%;
        & img {
            justify-content: baseline;
            width: 33%; 
            height: auto; 
        }
    }
`;

const BoardDetail = () => {
    const memberNo = JSON.parse(sessionStorage.getItem("loginMember")).memberNo;

    let {boardNo} = useParams();
    const [likeCount, setLikeCount] = useState(0);

    const [boardVo, setBoardVo] = useState({
        boardNo: boardNo
    });    
    const [replyCount, setReplyCount] = useState();
    
    useEffect(() => {
        const loadBoardVo = () => {
            fetch(`http://127.0.0.1:8888/app/board/detail/${boardNo}`)
            .then(resp => resp.json())
            .then(data => {
                setBoardVo(data.boardVo);
                setReplyCount(data.boardVo.replyCount);
                console.log(data)
            });
        }

        loadBoardVo();
    }, [boardNo, likeCount]);

    const navigator = useNavigate();

    const handleDelete = () => {
        const answerDel = window.confirm("정말 삭제하시겠습니까?");
        console.log(answerDel);
        if(answerDel){
            fetch("http://127.0.0.1:8888/app/board/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(boardVo)
            })
            .then(resp => resp.json())
            .then(data => {
                if(data.msg === "good") {
                    navigator("/board/list");
                    alert("삭제 완료")
                } else {
                    alert("삭제 실패")
                }
            });
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    }

    console.log(boardVo)


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
                                        {/*<div><BoardLike/></div>*/}
                                        <div>조회 {boardVo.hit}</div>
                                        {/*<div>댓글 {replyCount}</div>*/}
                                    </div>
                                    <div >
                                        <div>{boardVo.enrollDate}</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className='content_box bottom_no'>
                                    <div>{boardVo.content}</div>
                                        {/*<div>댓글수 {replyCount}</div>*/}
                                   {/* 이미지 영역 */}
                                    <div className='img_area'>
                                        <div>
                                            {boardVo?.imgs?.map((img)=>
                                                <img src={img.path} alt="이미지"/>
                                            
                                            )}
                                        </div>
                                    </div>
                                </th>
                                    <div className='container_btnbox'>
                                        <button className='sty02_btn pink_btn'><BoardLike boardNo={boardNo} likeCount={likeCount} setLikeCount={setLikeCount}/></button>
                                    </div>
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
                        
                        {boardVo.writerNo == memberNo? 
                        <>
                            <div>
                                <button className="sty01_btn" onClick={()=>{navigator(`/board/edit/${boardNo}`)}}>수정</button>
                                <button className="sty01_btn ml10" onClick={()=>{handleDelete()}}>삭제</button>
                            </div>

                        </>
                        :
                        <></>
                    }
                    </div>
                </div>
            </div>
        </StyledBoardDetailDiv>
    );
};

export default BoardDetail;