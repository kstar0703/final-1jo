import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const BoardReply = () => {
    let {boardNo} = useParams();
    console.log(boardNo);
    const boardVo = {boardNo};
    console.log(boardVo);
    const [replyVoList, setReplyVoList] = useState([]);

    useEffect(()=>{
        const loadReplyList = ()=>{
            fetch("http://127.0.0.1:8888/app/board/replyList", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(boardVo)
            }
            )
            .then(resp=>resp.json())
            .then(data=>{setReplyVoList(data.replyVoList);})
        }

        loadReplyList();
    }, [boardNo]);

    return (
        <div>
            [ 댓글목록 ]<br/>
            -------------------------------------------
            {
                            replyVoList.length === 0?
                            <div>댓글작성</div>
                            :
                            replyVoList.map(replyVo=>
                                <div>
                                    <div>{replyVo.dong}동 {replyVo.name}</div>
                                    <div>{replyVo.enrollDate}</div>
                                    <div>{replyVo.content}</div>
                                    -------------------------------------------
                                </div>
                                )
                        }
        </div>
    );
};

export default BoardReply;