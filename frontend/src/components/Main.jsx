import React, { useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import VoteMain from './vote/VoteMain';
import BoardMain from './board/BoardMain';
import FacilityMain from './facility/FacilityMain';
import ParkingMain from './parking/ParkingMain';
import ComplaintMain from './complaint/ComplaintMain';
import ManagementMain from './management/ManagementMain';
import ErrorPageNotFound from './error/ErrorPageNotFound';
import AnnouncementMain from './announcement/AnnoucementMain';
import styled from 'styled-components';
import MemberMain from './member/MemberMain';

const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  
`;

const Main = () => {
   const navigate =useNavigate()

    useEffect(
        ()=>{
            if(!sessionStorage.getItem("loginMember")){
                navigate("/")
            }
        }
    ,[])


    return (
        <StyledMainDiv>
            <Routes>
                <Route path='/member/*' element={<MemberMain/>} />
                <Route path='/announcement/*' element={<AnnouncementMain />}/>
                <Route path='/vote/*' element={<VoteMain />}/>
                <Route path='/board/*' element={<BoardMain />} />
                <Route path='/facility/*' element={<FacilityMain/>}/>
                <Route path='/parking/*' element={<ParkingMain/>}/>
                <Route path='/complaint/*' element={<ComplaintMain/>}/>
                <Route path='/management/*' element={<ManagementMain/>}/>
                <Route path='*' element={<ErrorPageNotFound />}/> 
            </Routes>
        </StyledMainDiv>
    );
};

export default Main;