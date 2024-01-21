import { React,useRef, useState ,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../components/page/Pagination';

// 관리자 수락 및 조회 
const StyledMemberDiv = styled.div`
width: 100%;

display: flex;
flex-direction : column;

.spanspan{
  margin-right: 10px;
}

.spanspan2{
  margin: 10px;
}

.divdiv{
  margin-left: 20px;
}

`


const ParkingList = () => {

  //데이터 뭉치기
  const[dataVo,setDataVo] = useState({})
  
    const onChange = (e)=>{
      const {value,name} = e.target
      setDataVo({
        ...dataVo
        ,[name] : value
      })
    }
  
  
  
  //주차내역
  const[parkingVoList,setParkingVoList] = useState();
  
  // 화면 랜더링용
  const[updateEffect,setUpdateEffect] = useState('');

  
  let searchName  =useRef()
  let searchPhone = useRef();
  let searchDong = useRef();
  let searchHo = useRef();
  let searchCarNo = useRef();
  let  searchstartDate = useRef();
  let searchEndDate = useRef();
  let searchPurpose = useRef();
  let searchdelYn = useRef();


  //초기화
  const onClickReset = () =>{
    searchName.current.value=''
    searchPhone.current.value=''
    searchDong.current.value=''
    searchHo.current.value='' 
    searchstartDate.current.value='' 
    searchCarNo.current.value=''
    searchEndDate.current.value='' 
    searchPurpose.current.value='' 
    searchdelYn.current.value='' 

    setDataVo({});
  }

  //검색
  let patcherble = true;
  const onClickSearch = () =>{
    console.log(dataVo)

    

    setUpdateEffect(updateEffect +'a');
  }


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

  //데이터 보내기   
  useEffect(  () => {
                const queryParams = new URLSearchParams();
                if(dataVo){

                for (const key in dataVo) {
                  queryParams.append(key, dataVo[key]);
                }
          
                queryParams.append('currentPage',currentPage)
              }

              
          
                const queryString = queryParams.toString();
                
                fetch(`http://127.0.0.1:8888/app/parking/list?${queryString}`)
                .then(resp => resp.json())
                .then( data => {
                  console.log('data 호출')
                   console.log(data)
                    setParkingVoList(data.resultMap);
                    setPvo(data.pageVo);
                    
                    
                   


                } )
                .catch( e => {
                    console.error("Error fetching data:", e);
                } )

                .finally ( () =>{
                  patcherble = true;
                  
                })

                ;
                
            }
  ,[updateEffect])


  let patcherble2 = true
  // 예약취소
  const onClickCancel = (vo) =>{

    if(vo.departureTime){
      alert('입차 상태에서는 예약취소는 불가능 합니다')
      return
    }

    if(!patcherble2){return}

    patcherble2= false;

      fetch("http://127.0.0.1:8888/app/parking/cancel",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          'parkingNo': vo.parkingNo
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
        
      if(data.status==='good'){
          alert('예약 취소 성공')
          setUpdateEffect(updateEffect+'a')
      }else{
        alert('숨김 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble2 = true})}
  // 예약복구
  const onClickRecovery = (vo) =>{

   

    if(!patcherble2){return}

    patcherble2= false;

      fetch("http://127.0.0.1:8888/app/parking/recovery",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          'parkingNo': vo.parkingNo
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
        
      if(data.status==='good'){
          alert('복구 성공')
          setUpdateEffect(updateEffect+'a')
      }else{
        alert('복구 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble2 = true})
  }


    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>방문예약조회</h2>
            </div>

            <div className="ad_search_box">
              
            <div className="search_item">
                <label form="sel01" >회원명</label>
                <div className="form_box">
                  <input type="text" name="name" ref={searchName} onChange={onChange}    />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01" >전화번호</label>
                <div className="form_box">
                  <input type="text" name="phone"  ref={searchPhone} onChange={onChange}   />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">동호수</label>
                <div className="form_box">
                  <input type="text" name="dong"  ref={searchDong} onChange={onChange}  />
                </div>
                <span className='spanspan'>동</span>
                <div className="form_box">
                  <input type="text" name="ho"  ref={searchHo} onChange={onChange}  />
                </div>
                <span className='spanspan'>호</span>
              </div>

              <div className="search_item">
                <label form="sel01" >차량번호</label>
                <div className="form_box">
                  <input type="text" name="carNo"  ref={searchCarNo}  onChange={onChange}  />
                </div>
              </div>
          
               

            
              <div className="search_item">
                <label form="sel01">등록일</label>
                <div className="form_box">
                  <input type="datetime-local" name='startDate' ref={searchstartDate} onChange={onChange}   />
                </div>
               <span className='spanspan2'>~</span>
                <div className="form_box">
                  <input type="datetime-local" name='endDate' ref={searchEndDate} onChange={onChange}  />
                </div>
                
              </div>

              <div className="search_item">
                <label form="sel01" className='divdiv' >방문목적</label>
                <div className="form_box">
                  <input type="text" name="purpose" ref={searchPurpose} onChange={onChange}/>
                </div>
              </div>

              

              <div className="search_item">
                <label form="sel01">취소여부</label>
                <div className="form_box">
                  <select name='delYn' class="sel_box" ref={searchdelYn} onChange={onChange}  >
                    <option value=''>모두보기</option>
                    <option value="N">정상예약</option>
                    <option value='Y'>예약취소</option>
                  </select>
                </div>
                </div>
            </div>

            <div className="btn_div">
              <div>
                <button className="sty01_btn" onClick={onClickReset}>초기화</button>
              </div>
              <div>
                <button className="sty02_btn" onClick={onClickSearch}>검색</button>
              </div>

            </div>

             
  
          </div>

          <div class="ad_tbl_box data mt40">
            <table>
              <caption>주차예약</caption>
              <colgroup>
                <col width="80px" />
                <col width="100px" />
                <col width="150px" />
                <col width="150px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
               
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">예약번호</th>      
                  <th scope="col">예약자</th>
                  <th scope="col">전화번호</th>
                  <th scope='col'>방문목적</th>
                  <th scope='co1'>차량번호</th>
                  <th scope="col">예약일</th>
                  <th scope='col'>입차시간</th>
                  <th scope='col'>출차시간</th>
                  <th scope='col'>차감시간</th>
                  <th scope='col'>상태</th>
                  <th scope='col'>삭제처리</th>
                </tr>
              </thead>
              <tbody>

              

              {parkingVoList?.map( (vo)=>(
                      <tr key={vo.no}>
                       <td>{vo.parkingNo}</td> 
                       <td>{vo.name}</td> 
                       <td>{vo.phone}</td> 
                       <td>{vo.purpose}</td>
                       <td>{vo.carNo}</td>
                       <td>{vo.modifyDate ? vo.modifyDate +'(수정)' : vo.enrollDate }</td>
                       <td>{vo.arrivalTime ? vo.arrivalTime :  '입차대기'}</td>
                       <td>{vo.departureTime ? vo.departureTime : '출차대기'}</td>
                       <td>{vo.fee ? vo.fee +'분' : '정산대기'}</td>
                       <td>{vo.delYn ==='Y' ?<span style={{ color: 'red' }}>예약취소</span> :  <span style={{ color: 'green' }}>정상예약</span>}</td> 
                       <td>{vo.delYn ==='Y' ?  (<button className="sty02_btn" onClick={ ()=>{onClickRecovery(vo);}}>예약복구</button>) 
                                                                    : <button className="sty02_btn"  onClick={ ()=>{onClickCancel(vo);}}>예약취소</button>} </td>
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

export default ParkingList;