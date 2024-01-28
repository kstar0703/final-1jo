import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardLike = () => {
    // URL에서 boardNo를 가져옵니다.
    const { boardNo } = useParams();
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
    
    // likeCount 상태 변수와 해당 상태를 업데이트하는 함수를 정의합니다.
    const [likeCount, setLikeCount] = useState(0);
    const [boardLikeVo, setBoardLikeVo] = useState({
        memberNo: JSON.parse(sessionStorage.getItem("loginMember")).memberNo,
        boardNo: boardNo
    });

    // API 호출 함수를 정의합니다.
    const loadLikeCount = () => {
        fetch(`http://127.0.0.1:8888/app/board/listLikeCount/${boardNo}`)
            .then(resp => resp.json())
            .then(data => {
                // API 응답에서 받은 데이터로 likeCount를 업데이트합니다.
                setLikeCount(data.likeCount);
            });
    };

    const clickLike = () => {
        fetch("http://127.0.0.1:8888/app/board/clickLike", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(boardLikeVo)
        })
        .then(resp => resp.json())
        .then(data => {
            // API 응답에서 받은 데이터로 likeCount를 업데이트합니다.
            if(data.msg === "good"){
                loadLikeCount();
                setLikeCount();
            }
        });
    }

    // 컴포넌트가 마운트될 때와 boardNo가 변경될 때 API를 호출하여 likeCount를 업데이트합니다.
    useEffect(() => {
        // 컴포넌트가 마운트될 때와 boardNo가 변경될 때 loadLikeCount 함수를 호출하여 likeCount를 업데이트합니다.
        loadLikeCount();
    }, [boardNo, likeCount]); // boardNo가 변경될 때마다 useEffect가 다시 실행되도록 합니다.

    return (
        <div onClick={clickLike}>
            공감 {likeCount}
        </div>
    );
};

export default BoardLike;