import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ManagementGraph from './ManagementGraph';

const StyledManagementListDiv = styled.div`
    width: 100%;
    height: 100%;
    .bcc_gray{
        background-color: #eee !important;
    }
    .border_mod{
        font-size: 21px;
        margin: 15px 0 15px 0;
        border: none !important;
        width: 80%;
    }
    .fee_box{
        border: 1px solid #dbe3e6 !important;
        border-radius: 10px !important;
        background-color: BAE2B9;
        padding: 50px;
        margin: 40px 0 40px 0;
        display: grid;
        grid-template-columns: 2.3fr 4fr 1fr 1fr;
        & > :first-child{
            justify-content: initial;
            text-align: right !important;
        } 
        & > :nth-child(2){
            text-align: left;
            margin-left: 70px;
        }
        & > :nth-child(3), :nth-child(4){
            font-size: 19px;
        }
    }
    .table_title {
        display: flex;
        margin-right: 50px;
    }
    .align{
        display: flex;
        flex-direction: column;
    }
    .align_row{
        display: grid;
        grid-template-columns: 1fr 4fr;
        width: 80%;
        margin-top: 40px;
        & table{
            width: 100%;
        }
    }
    .red{
        color: red;
        font-size: 12px;
    }
    .green{
        color: green;
        font-size: 12px;
    }
    .border_top{
        border-top: 2.3px solid black !important;
    }
    .align_2n3{
        tbody > tr > td:nth-child(2){
            text-align: right !important;
        }
        tbody > tr > td:nth-child(3){
            text-align: right !important;
            padding-right: 30px;
        }
        }
`;

const ManagementList = () => {
    const [managementVoList, setManagementVoList] = useState([]);
    const unitNo = JSON.parse(sessionStorage.getItem("loginMember")).unitNo;
    const loadManagementFeeVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/management/list", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({unitNo})
        })
        .then(resp=>resp.json())
        .then(data=>{
            setManagementVoList(data.managementVoList);
            console.log(data.managementVoList);
        })
    }
    useEffect(()=>{
        loadManagementFeeVoList();
    }, []);

    const formatDateUntilThisMonth = (dataString)=>{
        return new Date(dataString).toLocaleString('ko-KR', {year:'numeric', month: 'long'});
    }
    const price = (dateString)=>{
        return parseInt(dateString).toLocaleString();
    }
    const formateDueDate = (dataString)=>{
        const date = new Date(dataString);
        date.setMonth(date.getMonth() + 1);
        return `${date.getFullYear()}. ${date.getMonth()+1}. 20`;
    }
    const differenceCheck = (dataString)=>{
        if(dataString > 0){
            return <span className='red'>( ▲ {`${price(dataString)}`})</span>;
        }else if(dataString < 0){
            return <span className='green'>(▼ {`${price(dataString)}`})</span>;
        }else{
            return `( + ${dataString})`;
        }
    }
    return (
        <StyledManagementListDiv>
            <div className='wrap'>
                <div className='seach_box_bg'>
                    <div className='pageTitle mb30'><h1>세대 관리비 조회</h1></div>
                </div>
                <div className=''>
                
                    <div class="ad_detail_box">
                        <div className='tbl_box mt30 mb10'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th className='bcc_gray'>세대정보</th>
                                        <td>{managementVoList[0]?.dong}동 {managementVoList[0]?.ho}호</td>
                                        <th className='bcc_gray'>세대주</th>
                                        <td>{managementVoList[0]?.name}</td>
                                        <th className='bcc_gray'>이메일</th>
                                        <td>{managementVoList[0]?.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='tbl_box mt10 mb30 align'>
                            <div className='border_mod'>
                                    <div className='fee_box'>
                                        <div>{formatDateUntilThisMonth(managementVoList[0]?.usagePeriod)} 분</div>
                                        <div>{price(managementVoList[0]?.totalAmount)} 원</div>
                                        <div>납부마감일:</div>
                                        <div>{formateDueDate(managementVoList[0]?.usagePeriod)}</div>
                                        {/*전월대비, 미납액, 전체평균*/} 
                                    </div>
                            </div>

                            <div className='align_row'>
                                <div className="table_title">
                                    <h2>상세내역</h2>
                                </div>

                                <table className='border_top align_2n3'>
                                    <caption>세대 관리비 테이블</caption>
                                    <colgroup>
                                        <col width="100" />
                                        <col width="80" />
                                        <col width="50" />
                                        <col width="180" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th colSpan="2" scope="col">이번달 사용</th>
                                            <th scope="col">전월달 사용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>일반관리비</td>
                                            <td>{price(managementVoList[0]?.basicFee)}원</td>
                                            <td>{differenceCheck(managementVoList[1]?.basicFee-managementVoList[0]?.basicFee)}</td>
                                            <td>{price(managementVoList[1]?.basicFee)}원</td>
                                        </tr>
                                        <tr>
                                            <td>세대사용료</td>
                                            <td>{price(managementVoList[0]?.mainternanceFee)}원</td>
                                            <td>{differenceCheck(managementVoList[1]?.mainternanceFee-managementVoList[0]?.mainternanceFee)}</td>
                                            <td>{price(managementVoList[1]?.mainternanceFee)}원</td>
                                        </tr>
                                        <tr>
                                            <td>커뮤니티사용</td>
                                            <td>{price(managementVoList[0]?.facilitiesFee)}원</td>
                                            <td>{differenceCheck(managementVoList[1]?.facilitiesFee-managementVoList[0]?.facilitiesFee)}</td>
                                            <td>{price(managementVoList[1]?.facilitiesFee)}원</td>
                                        </tr>
                                        <tr>
                                            <td>합계</td>
                                            <td>{price(managementVoList[0]?.totalAmount)}원 </td>
                                            <td>{differenceCheck(managementVoList[1]?.totalAmount-managementVoList[0]?.totalAmount)}</td>
                                            <td>{price(managementVoList[1]?.totalAmount)}원</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className='align_row'>
                                <div className="table_title">
                                    <h2>분석</h2>
                                </div>
                                    <ManagementGraph managementVoList={managementVoList}/>
                                <table>
                                    <tr>
                                        
                                    </tr>
                                </table>
                            </div>
                        </div>
                    
                    </div>
                            
                </div>
            </div>
            
                
        </StyledManagementListDiv>
    );
};

export default ManagementList;