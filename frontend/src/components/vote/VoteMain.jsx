import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VoteList from './VoteList';
import VoteEdit from './VoteEdit';
import VoteDetail from './VoteDetail';

const VoteMain = () => {
    return (
        <Routes>
            <Route path='/list/'element={<VoteList />}></Route>
            <Route path='/detail/:voteNo*'element={<VoteDetail />}></Route>
            <Route path='/edit/*'element={<VoteEdit />}></Route>
        </Routes>
    );
};

export default VoteMain;