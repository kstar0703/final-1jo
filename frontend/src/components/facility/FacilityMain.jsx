import { Route, Routes } from 'react-router-dom';
import FacilityHistoryList from './history/FacilityHistoryList';
import FacilityList from './FacilityLayout';
import FacilityDetail from './FacilityDetail';
import FacilityHistoryComplete from './history/FacilityHistoryComplete';
import FacilityNoticeDetail from './notice/FacilityNoticeDetail';

const FacilityMain = () => {

    return (
        <Routes>
            <Route path='history' element={<FacilityHistoryList />}/>
            <Route path='list' element={<FacilityList />}/>
            <Route path='detail/:facilitiesNo' element={<FacilityDetail />}/>
            <Route path='complete' element={<FacilityHistoryComplete />}/>
            <Route path='notice/:facilitiesNo' element={<FacilityNoticeDetail />}/>
        </Routes>
    );
};

export default FacilityMain;