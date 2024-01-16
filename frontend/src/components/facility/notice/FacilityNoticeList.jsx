import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const FacilityNoticeList = ({facilitiesNo}) => {
    const [facilityNoticeVo, setFacilityNoticeVo] = useState({
        facilitiesNo: facilitiesNo
    });
    const [facilityNoticeVoList, setFacilityNoticeVoList] = useState([]);
    const loadFacilityNoticeVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/notice/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facilityNoticeVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            setFacilityNoticeVoList(data.facilityNoticeVoList);
        })
    }
    useEffect(()=>{
        loadFacilityNoticeVoList();
    }, []);
    const formatDate = (dataString)=>{
            const date = new Date(dataString);
            return date.toISOString().substring(0,10);
    };
    const navigator = useNavigate();
    return (
        <div>
            <table>
                <thead>
                        <tr>
                            <th></th>
                            <th>제목</th>
                            <th>작성일</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        facilityNoticeVoList === 0?
                        <div>loading..</div>
                        :
                        facilityNoticeVoList.map(vo=>
                            <tr onClick={()=>{navigator(`/facility/notice/${facilitiesNo}`)}}>
                                <td></td>
                                <td>{vo.title}</td>
                                <td>{formatDate(vo.enrollDate)}2023-09-26 17:38</td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FacilityNoticeList;