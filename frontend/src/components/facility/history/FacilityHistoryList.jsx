import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityHistoryDiv = styled.div`
    width: 80%;
    height: 100%;
    .wrap_history{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .font_size{
        font-size: 2em;
        padding: 10px;
    }
    .Myhistory_box{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .search_box{
        width: 100%;
        background-color: #F1F1F1;
        align-items: center;
        & div{
            margin-left: 20px;
            display: flex;
            justify-content: center;
        }
        & input {
            width: 200px;
            padding: 5px 5px 5px 20px;
            border: 0.3px solid #ccc;
            border-radius: 3px;
        }
    }
    .history_cnt_box{
        width: 85%;
        display: flex;
        flex-direction: row;
        gap: 15px;
        margin-left: 15px;
        padding: 10px 0 5px 0;
        & div > span {
            color: red;
            font-weight: 400;
        }
    }
    .history_area{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .history_card{
        width: 87%;
        border: 0.1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        line-height: 1.8;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;        
    }
    .name_box{
        margin: 10px 0 0 50px;
        font-size: 22px;
    }
    .custom-underline{
        border-bottom: 1px solid black;
        padding-bottom: 2px;
    }
    .history_detail_box{
        text-align: left;
        margin-left: 5px;
    }
    .state_box{
        display: flex;
        align-items: center;
        width: 100%;
    }
    .cancel_box{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 20px;
        & button {
            width: 60px;
            height: 30px !important;
            border-radius: 20px;
            justify-content: center;
            align-items: center;
            background-color: #BAE2B9;
            color:#394538;
            &:hover{
                background-color: #394538;
                color: #fff;        
            }
        }
    }
    .btn_left{
        width: 80%;
        display: flex;
        margin-right: auto;
    }
    .red_font{
        color: red !important;
    }

    .cancel_css{
        color: inherit;
        text-decoration: line-through;
        text-decoration-color: #f04e4e;
        text-decoration-thickness: 1.5px;
    }
    .state_css{
        width: 100px;
        height: 38px !important ;
        border-radius: 19px;
        border: 0.3px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .state_cancel_css{
        width: 100px;
        height: 38px !important ;
        border-radius: 19px;
        background-color: #fcd9d9;
        border: 0.3px solid #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

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
    const price = (dataString)=>{
        return parseInt(dataString).toLocaleString();
    }
    
    return (
        <StyledFacilityHistoryDiv>
            <div className='wrap_history'>
                <div className='ad_tit font_size'>예약내역</div>
                <div className='Myhistory_box'>
                    <div className='search_box'>
                        <div>조회기간</div>
                        <input type='date'></input>
                        ~
                        <input type='date'></input>
                        <button className='sty02_btn'>검색</button>
                    </div>

                    <div className='history_cnt_box'>
                        <div>시설 예약 내역</div>
                        <div>총 <span>&nbsp;{historyVoList.length}</span> 건</div>
                    </div>

                    <div className='history_area mt20'>
                        {
                            historyVoList.map(vo=>
                                <div className='history_card mb30'>
                                    <div className='name_box'>
                                        <div><span  className='custom-underline'>{vo.facilitiesName}</span></div>
                                    </div>

                                    <div className='history_detail_box'>
                                        <table>
                                        <colgroup>
                                            <col width="120" />
                                            <col width="" />
                                        </colgroup>
                                            <tbody>
                                                {vo.cancelDate?
                                                    <>
                                                        <tr>
                                                            <th>결제일시</th>
                                                            <td>{vo.applicationDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>가격</th>
                                                            <td><span className='cancel_css'>{price(vo.price)}원</span>&nbsp;&nbsp;<span style={{color: 'red'}}>취소</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{color: 'red'}}>취소일시</th>
                                                            <td style={{color: 'red'}}>{vo.cancelDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>사용일시</th>
                                                            <td>{vo.useDate}</td>
                                                        </tr>
                                                    </>
                                                :
                                                    <>
                                                        <tr>
                                                            <th>결제일시</th>
                                                            <td>{vo.applicationDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>가격</th>
                                                            <td>{price(vo.price)}원</td>
                                                        </tr>
                                                        <tr>
                                                            <th>사용일시</th>
                                                            <td>{vo.useDate}</td>
                                                        </tr>

                                                        </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                

                                    <div className='state_box'>
                                        { vo.cancelDate != null?
                                            (
                                                <div className='state_cancel_css'>취소완료</div>
                                            ):(
                                                new Date(vo.useDate) < new Date()?
                                                    (
                                                        <div className='state_css'>사용완료</div>                                
                                                    ):(
                                                        <div className='cancel_box'>
                                                            <div >취소가능</div>
                                                            <button className='sty01_btn' onClick={()=>{clickCancel(vo.applicationNo)}}>취 소</button>
                                                        </div>
                                                    )
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='btn_left'>
                        <button className='sty02_btn' onClick={()=>{navigator("/facility/list")}}>시설예약</button>
                    </div>
                </div>
            </div>
        </StyledFacilityHistoryDiv>
    );
};



export default FacilityHistoryList;