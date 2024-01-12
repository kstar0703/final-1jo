import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacilityHistoryComplete = () => {
    const navigator = useNavigate();
    return (
        <div>
            신청 완료되었습니다.
            <div onClick={navigator("/facility/list")}>목록으로</div>
            <div onClick={navigator("/facility/history")}>예약내역확인</div>
        </div>
    );
};

export default FacilityHistoryComplete;