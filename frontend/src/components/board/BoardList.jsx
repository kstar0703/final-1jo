import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const formatDate = (dateString)=>{
        const option1 = {year: 'numeric', month:'2-digit', day:'2-digit'};
        const preDate = new Date(dateString);
        const today = new Date();
        const isToday = 
            preDate.getDate() === today.getDate() &&
            preDate.getMonth() === today.getMonth() &&
            preDate.getFullYear() === today.getFullYear();
        if(isToday){
            return preDate.toTimeString().substring(0, 5);
        }else{
            return preDate.toLocaleDateString(undefined, option1).substring(0,12);
        }
    }
    const [boardVoList, setBoardVoList] = useState([]);
    const loadBoardVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/board/list")
        .then(resp=>resp.json())
        .then(data=>{setBoardVoList(data.boardVoList);});
    }
    useEffect(()=>{
        loadBoardVoList();
    }, []);

    return (
        <div>
            <table>
                <thead>
                        <th></th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                        <th>공감</th>  
                        <th>조회</th>
                </thead>
                <tbody>
                    {
                        boardVoList.length === 0?
                        <h1>loading..</h1>
                        :
                        boardVoList.map(vo=>
                            <tr key={vo.boardNo}>
                                <td>{vo.boardNo}</td>
                                <td>{vo.categoryName}</td>
                                <td><Link to={`/board/detail/${vo.boardNo}`}>{vo.title}</Link></td>
                                <td>{vo.dong}동 {vo.name}</td>
                                <td>{formatDate(vo.enrollDate)}</td>
                                <td>{vo.likeCount}</td>
                                <td>{vo.hit}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;