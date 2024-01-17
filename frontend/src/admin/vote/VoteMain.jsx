import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VoteList from './VoteList';
import VoteDetail from './VoteDetail';
import VoteEdit from '../../components/vote/VoteEdit';


const VoteMain = () => {

    return (
        <Routes>
            <Route path='/list' element={<VoteList/>}></Route>
            <Route path='/detail/:voteNo*' element={<VoteDetail/>}></Route>{/*/detail/:voteNo**/}
            <Route path='/edit/*'element={<VoteEdit />}></Route>
        </Routes>
        
    );
};

export default VoteMain;