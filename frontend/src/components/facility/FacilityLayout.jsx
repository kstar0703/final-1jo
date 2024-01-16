import React from 'react';
import FacilityList from './FacilityList';
import { useNavigate } from 'react-router-dom';


const FacilityLayout = () => {
    const navigator = useNavigate();
    return (
        <div>
            <div>
                <div onClick={()=>navigator("/facility/history")}>My 예약 내역</div>
            </div>
                <FacilityList />
        </div>
    );
};

export default FacilityLayout;