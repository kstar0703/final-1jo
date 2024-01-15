import React, { createContext, useContext, useState } from 'react';

const ReplyCount = createContext({});
const ReplyCountProvider = ({children})=>{
    const [replyCount, setReplyCount] = useState(0);
    const value = {
        replyCount,
        setReplyCount
    };
    return(
        <>
            <ReplyCount.Provider value={value}>
                {children}
            </ReplyCount.Provider>
        </>
    );

}
const useReplyCount = ()=>{
    const value = useContext(ReplyCount);
    return value;
}


export {ReplyCountProvider, useReplyCount};