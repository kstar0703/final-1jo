import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacilityHistoryComplete = () => {
    const navigator = useNavigate();
    const [page, setPage] = useState();
    useEffect((e)=>{
        const answer = window.confirm("이동하시겠습니까?");
        if(answer){
            e.preventDefault();
        }

    }, [page]);
    return (
        <div>
            신청 완료되었습니다.
            
        </div>
    );
};

export default FacilityHistoryComplete;