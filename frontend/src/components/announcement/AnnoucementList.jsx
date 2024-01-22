
import React, { useEffect, useState ,useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../page/Pagination';


const StyledBoardListDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
    }
    .left{
        text-align: left;
        padding: 0 30px;
    }
    .btn_bottom {
        width: 80%;
        display: flex;
        align-items: center;
        padding-top: 20px;
    }
    .btn_under{
        flex-direction: column;
    }

    .div_search{
        display: flex;
        flex-direction: column;

        & select{
            width: 5;
            height: 30px;
        }
    
    .input_date{
        width: 30%;
    }
}

`

const AnnouncementList = () => {
        // 로그인 멤버 
        const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))
        // 네비 게이트
        const navigate =  useNavigate();

        //검색시 의존성 배열 변경
        const [searchQuery, setSearchQuery] = useState('');   
        
        // 초기화용 
       let selectRef  = useRef()
       let endDateRef  = useRef()
       let startDateRef  = useRef()
       let inputRef = useRef();
        const clickReset = (e) =>{


            selectRef.current.value= '제목';
            endDateRef.current.value= '';
            startDateRef.current.value= '';
            inputRef.current.value ='';

            setDataVo();
            setDateVo()


            setSearchQuery(searchQuery + 'a')
        }
        
        //select 안에 값 넣어주기 
        const [selectedOption, setSelectedOption] = useState('title');
        const onChangeType = (event) => {

        //   const selectedOptionName = event.target.options[event.target.selectedIndex].getAttribute('name');
        //   setSelectedOption(selectedOptionName);
           
        //    const name = selectedOptionName;
        //    const value = input.current.value;

     
          
        }

        //검색 
       const [dataVo,setDataVo]  = useState();
       const [dateVo,setDateVo]  = useState();
        
       const onChange = (e) =>{
            const {name,value} = e.target
            setDateVo({
                ...dateVo 
                ,[name] : value
            })
        }

        
        let patcherable = true;
        const onClickSearch = (e) => {

            
            if(!patcherable){
                return;
            }
            patcherable=false;

            setDataVo({
                [selectRef?.current?.options[selectRef?.current?.selectedIndex]?.getAttribute('name')] : inputRef?.current?.value
            })
             setSearchQuery(prev => prev + 'a');

        }

    // ----------- 날짜 영역----------------------------------
        
    // --- 페이징 영역 ----------------------------------------
            
    //페이징용 
    const [pvo,setPvo] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    
    //페이징
    const handlePageChange = (page) =>{
        
   
    setCurrentPage(page); 
    setSearchQuery(searchQuery + 'a')
  };

        
    
        // 공지사항 리스트
        const [announcement,setAnnouncement] = useState([]);

        useEffect(
            () => {
                console.log(dataVo)
                console.log(dateVo)

                const queryParams = new URLSearchParams();

                for (const key in dataVo) {
                    queryParams.append(key, dataVo[key]);
                  }

                for (const key in dateVo){
                    queryParams.append(key,dateVo[key])
                }  
            
                  queryParams.append('currentPage',currentPage)

          
               
                const queryString = queryParams.toString();
                
                fetch(`http://127.0.0.1:8888/app/announcement/list?${queryString}`)
                .then(resp => resp.json())
                .then( data => {
                    setAnnouncement(data.voList);
                    setPvo(data.pageVo);
                    console.log(data)
                } )
                .catch( e => {
                    console.error("Error fetching data:", error);
                } ).finally ( ()=>{
                    patcherable = true;
                })
                ;
                
            },
            [searchQuery]
          );

        

       







    return (
        <StyledBoardListDiv>
            <div className='wrap'>


                {/* 검색창 */}
                    <div className='seach_box_bg div_search'>
                        <div>
                            <h1>공지사항</h1>
                        </div>
                        <form >
                        <sapn>작성일 : </sapn>
                        <input type="date" name="startDate" ref={startDateRef} onChange={onChange} className='input_date'/>~
                         <input type="date" name="endDate"  ref={endDateRef} onChange={onChange} className='input_date'/>
                         <br/>
                         <select ref={selectRef} onChange={onChangeType}>
                            <option name="title" >제목</option>
                            <option name="content">내용</option>
                            <option name="id">작성자</option>
                            </select>
                            <input  type='text'  ref={inputRef} placeholder='검색어를 입력하세요'/>
                            
            
                            <button className='sty02_btn' onClick={onClickSearch} type='button'>검색</button>
                            <button className='sty01_btn' onClick={clickReset} type='button'>초기화</button> 
                             
                        </form>
                    </div>

                {/* 본문 */}
                <div className="tbl_box mt40 btn_under">
                    <table>
                        <colgroup>
                                    <col width="160" />
                                    <col width="50" />
                                    <col width="50" /> 
                                    <col width="1" />
                                    <col width="1" />
                        </colgroup>
                        <thead>
                                <th >제목</th>
                                <th>글쓴이</th>
                                <th>작성일</th>
                        </thead>
                        <tbody>
                            {
                                announcement.length === 0?
                                <h1>loading..</h1>
                                :
                                announcement.map(vo=>
                                    <tr key={vo?.boardNo} onClick={()=>{
                                        navigate(`/announcement/detail/${vo.announcementNo}`)
                                    }}>
                                        <td>{vo?.title}</td>
                                        <td>{vo?.id}</td>
                                        <td>{ vo?.enrollDate?.substring(0,16)}</td>                                        
                                        
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
              
                </div>

                <div>
                <Pagination pvo={pvo} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
            </div>
            
        </StyledBoardListDiv>
    );
};

export default AnnouncementList;