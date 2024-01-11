import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
    const {boardNo} = useParams();
    const [boardVo, setBoardVo] = useState(null);
    
    useEffect(()=>{
        const loadBoardVo = ()=>{
            fetch(`http://127.0.0.1:8888/app/board/detail/${boardNo}`)
            .then(resp=>resp.json())
            .then(data=>{
                setBoardVo(data);
                console.log(data);
            });
        }

        console.log(boardNo);
        loadBoardVo();
    }, [boardNo]);

    return (
        <div>
            test
            {
                boardNo?
                (
                <div>
                    <div>{boardVo.categoryName}</div>
                    <div>{boardVo.title}</div>
                    <div>{boardVo.name}</div>
                    <div>{boardVo.likeCount}</div>
                    <div>{boardVo.hit}</div>
                    <div>{boardVo.enrollDate}</div>
                    <div>{boardVo.replyCount}</div>
                    <div>
                        {boardVo.content}
                    </div>
                    <div>댓글 1</div>
                    <div>공감 1</div>
                    <div>댓글목록</div>
                </div>
                )
                :
                (<h1>loading..</h1>)
            }
        </div>
    );
};

export default BoardDetail;