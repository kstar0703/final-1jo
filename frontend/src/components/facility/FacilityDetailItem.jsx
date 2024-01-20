import React from 'react';
import styled from 'styled-components';

const StyledFacilityDetailItem = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 20px;
    .img_box{
        margin-bottom: 10px;
        text-align: center ;
    }
    .name_box{
        text-align: left;
        font-size: 18px;
        margin-left: 15px;
    }


`;
const FacilityDetailItem = ({img, fName}) => {
    return (
        <StyledFacilityDetailItem>
            <div className='img_box'>
                <img src={img}  width='100%' height='66%'></img>
            </div>
            <div className='name_box'>
                <span>{fName}</span>
            </div>
        </StyledFacilityDetailItem>
    );
};

export default FacilityDetailItem;