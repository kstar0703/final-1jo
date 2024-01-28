import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacilityHistoryComplete = () => {
    const navigator = useNavigate();
    useEffect(()=>{
        alert("이동했어?");

    }, []);
    return (
        <div>
            신청 완료되었습니다.
            
        </div>
    );
};

export default FacilityHistoryComplete;