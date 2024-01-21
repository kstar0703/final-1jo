import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityNoticeDiv = styled.div`
    .tbl_box{
        & table {
            width: 100%;
        }
    }
    .align{
        & table > tbody > tr > td:nth-child(2){
            text-align: left !important;
            padding-left: 30px;
        }
    }
`;

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
        <StyledFacilityNoticeDiv>
            <div className='tbl_box align'>
            <table>
                <colgroup>
                    <col width="80" />
                    <col width="" />
                    <col width="180" />
                </colgroup>
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
                            <tr onClick={()=>{navigator(`/facility/notice/${vo.facilitiesNoticeNo}`)}}>
                                <td>{vo.facilitiesNoticeNo}</td>
                                <td>{vo.title}</td>
                                <td>{formatDate(vo.enrollDate)}</td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            </div>
        </StyledFacilityNoticeDiv>
    );
};

export default FacilityNoticeList;