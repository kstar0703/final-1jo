import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                // setFile(data.facilityVo.file);
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
        <div>
            <div>커뮤니티 시설등록</div>
            <div>
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    );
};

export default FacilityEdit;