import React from 'react';

const BoardReplyWrite = () => {
    const handleSubmit = ()=>{

    }
    return (
        <div>
            <form>
                <input type='textarea' name='content' placeholder='댓글을 입력하세요.'/>
                <div>
                    <button type='submit' onClick={handleSubmit}>작성</button>
                </div>
            </form>
        </div>
    );
};

export default BoardReplyWrite;