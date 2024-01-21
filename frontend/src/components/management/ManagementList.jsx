import React from 'react';
import styled from 'styled-components';

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
        border-radius: 20px !important;
        background-color: #b8f5e2b9;
        padding: 60px;
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
`;

const ManagementList = () => {
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
                                        <td>101동 108호</td>
                                        <th className='bcc_gray'>세대주</th>
                                        <td>박땡땡</td>
                                        <th className='bcc_gray'>이메일</th>
                                        <td>abc@abc.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='tbl_box mt10 mb30 align'>
                            <div className='border_mod'>
                                    <div className='fee_box'>
                                        <div>2024년 1월분</div>
                                        <div>252,080 원</div>
                                        <div>납부마감일:</div>
                                        <div>2024.02.20</div>
                                        {/*전월대비, 미납액, 전체평균*/} 
                                    </div>
                            </div>

                            <div className='align_row'>
                                <div className="table_title">
                                    <h2>상세내역</h2>
                                </div>

                                <table>
                                    <caption>세대 관리비 테이블</caption>
                                    <colgroup>
                                        <col width="150" />
                                        <col width="200" />
                                        <col width="200" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">이번달 사용</th>
                                            <th scope="col">전월달 사용</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>일반관리비</td>
                                            <td>~원</td>
                                            <td>~원</td>
                                        </tr>
                                        <tr>
                                            <td>세대사용료</td>
                                            <td>~원</td>
                                            <td>~원</td>
                                        </tr>
                                        <tr>
                                            <td>커뮤니티사용</td>
                                            <td>~원</td>
                                            <td>~원</td>
                                        </tr>
                                        <tr>
                                            <td>합계</td>
                                            <td>~원</td>
                                            <td>~원</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className='align_row'>
                                <div className="table_title">
                                    <h2>분석</h2>
                                </div>
                                <table>
                                    <tr>
                                        <td>2023</td>
                                        <td>2024</td>
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