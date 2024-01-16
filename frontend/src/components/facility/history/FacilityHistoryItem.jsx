import React, { useEffect, useState } from 'react';

const FacilityHistoryItem = () => {
    // const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).no;
    const memberNo = 1
    const [historyVo, setHistoryVo] = useState({
        memberNo : memberNo,
        // startDate : 
        // endDate : 
    });
    const [historyVoList, setHistoryVoList] = useState([]);
    const loadfacilityHistory = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/history", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(historyVo)
        })
        .then(resp=>resp.json())
        .then(data=>{setHistoryVoList(data.historyVoList);})
    }
    useEffect(()=>{
        loadfacilityHistory();
    }, []);
    return (
        <>
            {
                historyVoList.map(vo=>
                    <div>
                        <table>
                            <tr>
                                <th>커뮤니티 이름</th>
                                <td>{vo.facilitiesName}</td>
                            </tr>
                            <tr>
                                <th>결제일시</th>
                                <td>{vo.applicationDate}</td>
                            </tr>
                            <tr>
                                <th>가격</th>
                                <td>{vo.price}원</td>
                            </tr>
                            <tr>
                                <th>사용기간</th>
                                <td>{vo.useDate}</td>
                            </tr>
                            {/* if(vo.useDate ) 조건따라서 취소 화면  */}
                            <tr>
                                <th></th>
                                <td>사용완료</td>                                
                            </tr>
                        </table>
                    </div>
                    )
            }
        </>
    );
};

export default FacilityHistoryItem;