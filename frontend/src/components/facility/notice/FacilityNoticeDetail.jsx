import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FacilityNoticeDetail = () => {
    const {facilitiesNoticeNo} = useParams();
    const [facilityNoticeVo, setFacilityNoticeVo] = useState({
        facilitiesNoticeNo: facilitiesNoticeNo
    });
    const loadFacilityNoticeVo = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/notice/detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({facilitiesNoticeNo: facilitiesNoticeNo})
        })
        .then(resp=>resp.json())
        .then(data=>{
            setFacilityNoticeVo(data.facilityNoticeVo);
            console.log(data);
        })
    }
    useEffect(()=>{
        loadFacilityNoticeVo();
    }, [facilityNoticeVo]);
    const navigator = useNavigate();
    return (
        <div>
            <div>공지상세</div>
            {
                facilityNoticeVo?
                (
                    <div>
                        <div>{facilityNoticeVo.title}</div>
                        <div>{facilityNoticeVo.content}</div>
                    </div>
                ):(
                    <div>loading..</div>
                )
            }
            <div><button onClick={()=>{navigator(`/facility/detail/${facilityNoticeVo.facilitiesNo}`)}}>목록</button></div>
        </div>
    );
};

export default FacilityNoticeDetail;