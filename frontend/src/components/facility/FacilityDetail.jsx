import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FacilityNoticeList from './notice/FacilityNoticeList';
import FacilityHistoryWrite from './history/FacilityHistoryWrite';
import FacilityHistoryWriteWithClick from './history/FacilityHistoryWriteWithClick';

const FacilityDetail = () => {
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
        console.log(facilitiesNo);
        loadFaciilityVoList();
    }, [facilitiesNo]);
    const formatContact = (dataString)=>{
        if(dataString != null){
            return dataString.substring(0,2) + "-" + dataString.substring(2,6) + "-" + dataString.substring(6,10);
        }else{
            return '';
        }
    };
    return (
        <div>
            <div>
                커뮤니티 목록 상세<br/>
                --------------------------------------
                {
                    facilityVo?
                    (
                    <div>
                        <div>{facilityVo.facilitiesName}</div>
                        <div><img src={facilityVo.image} /></div>
                            --------------------------------------
                        <div>
                            <div>[ 시설정보 ]</div>
                            <div>운영안내</div>
                            <table>
                                <tr>
                                    <th>시설 위치</th>
                                    <td>{facilityVo.location}</td>
                                </tr>
                                <tr>
                                    <th>운영 시간</th>
                                    <td>{facilityVo.operationTime}월~금</td>
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
                            </table>
                            --------------------------------------
                            </div>
                        </div>
                    ):(
                        <div>loading..</div>
                    )
                }
                <div>
                    <div>[ 공지사항 ]</div>
                    <FacilityNoticeList facilitiesNo={facilitiesNo}/>
                    --------------------------------------
                </div>
                <div>
                    <div>[ 예약신청 ]</div>
                    <FacilityHistoryWrite />
                    선택2
                    <FacilityHistoryWriteWithClick />
                    --------------------------------------
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default FacilityDetail;