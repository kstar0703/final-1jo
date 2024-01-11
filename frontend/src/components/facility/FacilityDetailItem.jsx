import React from 'react';

const FacilityDetailItem = ({img, fName}) => {
    return (
        <div>
            <img src={img}></img>
            <span>{fName}</span>
        </div>
    );
};

export default FacilityDetailItem;