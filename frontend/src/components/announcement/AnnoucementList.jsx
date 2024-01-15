
import React, { useEffect, useState ,useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';


const ListDiv =styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    &  div {
        width: 50%;
        padding:10px ;
    }

    /* 1 */
    & > div:nth-of-type(1){
      display: flex;
     
      background-color: skyblue;
        justify-content: space-between;
    }
    /* 2 날짜영역 */
    & > div:nth-of-type(2){
        
    }

    /* 3공지사항 영역 */

    & > div:nth-of-type(3){
        background-color:  #F5F5F5;
        height: 100%;
        display: flex;
        padding: 10px;
        flex-direction: column;
        gap : 10px;

        & div{
            width: 100%;
            background-color: white;
            height: 110px;
            display: flex;
            flex-direction: column;

            & > :first-child {
                font-size: 24px;
            }

            & > :nth-child(2){
                color : lightgray
            }
        }

    }

    & > div:nth-of-type(4){
        display: flex;
        justify-content: flex-end;
    }

    & > div:nth-of-type(5){
        display: flex;
        justify-content: center;
        
        gap: 20px;
        & button{

        }
    }



`

const AnnouncementList = () => {
        // 로그인 멤버 
        const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

        //페이지 배열
        let page =  useRef([]);
         

        // 네비 게이트
        const navigate =  useNavigate();
        // 검색어
        const [search,setSearch] =useState({});
        const [pvo,setPvo] = useState({});
        // 공지사항 리스트
        const [announcement,setAnnouncement] = useState([]);

        // 공지사항 리스트
        useEffect(
            ()=>{
                fetch("http://127.0.0.1:8080/app/announcement/list",{
                    method: "post",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(search),
                }
                    
                )
                .then( resp => resp.json())
                .then( data => {    
                    console.log('하이')
                    setAnnouncement(data.voList); 
                    setPvo(data.pvo)

                    
                    
                    
                })
            }
        ,[]);

        const  announcementMove = () =>{
            navigate("/announcement/list")
        }







    return (
       <ListDiv>
            {/* 1 */}
            <div>
                <span>뒤로가기</span>
                <span>공지사항</span>
                <span>마이페이지</span>
            </div>
            {/* 2 */}
            <div>
                <input type="date"/>
                <input type="date" />
                <button>초기화</button> 
                <select>
                <option value="option1">제목</option>
                <option value="option2">내용</option>
                <option value="option3">작성자</option>
                </select>

                <input type='text' placeholder='검색어'></input>

                <button>검색</button>
            </div>
            {/* 3 */}
            <div>
            { announcement.map ( vo => 
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
            {/* 4 관리자라면 보이게 유저면 안보이게 변경 */}
            <div>
                <button>공지사항 작성</button>    
            </div>

            {/*5 버튼영역 */}
            <div>
                {}
                <img src="" alt="5개씩 이동" />
                {
                    
                }
                <img src="" alt="5개씩 이동" />
            </div>

            
       </ListDiv>
    );
};

export default AnnouncementList;