import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
    
    const [boardVoList, setBoardVoList] = useState([]);
    const loadBoardVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/board/admin/list")
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
            setBoardVoList(data.boardVoList);})
        ;
    }
    useEffect(()=>{
        loadBoardVoList();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                        <th>공감</th>  
                        <th>조회</th>
                        <th>삭제여부</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardVoList.length === 0
                        ?
                        <h1>loading..</h1>
                        :
                        boardVoList.map(vo => <tr key={vo.boardNo}>
                                <td>{vo.boardNo}</td>
                                <td>{vo.categoryName}</td>
                                <td><Link to={`/board/detail/${vo.boardNo}`}>{vo.title}</Link></td>
                                <td>{vo.dong}동 {vo.name}</td>
                                <td>{vo.enrollDate}</td>
                                <td>{vo.likeCount}</td>
                                <td>{vo.hit}</td>
                                <td>{vo.delYn}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    );
};

export default BoardList;