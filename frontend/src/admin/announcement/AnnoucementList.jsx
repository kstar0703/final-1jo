import { React,useRef, useState ,useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import Pagination from '../../components/page/Pagination';


// 관리자 수락 및 조회 
 const StyledMemberDiv = styled.div`
     width: 100%;
    display: flex;
    flex-direction : column;
 `

const AnnoucementList = () => {
  // 업데이트용 effect 재랜더링요

  const [updateEffect,setUpdateEffect] = useState('');
  // 검색어 전달용
  const [dataVo,setDataVo] = useState({
    'delYn' : 'all' 
  });


 //공지사항 map 
  const [announcement,setAnnouncement] = useState([]);
  //페이징용 
  const [pvo,setPvo] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  
  //페이징
  const handlePageChange = (page) =>{
    
   
    setCurrentPage(page); 
    setUpdateEffect(updateEffect+'a')
  };

  //네이게이터
  const navigate = useNavigate();

  //초기화용
  let searchId  =useRef()
  let searchTitle = useRef();
  let searchContent = useRef();
  let searchstartDate = useRef();
  let searchEndDate = useRef();
  let searchdelYn = useRef();

  //데이터 저장용
  const onChange = (event) =>{
    const {name , value} = event.target;
    setDataVo({
        ...dataVo,
      [name] : value,
    }); 

    
  }

  // 검색
  const onClickSearch = () =>{
    console.log(`들어온 pageVo ${pvo}`)
    
    if(!patcherble){
      return
    }
    setPvo({});

    setUpdateEffect(updateEffect+'a')
  }

  // 리셋 승인
  const onClickReset = () =>{
     searchId.current.value=''
     searchTitle.current.value=''
     searchContent.current.value=''
     searchstartDate.current.value='' 
     searchEndDate.current.value='' 
     searchdelYn.current.value='all' 

     setDataVo({
      'delyn' : 'all' 
     })
  }

  let patcherble2 = true
  // 게시글 숨김
  const onClickHidden = (announcementNo) =>{

    if(!patcherble2){return}

    patcherble2= false;

      fetch("http://127.0.0.1:8888/app/announcement/delete",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          'announcementNo': announcementNo
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{

    
        
      if(data.status==='good'){
          alert('공개 처리 성공')
          setUpdateEffect(updateEffect+'a')
      }else{
        alert('숨김 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble2 = true})}
  // 게시글 공개
  const onClickVisible = (announcementNo) =>{

    if(!patcherble2){return}

    patcherble2= false;

      fetch("http://127.0.0.1:8888/app/announcement/cancelDelete",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          'announcementNo': announcementNo
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
        
      if(data.status==='good'){
          alert('숨김 성공')
          setUpdateEffect(updateEffect+'a')
      }else{
        alert('숨김 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble2 = true})
  }
  

  

  

  




  let patcherble = true;

  useEffect(
   () => {
                const queryParams = new URLSearchParams();
                if(dataVo){

                for (const key in dataVo) {
                  queryParams.append(key, dataVo[key]);
                }
          
                queryParams.append('currentPage',currentPage)

                // for (const key in currentPage) {
                //   queryParams.append(key, pvo[key]);
                // }
              }
          
                const queryString = queryParams.toString();
                
                fetch(`http://127.0.0.1:8888/app/announcement/list?${queryString}`)
                .then(resp => resp.json())
                .then( data => {

                  console.log(`들어온 데이터 ${data}`)
                    setAnnouncement(data.voList);

                    setPvo(data.pageVo);

                   
                   


                } )
                .catch( e => {
                    console.error("Error fetching data:", e);
                } )

                .finally ( () =>{
                  patcherble = true;
                })

                ;
                
            },
            [updateEffect]
          );


    const iterableArray = Array.from({ length: 5 }, (_, index) => index + 1);
    
    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">

              <h2>공지사항</h2>

            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">작성자</label>
                <div className="form_box">
                  <input type="text" name="id" onChange={onChange} ref={searchId}  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01" >제목</label>
                <div className="form_box">

                  <input type="text" name="title" onChange={onChange} ref={searchTitle}  />

                </div>
              </div>
          
               <div className="search_item">
                <label form="sel01" >내용</label>
                <div className="form_box">

                  <input type="text" name="content" onChange={onChange} ref={searchContent}  />

                </div>
              </div>

            
              <div className="search_item">
                <label form="sel01">등록시작일</label>
                <div className="form_box">
                  <input type="date" name='startDate' onChange={onChange} ref={searchstartDate}  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">등록종료일</label>
                <div className="form_box">
                  <input type="date" name='endDate' onChange={onChange} ref={searchEndDate}  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">숨김여부</label>
                <div className="form_box">
                  <select name='delYn' class="sel_box" onChange={onChange} ref={searchdelYn} >
                    <option value='all'>모두보기</option>
                    <option value='Y'>숨김</option>
                    <option value="N">공개</option>
                  </select>
                </div>
                </div>
            </div>

            <div className="btn_div">
              <div>

                <button className="sty01_btn" onClick={onClickReset} >초기화</button>
              </div>
              <div>
                <button className="sty02_btn" onClick={onClickSearch} >검색</button>

              </div>

              <div>

                <button className="sty02_btn" onClick={()=>{
                    navigate('/admin/announcement/write')
                }}>공지사항 작성</button>
              </div>
            </div>

             

  
          </div>

          <div class="ad_tbl_box data mt40">
            <table>

              <caption>공지사항 검색</caption>

              <colgroup>
                <col width="100px" />
                <col width="" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
               
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">게시글 번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope='col'>등록일</th>

                  <th scope='col'>상태</th>
                  <th scope='col'>상태처리</th>


                  <th scope='col'>게시글 상세조회 </th>
                 
                </tr>
              </thead>
              <tbody>
                 
              {announcement?.map( (vo)=>(
                      <tr key={vo.no}>
                       <td>{vo.announcementNo}</td> 
                       <td>{vo.content}</td> 
                       <td>{vo.id}</td> 

                       <td>{vo.enrollDate}</td>
                       <td>{vo.delYn ==='Y' ? '비공개' : '공개'    }</td> 
                       <td>{vo.delYn ==='Y' ?  (<button className="sty02_btn"  onClick={()=>{
                          onClickVisible(vo.announcementNo)
                       }}>공개 처리</button>) : <button className="sty02_btn" onClick={ () =>{onClickHidden(vo.announcementNo) }}>비공개 처리</button>   }</td>
                       <td><button className="sty01_btn" onClick={ () =>{
                            navigate(`/admin/announcement/detail/${vo.announcementNo}`)

                       }}>게시글 상세 조회</button> </td>              
                    </tr>
                    ))}

              </tbody>
            </table>

                  
            
          </div>
          
          
          <div>
          <Pagination pvo={pvo} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      </StyledMemberDiv>
    );
};

export default AnnoucementList;