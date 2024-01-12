import React from 'react';
import { useNavigate } from 'react-router-dom';
import FacilityHistoryItem from './FacilityHistoryItem';

const FacilityHistoryList = () => {
    const navigator = useNavigate();
    return (
        <div>
            <div>
                <div>예약내역</div>
                -----------------------------
                <div>
                    <input type='date'></input>
                </div>
                <div>총 2건</div>
                <div>시설 예약내역</div>
                <div>
                    리스트동안 반복
                    <FacilityHistoryItem />
                </div>
            </div>
        </div>
    );
};

export default FacilityHistoryList;