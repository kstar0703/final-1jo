
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
        width: 80%;
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
        // 네비 게이트
        const navigate =  useNavigate();
        //페이지 배열

    // ------ 검색어 영역 
        //select 안에 값 넣어주기 
        let input = useRef();
        const [selectedOption, setSelectedOption] = useState('title');
        const onChangeType = (event) => {
          const selectedOptionName = event.target.options[event.target.selectedIndex].getAttribute('name');
          setSelectedOption(selectedOptionName);
           
           const name = selectedOptionName;
           const value = input.current.value;

           setVo({
            [name] : value
           }) 
        }

        //검색 
       const [vo,setVo]  = useState();

        const onChange = (e) =>{

            
            const {name, value} = e.target;            
            setVo({
                [name] :  value,    
            })            
        }

        //검색시 의존성 배열 변경
        const [searchQuery, setSearchQuery] = useState('');   
        const onClickSearch = () => {
            setSearchQuery(prev => prev + 'a');
        }

    // ----------- 날짜 영역----------------------------------

         const [dateVo,setDateVo] = useState({});  
        const onChangeDate = (e) =>{
            
            const {name,value} = e.target;
            setDateVo({...dateVo,
                [name] :  value,    
            })     
        }
    // --- 페이징 영역 ----------------------------------------
       const [pvo,setPvo] = useState({});

       console.log(pvo)

        
    




     
        // 공지사항 리스트
        const [announcement,setAnnouncement] = useState([]);

        // 공지사항 리스트
        // useEffect(
        //     async () => {
        //       try {
        //         const queryParams = new URLSearchParams();
          
        //         for (const key in dateVo) {
        //           queryParams.append(key, dateVo[key]);
        //         }
          
        //         for (const key in vo) {
        //           queryParams.append(key, vo[key]);
        //         }
          
        //         const queryString = queryParams.toString();
        //         const url = `http://127.0.0.1:8888/app/announcement/list?${queryString}`;
          
        //         const resp = await fetch(url);
        //         const data = await resp.json();
          
        //         setAnnouncement(data.voList);
        //         setPvo(data.pageVo);
        //       } catch (error) {
        //         console.error("Error fetching data:", error);
        //       } finally {
              
        //       }
        //     },
        //     [searchQuery]
        //   );

        // useEffect(
        //         ( ) =>{
        //             const queryParams = new URLSearchParams();
          
        //             for (const key in dateVo) {
        //               queryParams.append(key, dateVo[key]);
        //             }
              
        //             for (const key in vo) {
        //               queryParams.append(key, vo[key]);
        //             }
              
        //             const queryString = queryParams.toString();
        //             const url = `http://127.0.0.1:8888/app/announcement/list?${queryString}`;

        //             fetch( (url) =>{ })
        //             .then( (resp) =>{
        //                 return resp.json()
        //             })
        //             .then((data)=>{
        //                     setAnnouncement(data)
        //             } )
        //         }
               
          
             
        
        //     ,[searchQuery]
        //   );

        useEffect(
            () => {
                const queryParams = new URLSearchParams();
          
                for (const key in dateVo) {
                  queryParams.append(key, dateVo[key]);
                }
          
                for (const key in vo) {
                  queryParams.append(key, vo[key]);
                }
          
                const queryString = queryParams.toString();
                
                fetch(`http://127.0.0.1:8888/app/announcement/list?${queryString}`)
                .then(resp => resp.json())
                .then( data => {
                    setAnnouncement(data.voList);
                    setPvo(data.pageVo);
                } )
                .catch( e => {
                    console.error("Error fetching data:", error);
                } )
                ;
                
            },
            [searchQuery]
          );

        

       







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
                <input type="date" name="startDate" onChange={onChangeDate}/>
                <input type="date" name="endDate"  onChange={onChangeDate} />
                <button>초기화</button> 
                <select onChange={onChangeType}>
                <option name="title" >제목</option>
                <option name="content">내용</option>
                <option name="id">작성자</option>
                </select>

                <input ref={input} type='text' placeholder='검색어' name={selectedOption} onChange={onChange} ></input>

                <button onClick={onClickSearch}>검색</button>
            </div>
            {/* 3 */}
            <div>
            { announcement.map ( vo => 
                        announcement.length === 0 ? 
                        <h1>로딩중</h1>
                        :
                        <div key={vo.announcementNo} onClick={()=>{navigate(`/announcement/detail/${vo.announcementNo}`)}}>
                            <span>[공지사항]{vo.title}</span>
                            <span>{ vo.enrollDate.substring(0,10)}</span>
                        </div>          
                  )
                }
               
            </div>f
            {/* 4 관리자라면 보이게 유저면 안보이게 변경 */}
            <div>
                
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