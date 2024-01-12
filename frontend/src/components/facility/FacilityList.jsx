import React from 'react';
import { useState, useEffect } from 'react';
import FacilityDetailItem from './FacilityDetailItem';
import { useNavigate } from 'react-router-dom';

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
        <div>
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
    );
};

export default FacilityList;