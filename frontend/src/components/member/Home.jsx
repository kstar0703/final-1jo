
import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';



 const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    gap : 20px;

    & > div:first-of-type{
        margin: 10px;

        & > :first-child{
            font-size: 24px;
        }

        & > :nth-child(2){

        }
    }

     & > div:nth-of-type(2){
        padding: 10px;

        height: 20%;
        border :1px solid black;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
        gap :20px;

        & > div:nth-of-type(1){

        }

        & > div:nth-of-type(2){
            display: flex;
            justify-content: space-evenly;

            & div{
                display: flex;
                flex-direction: column;
                gap :20px
            }
            
        } 
     } 
     
     & > div:nth-of-type(3){
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: white;

        

        &  div{
            height: 80px;
            border-bottom: 1px solid lightgrey;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 10px;
        
            & > :first-child {
                font-size: 24px;
            }

            & > :nth-child(2){
                color : lightgray
            }

            
        }

        & > div:first-of-type{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 50px;
            align-items: center;
          
        }
     }

 `




const Home = () => {
    // 로그인 멤버 
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

    // 네비 게이트
    const navigate =  useNavigate();

    // 공지사항
    const [announcement,setAnnouncement] = useState([]);

    // 공지사항 리스트
    useEffect(
        ()=>{
            fetch("http://127.0.0.1:8080/app/announcement/list")
            .then( resp => resp.json())
            .then( data => {    
                setAnnouncement(data.voList); 
                console.log(announcement) 
                
            })
        }
    ,[]);

    const  announcementMove = () =>{
        navigate("/announcement/list")
    }


    // 예약시설 [민경]
    useEffect(
        ()=>{

        }
    )



    

    

    return (
        
        <StyledDiv>
            {/* 1 동 호수 */}
            <div>
               <span>{loginMember.name}님</span>
               <br />
                <span>덕편한세상 {' ' + loginMember.dong}동{loginMember.ho}호</span>
            </div>

            {/* 2 내현황  */}
            <div>
                {/* 1 */}
                <div>
                   <img src="" alt="" /> <span>내 현황</span>
                </div>
                {/* 2 */}
                <div>
                    <div>
                        <button>편의시설</button>
                        <button>예약내역</button>
                    </div>
                        
                    <div>
                        <button>세대원수</button>
                        
                        <span>명</span>
                    </div>

                    <div>
                        <button>방문예약</button>
                        <span>잔여시간</span>
                        <h3>{Math.floor(loginMember.vehTime  / 60)  } 시간{loginMember.vehTime%60}분</h3>
                    </div>        
                </div>

            </div>
            {/* 공지사항 */}
            <div>
                <div>
                   <span>공지사항</span>
                   <button onClick={announcementMove}>공지사항이동</button>
                </div>

               

                { 
                    announcement.slice(0, 5).map ( vo => 
                       
                        announcement.length === 0 ? 
                        <h1>로딩중</h1>
                        :
                        <div key={vo.announcementNo} onClick={()=>{navigate(`/announcement/datail/${vo.announcementNo}`)}}>
                            <span>[공지사항]{vo.title}</span>
                            <span>{ vo.enrollDate.substring(0,10)}</span>
                        </div>          
                  )
                }

           
            </div>
        </StyledDiv>
    );
};

export default Home;