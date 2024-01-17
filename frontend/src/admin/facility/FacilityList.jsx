import React ,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FacilityList = () => {

    const StyledFacilityListDiv = styled.div`

    `;
    const navigator = useNavigate();

    const [facilityVoList, setFacilityVoList] = useState([]);
    const loadFacilityVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/admin/list")
        .then(resp=>resp.json())
        .then(data=>{setFacilityVoList(data.facilityVoList);});
    }
    useEffect(()=>{
        loadFacilityVoList();
    }, []);
    const formatContact = (dataString)=>{
        if(dataString != null){
            return dataString.substring(0,2) + "-" + dataString.substring(2,6) + "-" + dataString.substring(6,10);
        }else{
            return '';
        }
    };
    const price = (dataString)=>{
        return parseInt(dataString).toLocaleString();
    }
    const handleDelete = ()=>{

    }
    return (
        <StyledFacilityListDiv>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>사용여부</th>
                        <th>시설 이름</th>
                        <th>이미지</th>  
                        <th>단가</th>
                        <th>문의</th>
                        <th>운영시간</th>
                        <th>휴일</th>
                        <th>위치</th>
                        <th>편의시설</th>
                        <th>등록일</th>
                        <th>최종수정일</th>
                        <td>수정</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        facilityVoList.length === 0
                        ?
                        <h1>loading..</h1>
                        :
                        facilityVoList.map(vo => <tr key={vo.facilitiesNo}>
                                <td>{vo.facilitiesNo}</td>
                                <td>{vo.delYn === "N"?"O":"X"}</td>
                                <td>{vo.facilitiesName}</td>
                                <td><img src={vo.image}/></td>
                                <td>{price(vo.unitPrice)}</td>
                                <td>{formatContact(vo.contact)}</td>
                                <td>{vo.operationTime}</td>
                                <td>{vo.dayOff}</td>
                                <td>{vo.location}</td>
                                <td>{vo.amenity}</td>
                                <td>{vo.enrollDate}</td>
                                <td>{vo.modifyDate == null? "-":""}</td>
                                <td><button onClick={()=>{navigator(`/admin/facility/edit/${vo.facilitiesNo}`)}}>수정</button></td>
                                <td><button onClick={()=>{handleDelete(vo.facilitiesNo)}}>삭제</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div><button onClick={()=>{navigator("/admin/facility/insert")}}>시설등록</button></div>
        </StyledFacilityListDiv>
    );
};

export default FacilityList;