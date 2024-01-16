import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FacilityNoticeDetail = () => {
    const {facilitiesNo} = useParams();
    const [facilityNoticeVo, setFacilityNoticeVo] = useState({
        facilitiesNo: facilitiesNo
    });
    const loadFacilityNoticeVo = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/notice/detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facilityNoticeVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            setFacilityNoticeVo(data.facilityNoticeVo);
        })
    }
    useEffect(()=>{
        loadFacilityNoticeVo();
    }, [facilityNoticeVo]);
    return (
        <div>
            공지상세
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
        </div>
    );
};

export default FacilityNoticeDetail;