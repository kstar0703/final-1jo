import React from 'react';
import styled from 'styled-components';

const StyledFacilityHistoryListDiv = styled.div`
    width: 100%;
        height: 100%;
        display: flex;
        flex-direction : column;
        
        .ad_wrap_mod{
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        div > div > table > tbody > tr > td {
            text-align: center !important;
        }
        .btn_box{
            margin: 20px 0 100px 0;
            float: right;
        }
        .wid80{
            width: 80%;
        }
`;

const FacilityHistoryList = () => {
    return (
        <StyledFacilityHistoryListDiv>
            <div className="ad_wrap_mod">
                <div className="ad_search_box_bg">
                    <div className="ad_tit">
                        <h2>예약목록</h2>
                    </div>

                    <div className="ad_search_box">
                        <div className="search_item">
                            <label form="sel01" >시설이름</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                        <div className="search_item">
                            <label form="sel01" >신청인</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                        <div className="search_item">
                            <label form="sel01" >이용일</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                        <div className="search_item">
                            <label form="sel01" >신청일</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                        <div className="search_item">
                            <label form="sel01" >취소일</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                    
                        <div className="search_item">
                            <label form="sel01">취소여부</label>
                            <div className="form_box">
                                <select name='delYn' className="sel_box">
                                    <option value='all'></option>
                                    <option value='Y'>취소완료</option>
                                    <option value="N">취소가능/사용완료</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="btn_div">
                        <div>
                            <button className="sty01_btn" >초기화</button>
                        </div>
                        <div>
                            <button className="sty02_btn" >검색</button>
                        </div>
                    </div>
                </div>
                    
                <div class="ad_tbl_box data mt40 mb50">
                    <table>

                        <caption>커뮤니티 예약목록</caption>

                        <colgroup>
                            <col width="60px" />
                            <col width="150px" />
                            <col width="150px" />
                            <col width="80px" />
                            <col width="80px" />
                            <col width="110px" />
                            <col width="150px" />
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                        
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col">신청번호</th>
                            <th scope="col">시설명</th>
                            <th scope="col">이용일시</th>
                            <th scope="col">동</th>
                            <th scope='col'>호</th>
                            <th scope='col'>신청인</th>
                            <th scope='col'>신청일시</th>
                            <th scope='col'>상태</th>
                            {/*취소가능/취소완료/사용완료*/}
                            <th scope='col'>취소일시</th>
                            <th scope='col'>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // facilityVoList.length === 0
                                // ?
                                // <h1>loading..</h1>
                                // :
                                // facilityVoList.map(vo => <tr key={vo.facilitiesNo}>
                                //         <td>{vo.facilitiesNo}</td>
                                //         <td>{vo.delYn === "N"?"O":"X"}</td>
                                //         <td>{vo.facilitiesName}</td>
                                //         <td><img src={vo.image} style={{width: '150px'}}/></td>
                                //         <td>{price(vo.unitPrice)}원</td>
                                //         <td>{formatContact(vo.contact)}</td>
                                //         <td>{vo.operationTime}</td>
                                //         <td>{vo.dayOff}</td>
                                //         <td>{vo.location}</td>
                                //         <td>{vo.amenity}</td>
                                //         <td>{vo.enrollDate}</td>
                                //         <td>{vo.modifyDate == null? "-":vo.modifyDate}</td>
                                //         <td><button onClick={()=>{navigator(`/admin/facility/edit/${vo.facilitiesNo}`);}}>상세</button></td>
                                //         <td><button onClick={()=>{handleDelete(vo)}}>사용전환</button></td>
                                //     </tr>
                                // )
                            }
                        </tbody>
                    </table>
                </div>
            </div> 
        </StyledFacilityHistoryListDiv>
    );
};

export default FacilityHistoryList;