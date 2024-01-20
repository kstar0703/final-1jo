import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComplaintList from './ComplaintList';
import ComplaintDetall from './ComplaintDetall';

const ComplaintMain = () => {
    return (
      <Routes>
        <Route path="/list" element={<ComplaintList />} />
        <Route path="/detail*" element={<ComplaintDetall />} />
      </Routes>
    );
};

export default ComplaintMain;