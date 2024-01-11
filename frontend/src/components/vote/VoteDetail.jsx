import React from 'react';
import { useParams } from 'react-router-dom';

const VoteDetail = () => {
    const {voteNo} = useParams();
    return (
        <div>
            디테일
            {voteNo}
        </div>
    );
};

export default VoteDetail;