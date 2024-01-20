import React from 'react';
import { useState, useEffect } from 'react';
import FacilityDetailItem from './FacilityDetailItem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityListDiv = styled.div`
    .item_list{
        
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        padding-top: 50px;
        gap: 50px;
    }
`; 

const FacilityList = () => {

    const [facilityVoList, setFacilityVoList] = useState([]);
    const loadFacilityVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/list")
        .then(resp=>resp.json())
        .then(data=>{setFacilityVoList(data.facilityVoList);});
    }
    useEffect(()=>{
        loadFacilityVoList();
    }, []);
    const navigator = useNavigate();
    return (
        <StyledFacilityListDiv>
                <div  className='item_list'>
                {
                    facilityVoList.length === 0?
                    <div>loading..</div>
                    :
                    facilityVoList.map(vo=>
                        <div key={vo.facilitiesNo} onClick={()=>{navigator(`/facility/detail/${vo.facilitiesNo}`)}}>
                            <FacilityDetailItem img={vo.image} fName={vo.facilitiesName}/>
                        </div>
                    )
                }
                </div>

            </StyledFacilityListDiv>
    );
};

export default FacilityList;