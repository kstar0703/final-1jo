import React from 'react';
import FacilityList from './FacilityList';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFacilityLayoutDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .histohisroty_box{
        width: 100%;
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
    .btn_under{
        flex-direction: column;
    }
`;

const FacilityLayout = () => {
    const navigator = useNavigate();
    return (
        <StyledFacilityLayoutDiv>
            <div className="wrap">
                <div className='seach_box_bg'>
                    <div className='pageTitle mb30'><h1>커뮤니티 시설</h1></div>
                </div> 

                <div className='tbl_box mt10'>
                    <table>
                        <div className="btn_under">
                            <div className='ad_search_box histohisroty_box'>
                                <div onClick={()=>navigator("/facility/history")}>My 예약 내역</div>
                            </div>
                            <div className='item_list'>
                                <div>
                                    <FacilityList />
                                </div>
                            </div>
                        </div>
                    </table>
                </div>
            </div>
        </StyledFacilityLayoutDiv>
    );
};

export default FacilityLayout;