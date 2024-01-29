import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityNoticeDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .content_box{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        & :first-child{
            min-height: 10px;
            
        }
        & :nth-child(2){
            justify-content: initial;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }
    .btn_bottom {
        width: 80%;
        display: flex;
        align-items: center;
        padding-top: 20px;
    }
    .btn_under{
        flex-direction: column;
    }
    .btn_space{
        justify-content: space-between;
    }

`;
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
    }, []);
    const navigator = useNavigate();

    return (
        <StyledFacilityNoticeDetailDiv>
            <div className="wrap">
                <div className="detail_heard_box">
                    <h1>커뮤니티 공지사항</h1>
                </div>

                <div className="tbl_detail_box btn_under">
                    <table>
                        <tbody> 
                            <caption>소통 게시판 상세보기 테이블</caption>
                                <colgroup>
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                </colgroup>
                                <tr>
                                    <th scope="col">
                                        <div>{facilityNoticeVo.title}</div>
                                        <div>{facilityNoticeVo.enrollDate}</div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className='content_box bottom_no'>
                                        <div>{facilityNoticeVo.content}</div>
                                        <img src={facilityNoticeVo.fileName} style={{width: '50%'}}/>
                                    </th>
                                </tr>
                        </tbody>
                    </table>
                    <div className='btn_bottom btn_space '>
                        <div>
                            <button className="sty02_btn" onClick={()=>{navigator(`/facility/detail/${facilityNoticeVo.facilitiesNo}`)}}>목록으로</button>
                        </div>
                    </div>
                </div>
            </div>
        </StyledFacilityNoticeDetailDiv>
    );
};

export default FacilityNoticeDetail;