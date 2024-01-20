import React, { useState } from 'react';
import styled from 'styled-components';
import FacilitiesList from './FacilitiesList';
import FacilityNoticeList from './notice/FacilityNoticeList';
import FacilityHistoryList from './history/FacilityHistoryList';

const StyledFacilityListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction : column;
    .toggle_menu{
        display: flex;
        flex-direction : column;
        width: 100%;
    }
    .menu_bar{
        display: flex;
        flex-direction : column;
        border: 1px solid #ccc;
        font-size: 19px;
        &:hover{
            background-color: lightcoral;
            color: #fff;        
        }
        & div {
            margin-left: 40px;
        }
    }
    .bcc{
        background-color: inherit;
    }
`;

const FacilityList = () => {

const [isListVisible, setListVisible] = useState(false);
const [isNoticeVisible, setNoticeVisible] = useState(false);
const [isHistoryVisible, setHistoryVisible] = useState(false);

const handleToggle1 = ()=>{
    setListVisible(!isListVisible);
}
const handleToggle2 = ()=>{
    setNoticeVisible(!isNoticeVisible);
}
const handleToggle3 = ()=>{
    setHistoryVisible(!isHistoryVisible);
}
    return (
        <StyledFacilityListDiv>
            <div className='ad_wrap'>
                <div class="ad_detail_box">
                    <div className="ad_tit">
                        <h2>커뮤니티</h2>  
                    </div>
                    <div className='ad_search_box bcc'>
                        <div className='toggle_menu' onClick={handleToggle1}>
                            <div className='menu_bar ad_search_box'>커뮤니티 시설목록</div>
                            <div>
                                {isListVisible && (
                                    <div>
                                        <FacilitiesList />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='toggle_menu' onClick={handleToggle2}>
                            <div className='menu_bar ad_search_box'>시설공지사항</div>
                            <div>
                                {isNoticeVisible && (
                                    <div>
                                        <FacilityNoticeList />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='toggle_menu' onClick={handleToggle3}>
                            <div className='menu_bar ad_search_box'>예약내역</div>
                            <div>
                                {isHistoryVisible && (
                                    <div>
                                        <FacilityHistoryList />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </StyledFacilityListDiv>
    );
};

export default FacilityList;