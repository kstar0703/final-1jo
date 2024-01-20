import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FacilityNoticeList from './notice/FacilityNoticeList';

const StyledFacilityEditDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    img {
        margin-right: 20px;
    }
    .select_box{
        display: flex;
        flex-direction: row;
        float: left;
        & label {
            display: flex;
            align-items: center;
            & span {
                width: 100px;
            }
        }
    }
    
`;

const FacilityEdit = () => {
    let {facilitiesNo} = useParams();
    const navigator = useNavigate();
    const [facilityVo, setFacilityVo] = useState({
        facilitiesNo: facilitiesNo
    });
    useEffect(()=>{
        const loadFacilityVo = ()=>{
            fetch("http://127.0.0.1:8888/app/facility/admin/detail", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(facilityVo)
            })
            .then(resp=>resp.json())
            .then(data=>{
                setFacilityVo(data.facilityVo);
                console.log(data.facilityVo);
                setFacilitiesName(data.facilityVo.facilitiesName);
                setDelYn(data.facilityVo.delYn);
                setContact(data.facilityVo.contact);
                setUnitPrice(data.facilityVo.unitPrice);
                setOperationTime(data.facilityVo.operationTime);
                setLocation(data.facilityVo.location);
                setDayOff(data.facilityVo.dayOff);
                setAmenity(data.facilityVo.amenity);
                setEnrollDate(data.facilityVo.enrollDate);
                setModifyDate(data.facilityVo.modifyDate);
                setFile(data.facilityVo.image);
        });
    }
    loadFacilityVo();
    }, [facilitiesNo]);

    //화면 정돈 
    const onInputContact = (event) => {
        

      }
    
    let isFetching = false;

    const [facilitiesName, setFacilitiesName] = useState("");
    const [delYn, setDelYn] = useState();
    const [contact, setContact] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [operationTime, setOperationTime] = useState();
    const [location, setLocation] = useState();
    const [dayOff, setDayOff] = useState();
    const [amenity, setAmenity] = useState();
    const [enrollDate, setEnrollDate] = useState();
    const [modifyDate, setModifyDate] = useState();
    const [file, setFile] = useState(null);

    const handleChangeFacilitiesName = (e)=>{
        setFacilitiesName(e.target.value);
    }
    const handleChangeDelYn = (e)=>{
        setDelYn(e.target.value);
    }
    const handleChangeUnitPrice = (e)=>{
        setUnitPrice(e.target.value);
    }
    const handleChangeOperationTime = (e)=>{
        setOperationTime(e.target.value);
    }
    const handleChangeLocation = (e)=>{
        setLocation(e.target.value);
    }
    const handleChangeDayOff = (e)=>{
        setDayOff(e.target.value);
    }
    const handleChangeAmenity = (e)=>{
        setAmenity(e.target.value);
    }
    const handleChangeImage = (e)=>{
        setFile(e.target.files[0]);
    }

    //데이터 전송

    const handleSubmit = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        console.log(facilitiesName);
        fd.append("facilitiesName", facilitiesName);
        fd.append("delYn", delYn);
        fd.append("contact", contact);
        fd.append("unitPrice", unitPrice);
        fd.append("operationTime", operationTime);
        fd.append("location", location);
        fd.append("dayOff", dayOff);
        fd.append("amenity", amenity);
        fd.append("file", file);
        console.log("FormData", fd);
        console.log("담은facilitiesName", facilitiesName);
        console.log("담은location", location);

        fetch("http://127.0.0.1:8888/app/facility/admin/edit", {
            method: "PUT",
            body: fd
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert("시설 수정 성공");
                navigator("/admin/facility/list");
            }else{
                alert("시설 수정 실패");
            }
        });        
    }

    return (
        <StyledFacilityEditDiv>
            <div className='ad_wrap'>
                <div class="ad_detail_box">
                    <div className="ad_tit">
                        <h2>커뮤니티 시설정보/수정</h2>  
                    </div>

                    <div className='ad_tbl_box'>  
                        <table>
                        <caption>커뮤니티시설 상세 테이블</caption>
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                </colgroup>                        
                            <tbody>
                                <tr>
                                    <th scope="row"><label form=''>시설번호</label></th>
                                    <td><input type='text' name='facilitiesNo' value={facilitiesNo}></input></td>
                                    <th scope="row"><label form=''>사용여부</label></th>
                                    <td>
                                        <div class="select_box">
                                            <label><input type='radio' name='delYn' value='N' onChange={handleChangeDelYn} checked='checked'/><span>가능</span></label>
                                            <label><input type='radio' name='delYn' value='Y' onChange={handleChangeDelYn}/><span>불가능</span></label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form=''>시설명</label></th>
                                    <td><input type='text' name='facilitiesName' onChange={handleChangeFacilitiesName} value={facilitiesName}></input></td>
                                    <th scope="row"><label form=''>문의</label></th>
                                    <td><input type='text' name='contact' onInput={onInputContact} value={contact}></input></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">이미지</label></th>
                                    <td>
                                        <div class="form_box">
                                            <img src={file} width='100px'/>
                                            <input type='file' name='file' onChange={handleChangeImage}></input>
                                        </div>
                                    </td>

                                    <th scope="row"><label form="">위치</label></th>
                                    <td><input type='text' name='location' onChange={handleChangeLocation} value={location}></input></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">단가</label></th>
                                    <td><input type='text' name='unitPrice' onChange={handleChangeUnitPrice} value={unitPrice}></input></td>
                                    <th scope="row"><label form="">운영시간</label></th>
                                    <td><input type='text' name='operationTime' onChange={handleChangeOperationTime} value={operationTime}></input></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">편의시설</label></th>
                                    <td><input type='text' name='amenity' onChange={handleChangeAmenity} value={amenity}></input></td>
                                    <th scope="row"><label form="">휴일</label></th>
                                    <td><input type='text' name='dayOff' onChange={handleChangeDayOff} value={dayOff}></input></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">등록일</label></th>
                                    <td>{enrollDate}</td>
                                    <th scope="row"><label form="">최근 수정일</label></th>
                                    <td>{modifyDate == null? "-":modifyDate}</td>
                                </tr>
                                
                                <tr>
                                    <th colspan="4" scope="row"><label form=''>안내사항</label></th>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="form_box">
                                            <textarea type="text-area" placeholder="값을 입력해주세요" ></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ad_btn_div mt20">
                        <div>
                            <button className='sty01_btn' onClick={()=>{navigator("/admin/facility/list");}}>취소</button>
                        </div>
                        <div>
                            <button className='sty02_btn' onClick={handleSubmit} >수정완료</button>
                        </div>
                    </div>

                </div>

                <div>
                    <FacilityNoticeList />
                </div>




            </div>
                {/* <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                                <th>시설 이름</th>
                                <td><input type='text' name='facilitiesName' onChange={handleChangeFacilitiesName} value={facilitiesName}></input></td>
                                <th>사용여부</th>
                                <td>
                                    <label><input type='radio' name='delYn' value='N' onChange={handleChangeDelYn} checked='checked'/>가능</label>
                                    <label><input type='radio' name='delYn' value='Y' onChange={handleChangeDelYn}/>불가능</label>
                                </td>
                            </tr>
                            <tr>
                                <th>이미지</th>  
                                <td><input type='file' name='file' onChange={handleChangeImage}></input></td>
                                <th>문의</th>
                                <td><input type='text' name='contact' onInput={onInputContact} value={contact}></input></td>

                            </tr>
                            <tr>
                                <th>단가</th>
                                <td><input type='text' name='unitPrice' onChange={handleChangeUnitPrice} value={unitPrice}></input></td>
                                <th>운영시간</th>
                                <td><input type='text' name='operationTime' onChange={handleChangeOperationTime} value={operationTime}></input></td>
                            </tr>
                            <tr>
                                <th>위치</th>
                                <td><input type='text' name='location' onChange={handleChangeLocation} value={location}></input></td>
                                <th>휴일</th>
                                <td><input type='text' name='dayOff' onChange={handleChangeDayOff} value={dayOff}></input></td>
                            </tr>
                            <tr>
                                <th>편의시설</th>
                                <td colSpan='3'><input type='text' name='amenity' onChange={handleChangeAmenity} value={amenity}></input></td>
                            </tr>

                        </tbody>
                    </table>
                    <div>
                        <input type='submit'value='등록'></input>
                        <button onClick={()=>{navigator("/admin/facility/list");}}>취소</button>
                    </div>
                </form> */}
        </StyledFacilityEditDiv>
    );
};

export default FacilityEdit;