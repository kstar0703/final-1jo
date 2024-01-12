import React from 'react';

const BoardSearch = () => {
    const handleSubmit = ()=>{

    }
    return (
        <div>
            <div>
                <select name='searchType'>
                    <option value='writer'>작성자</option>
                    <option value='content'>내용</option>
                </select>
            </div>
            <div>
                <input type='text' name='searchKeyword' placeholder='검색어를 입력하세요.'/>
                <button onClick={handleSubmit}>검색</button>
            </div>
            
        </div>
    );
};

export default BoardSearch;