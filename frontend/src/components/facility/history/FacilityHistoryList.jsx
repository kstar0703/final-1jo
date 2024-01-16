import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacilityHistoryList = () => {
    const navigator = useNavigate();
     // const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).no;
     const memberNo = 1
     const [historyVo, setHistoryVo] = useState({
         memberNo : memberNo,
         // startDate : 
         // endDate : 
     });
     const [historyVoList, setHistoryVoList] = useState([]);
     const [cancelVo, setCancelVo] = useState({
            ...historyVo,
            applicationNo: null    
        });

     const loadFacilityHistory = ()=>{
         fetch("http://127.0.0.1:8888/app/facility/history", {
             method: "POST",
             headers: {
                 "Content-Type" : "application/json"
             },
             body: JSON.stringify(historyVo)
         })
         .then(resp=>resp.json())
         .then(data=>{
            setHistoryVoList(data.historyVoList);
        })
    }
    
    useEffect(()=>{
        loadFacilityHistory();
    }, []);

    const clickCancel = (cancelNo)=>{
        const answerCancel = window.confirm("정말 취소 하시겠습니까?");
        if(answerCancel){
            setCancelVo({
                ...historyVo,
                "applicationNo": cancelNo
            });
        }
    }
    const updateHistory = ()=>{
        if(cancelVo.applicationNo != null){
            fetch("http://127.0.0.1:8888/app/facility/cancel", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cancelVo)
            })
            .then(resp=>resp.json())
            .then(data=>{
                if(data.msg === "good"){
                    alert("취소 완료");
                    loadFacilityHistory();
                }else{
                    alert("취소 실패");
                }
            })

        }
    }
    
    useEffect(()=>{
        console.log(cancelVo.applicationNo);
        updateHistory();
    }, [cancelVo]);

    
    return (
        <div>
            <div>
                <div>예약내역</div>
                -----------------------------
                <div>
                    <input type='date'></input>
                    <input type='date'></input>
                </div>
                <div>총 {historyVoList.length}건</div>
                <div>시설 예약내역</div>
                <div>
                    {
                        historyVoList.map(vo=>
                            <div>
                                <table>
                                    <tbody>
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
                                            <th>사용일시</th>
                                            <td>{vo.useDate}</td>
                                        </tr>
                                        {
                                            new Date(vo.useDate) < new Date()?
                                            (
                                            <tr>
                                                <th></th>
                                                <td>사용완료</td>                                
                                            </tr>
                                            ):(
                                            <tr>
                                                <th></th>
                                                <td>
                                                    {
                                                    vo.cancelDate == null?
                                                    (<div>
                                                        <div>취소가능</div>
                                                        <button onClick={()=>{clickCancel(vo.applicationNo)}}>취소</button>
                                                    </div>
                                                    )
                                                    :
                                                    <div>취소완료</div>
                                                }
                                                </td>                                
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
                <div><button onClick={()=>{navigator("/facility/list")}}>예약하기</button></div>
            </div>
        </div>
    );
};



export default FacilityHistoryList;