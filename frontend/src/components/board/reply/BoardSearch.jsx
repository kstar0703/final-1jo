import React from 'react';
import styled from 'styled-components';

const StyledBoardReplySearchDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0%;
    margin: 0;

    & select {
        width: 100px;
        float: right;
        height: 100%;
        margin-right: 5px;
    }
    & input {
        width: 100%;
        height: 100%;
        margin-right: 5px;
    }
    & button {
        
        width: 80px;
        height: 100%;
    }
`;
const BoardSearch = () => {
    const handleSubmit = ()=>{

    }
    return (
        <StyledBoardReplySearchDiv>
            <div>
                <select name='searchType'>
                    <option value='writer'>작성자</option>
                    <option value='content'>내용</option>
                </select>
            </div>
            <div>
                <input type='text' name='searchKeyword' placeholder='검색어를 입력하세요.'/>
            </div>
            <div>
                <button onClick={handleSubmit}>검색</button>
            </div>
            
        </StyledBoardReplySearchDiv>
    );
};

export default BoardSearch;