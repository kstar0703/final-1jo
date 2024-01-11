import React, { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import FacilityDetail from './FacilityDetail';
import FacilityDetailItem from './FacilityDetailItem';

const FacilityMain = () => {
    const facilitiesNo = useParams();
    const navigator = useNavigate();
    const [facilityVoList, setFacilityVoList] = useState([]);
    const loadFacilityVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/list")
        .then(resp=>resp.json())
        .then(data=>{setFacilityVoList(data.facilityVoList);});
    }
    loadFacilityVoList();
    return (
        <div>
            <div>My 예약 내역</div>
            <div>
                    {
                        facilityVoList.length === 0?
                        <h1>loading..</h1>
                        :
                        facilityVoList.map(vo=>
                            <div onClick={navigator(`detail/${vo.facilitiesNo}`)}>
                                <FacilityDetailItem img={vo.image} fName={vo.facilitiesName}/>
                            </div>
                        )
                    }

                <Routes>
                    <Route path='detail/:facilitiesNo' element={<FacilityDetail />}/>
                </Routes>
            </div>
        </div>
    );
};

export default FacilityMain;