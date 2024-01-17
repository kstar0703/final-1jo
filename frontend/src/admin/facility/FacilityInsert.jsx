import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FacilityInsert = () => {
    const navigator = useNavigate();
    //화면 정돈 
    const onInputContact = (event) => {
        let inputContact = event.target.value;      
        // 숫자 이외의 문자 제거
        inputContact = inputContact.replace(/[^0-9]/g, '');
      
        // 02로 시작하는 번호인 경우
        if (inputContact.startsWith('02')) {
          // 최대 10자리까지만 유지
          if (inputContact.length > 10) {
            inputContact = inputContact.slice(0, 10);
          }      
          // 02로 시작하는 번호에 앞에 하이픈 추가
          const formattedContact = inputContact.replace(/(\d{2})(\d{4})(\d{4})/, (_, p1, p2, p3) => {
            return `${p1}-${p2}-${p3}`;
          });      
          // input 요소의 값을 수정
          event.target.value = formattedContact;
        } else {
          // 최대 11자리까지만 유지
          if (inputContact.length > 11) {
            inputContact = inputContact.slice(0, 11);
          }      
          // 02로 시작하지 않는 번호에 앞에 하이픈 추가
          const formattedContact = inputContact.replace(/(\d{3})(\d{4})(\d{4})/, (_, p1, p2, p3) => {
            return `${p1}-${p2}-${p3}`;
          });      
          // input 요소의 값을 수정
          event.target.value = formattedContact;
          setContact(inputContact);

        //   setInputVo({
        //     ...inputVo,
        //     contact: inputContact
        //   });
        }
      }
    
    let isFetching = false;
    // const [inputVo, setInputVo] = useState([]);
    const [facilitiesName, setFacilitiesName] = useState();
    const [delYn, setDelYn] = useState();
    const [contact, setContact] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [operationTime, setOperationTime] = useState();
    const [location, setLocation] = useState();
    const [dayOff, setDayOff] = useState();
    const [amenity, setAmenity] = useState();
    const [file, setFile] = useState();

    const handleChangeFacilitiesName = (e)=>{
        setFacilitiesName(e.target.value);
    }
    const handleChangeDelYn = (e)=>{
        setDelYn(e.target.value);
    }
    // const handleChangeContact = (e)=>{
    //     setContact(e.target.value);
    // }
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
    const handleSubmit = (e)=>{
        console.log(contact);
        e.preventDefault();
        const fd = new FormData();
        fd.append("facilitiesName", facilitiesName);
        fd.append("delYn", delYn);
        fd.append("contact", contact);
        fd.append("unitPrice", unitPrice);
        fd.append("operationTime", operationTime);
        fd.append("location", location);
        fd.append("dayOff", dayOff);
        fd.append("amenity", amenity);
        fd.append("file", file);

        fetch("http://127.0.0.1:8888/app/facility/admin/insert", {
            method: "POST",
            body: fd
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert("시설 등록 성공");
                navigator("/admin/facility/list");
            }else{
                alert("시설 등록 실패");
            }
        });        
    }




    // ====================================================version 1
    // const handleInputVo = (e)=>{
    //     const {name, value} = e.target;
    //     setInputVo({
    //         ...inputVo,
    //         [name] : value
    //     });
    // }
    // const handleFileInputVo = (e)=>{
    //     setImage(e.target.files[0]);
    // }
    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     if(isFetching){
    //         return;
    //     }
    //     isFetching = true;
    //     const formData =new FormData();
    //     Object.keys(inputVo).forEach(key=>{
    //         formData.append(key, inputVo[key]);
    //     })
    //     formData.append("image", image);
    //     console.log("인풋" + inputVo.image);
    //     console.log("전달할" + formData.image);
    //     console.log(image);
    //     fetch("http://127.0.0.1:8888/app/facility/admin/insert", {
    //         method: "POST",
    //         body: formData
    //     })
    //     .then(resp=>resp.json())
    //     .then(data=>{
    //         if(data.msg === "good"){
    //             alert("시설 등록 성공");
    //         }else{
    //             alert("시설 등록 실패");
    //         }
    //     })        
    // }
    return (
        <div>
            <div>커뮤니티 시설등록</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                                <th>시설 이름</th>
                                <td><input type='text' name='facilitiesName' onChange={handleChangeFacilitiesName}></input></td>
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
                                <td><input type='text' name='contact' onInput={onInputContact} ></input></td>

                            </tr>
                            <tr>
                                <th>단가</th>
                                <td><input type='text' name='unitPrice' onChange={handleChangeUnitPrice}></input></td>
                                <th>운영시간</th>
                                <td><input type='text' name='operationTime' onChange={handleChangeOperationTime}></input></td>
                            </tr>
                            <tr>
                                <th>위치</th>
                                <td><input type='text' name='location' onChange={handleChangeLocation}></input></td>
                                <th>휴일</th>
                                <td><input type='text' name='dayOff' onChange={handleChangeDayOff}></input></td>
                            </tr>
                            <tr>
                                <th>편의시설</th>
                                <td colSpan='3'><input type='text' name='amenity' onChange={handleChangeAmenity}></input></td>
                            </tr>


                            {/*version_1                            
                            
                            <tr>
                                <th>시설 이름</th>
                                <td><input type='text' name='facilitiesName' onChange={handleInputVo}></input></td>
                                <th>사용여부</th>
                                <td>
                                    <label><input type='radio' name='delYn' value='N' onChange={handleInputVo} checked='checked'/>가능</label>
                                    <label><input type='radio' name='delYn' value='Y' onChange={handleInputVo}/>불가능</label>
                                </td>
                            </tr>
                            <tr>
                                <th>이미지</th>  
                                <td><input type='file' name='image' onChange={handleFileInputVo}></input></td>
                                <th>문의</th>
                                <td><input type='text' name='contact' onInput={onInputContact}></input></td>

                            </tr>
                            <tr>
                                <th>단가</th>
                                <td><input type='text' name='unitPrice' onChange={handleInputVo}></input></td>
                                <th>운영시간</th>
                                <td><input type='text' name='operationTime' onChange={handleInputVo}></input></td>
                            </tr>
                            <tr>
                                <th>위치</th>
                                <td><input type='text' name='location' onChange={handleInputVo}></input></td>
                                <th>휴일</th>
                                <td><input type='text' name='dayOff' onChange={handleInputVo}></input></td>
                            </tr>
                            <tr>
                                <th>편의시설</th>
                                <td colSpan='3'><input type='text' name='amenity' onChange={handleInputVo}></input></td>
                            </tr> */}
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

export default FacilityInsert;