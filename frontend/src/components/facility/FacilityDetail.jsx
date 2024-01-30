import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FacilityNoticeList from './notice/FacilityNoticeList';
import FacilityHistoryWrite from './history/FacilityHistoryWrite';
import FacilityHistoryWriteWithClick from './history/FacilityHistoryWriteWithClick';
import styled from 'styled-components';
import FacilityHistoryComplete from './history/FacilityHistoryComplete';

const StyledFacilityDetailDiv = styled.div`
    width: 65%;
    height: 100%;
    .wrap_history{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .font_size{
        font-size: 2em;
        padding: 10px;
    }
    .intro_box{
        display: grid;
        grid-template-columns: 0.8fr 1fr;
        gap: 50px;
        width: 100%;
        padding: 15px 0 30px 0;
        line-height: 1.8;
        .img_box{
            align-items: center;
        }
        & table {
            margin-left: 25px;
            line-height: 2.3;
            text-align: left;
            & tbody > tr > td {
                padding-left: 30px;
            }
        }
    }
    .info_title{
        font-size: 21px;
        margin-bottom: 13px;
    }
    .notice_box{
        width: 100%;
        border-radius: 10px;
        padding: 30px 0px 60px 0px;
        line-height: 1.8;
    }
    .reservation_box{
        width: 100%;
        border: 0.3px solid #ccc;
        border-radius: 8px;
        padding: 30px 50px 30px 50px;
        line-height: 1.8;
    }
`;

const FacilityDetail = () => {
    const navigator = useNavigate();
    let {facilitiesNo} = useParams();
    const [facilityVo, setFacilityVo] = useState({
        facilitiesNo: facilitiesNo
    });
    const loadFaciilityVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facilityVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            setFacilityVo(data.facilityVo);
        })
    }
    useEffect(()=>{
        loadFaciilityVoList();
        console.log("처음~");
    }, [facilitiesNo]);
    const formatContact = (dataString)=>{
        if(dataString != null){
            return dataString.substring(0,2) + "-" + dataString.substring(2,6) + "-" + dataString.substring(6,10);
        }else{
            return '';
        }
    };

    const handleMove = () => {
        //const answer = window.confirm("이동하시겠습니까?");
        //if(answer){
        //    navigator("/facility/list");
        //}
    };
    
    
    
    return (
        <StyledFacilityDetailDiv>
            <div className='wrap_history'>
                {
                    facilityVo?
                    (
                    <div>
                        <div className='ad_tit font_size'>
                            <div>{facilityVo.facilitiesName} 예약</div>
                        </div>
                        <div className='intro_box'>
                            <div className='img_box'>
                                <img src={facilityVo.image} width='100%'/>
                            </div>
                            <div className='info_box'>
                                <div className='info_title'>[ 운영안내 ]</div>
                                    <table>
                                        <colgroup>
                                            <col width="130" />
                                            <col width="300" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>시설 위치</th>
                                                <td>{facilityVo.location}</td>
                                            </tr>
                                            <tr>
                                                <th>운영 시간</th>
                                                <td>{facilityVo.operationTime}</td>
                                            </tr>
                                            <tr>
                                                <th>휴일</th>
                                                <td>{facilityVo.dayOff}</td>
                                            </tr>
                                            <tr>
                                                <th>문의</th>
                                                <td>{formatContact(facilityVo.contact)}</td>
                                            </tr>
                                            <tr>
                                                <th>편의시설</th>
                                                <td>{facilityVo.amenity}</td>
                                            </tr>
                                            <tr>
                                                <th>안내사항</th>
                                                <td>목적외 사용불가</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                        
                            </div>
                        </div>
                    </div>
                    ):(
                        <div>loading..</div>
                    )
                }
            </div>
                
                <div className='notice_box'>
                    <div className='info_title'>[ 공지사항 ]</div>
                    <FacilityNoticeList facilitiesNo={facilitiesNo}/>
                </div>

                <div className='reservation_box'>
                    <div className='info_title'>[ 예약신청 ]</div>
                    <div>
                        
                            <FacilityHistoryWrite facilityVo={facilityVo} onMove={handleMove}/>

                        {/* 선택2
                        <FacilityHistoryWriteWithClick /> */}
                    </div>                    
                </div>
                
                <div>
                    <button className='sty02_btn mtp50' onClick={()=>{navigator("/facility/list")}}>시설목록</button>
                </div>     
        </StyledFacilityDetailDiv>
    );
};

export default FacilityDetail;