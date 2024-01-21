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
    .menu_box{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .toggle_menu{
        display: flex;
        flex-direction : column;
        width: 100%;
        align-items: center;
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
                    <div className='menu_box'>
                        <div className='toggle_menu' >
                            <div className='menu_bar ad_search_box' onClick={handleToggle1}>커뮤니티 시설관리</div>
                            <div>
                                {isListVisible && (
                                    <div>
                                        <FacilitiesList />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='toggle_menu'>
                            <div className='menu_bar ad_search_box'  onClick={handleToggle2}>커뮤니티 공지사항 관리</div>
                            <div>
                                {isNoticeVisible && (
                                    <div>
                                        <FacilityNoticeList />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='toggle_menu' >
                            <div className='menu_bar ad_search_box' onClick={handleToggle3}>커뮤니티 예약내역 관리</div>
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