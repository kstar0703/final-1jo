import { React,useRef, useState ,useEffect } from 'react';
import styled from 'styled-components';
import ParkingModal from './ParkingModal';

    // 관리자 수락 및 조회 
    const StyledMemberDiv = styled.div`
    width: 100%;
   display: flex;
   flex-direction : row;

   .new-class{
    display: flex;
    align-items: center;
    flex-direction: column;
    
   }

   .new-class2{
    display: flex;
    gap: 20%;
    
      
   }


   
   

 

   `
const ParkingList = () => {
    //상태업데이트
    const [updateEffect,setUpdateEffect] = useState('');

    //화면 출력용 data

    const[parkingVoList, setParkingVoList] = useState([]);

    const[parkingVoList2, setParkingVoList2] = useState([]);
        
    //데이터 저장용
    const [dataVo,setDataVo] = useState({});

    const onChange = (e)=>{
        const {value,name} = e.target
        setDataVo({
        ...dataVo
        ,[name] : value
        })
    }

    //초기화
    let searchCarNo = useRef();
    let  searchstartDate = useRef();
    let searchEndDate = useRef();
    let searchPurpose = useRef();
    let searchdelYn = useRef();
  
    const onClickReset = () =>{
      searchstartDate.current.value='' 
      searchCarNo.current.value=''
      searchEndDate.current.value='' 
      searchPurpose.current.value='' 
      searchdelYn.current.value='' 
  
      setDataVo({});
    }
  
      //페이징용 
   const [pvo,setPvo] = useState();
 
   const [currentPage, setCurrentPage] = useState(1);
   
   //페이징
   const handlePageChange = (e) =>{
    e.target.focus();
     setCurrentPage(currentPage+1); 
     setUpdateEffect(updateEffect+'a')
   };

    //검색
    let patcherble = true;
    const onClickSearch = () =>{
    setUpdateEffect(updateEffect +'a');
    setCurrentPage(1)
    setParkingVoList([]);

    }

  

   //데이터 보내기
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
      console.log('data 호출')
       console.log(data)
       console.log(data)
       setParkingVoList(prevList => [...prevList, ...data.resultMap]);
        setPvo(data.pageVo);
        
        
       


    } )
    .catch( e => {
        console.error("Error fetching data:", e);
    } )

    .finally ( () =>{
      patcherble = true;
      
    })
}
,[updateEffect])

  
   

    //모달 (로그아웃)
    const closeModal = () => {setIsModalOpen(false)}
        const [isModalOpenLogout, setIsModalOpenLogout] = useState(false);
        const openModalLogout = () => {
            
            setIsModalOpenLogout(true)};
        
        const closeModalLogout = () => {
                
            setIsModalOpenLogout(false)}
    
    const test = ()=>{
        console.log('테스트')
    }

    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_b new-class">
            <div className="ad_tit new-class">

              <h2>나의 방문 예약</h2>

            </div>

            <div className="ad_search_box new-class2">
              <div className="search_item">
                <label form="sel01">차량번호</label>
                <div className="form_box">
                  <input type="text" name="id" ref={searchCarNo} onChange={onChange} />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01" >방문목적</label>
                <div className="form_box">

                  <input type="text" name="title"  ref={searchPurpose} onChange={onChange} />

                </div>
              </div>

              <div className="search_item">
                <label form="sel01">숨김여부</label>
                <div className="form_box">
                  <select name='delYn' class="sel_box" ref={searchdelYn} onChange={onChange} >
                    <option value=''>모두보기</option>
                    <option value='Y'>예약취소</option>
                    <option value="N">정상처리</option>
                  </select>
                </div>
                </div>
          
             

            
              <div className="search_item">
                <label form="sel01">등록시작일</label>
                <div className="form_box">
                <input type="datetime-local" name='startDate' ref={searchstartDate} onChange={onChange}  />
                <span>~</span>
                <input type="datetime-local" name='endDate' ref={searchEndDate} onChange={onChange}  />
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
                <button className='sty02_btn' onClick={openModalLogout}>예약등록</button>
              </div>
            </div>

             

  
          </div>

          <div class="ad_tbl_box data mt40">
            <table>

              <caption>공지사항 검색</caption>

              <colgroup>
              <col width="200px" />
                <col width="100px" />
                <col width="80px" />
                <col width="80px" />
                <col width="80px" />
                <col width="100px" />
                <col width="100px" />
                <col width="100px" />
              
               
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">방문목적</th>
                  <th scope="col">차량번호</th>
                  <th scope="col">예약일</th>
                  <th scope='col'>입차시간</th>
                  <th scope='col'>출차시간</th>
                  <th scope='col'>차감시간</th>
                  <th scope='col'>상태</th>
                  <th scope='col'>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                 {parkingVoList?.map( (vo)=>(
                      <tr key={vo.no}>
                       <td>{vo.purpose}</td>
                       <td>{vo.carNo}</td>
                       <td>{vo.modifyDate ? vo.modifyDate +'(수정)' : vo.enrollDate }</td>
                       <td>{vo.arrivalTime ? vo.arrivalTime : <button>입차</button> }</td>
                       <td>{vo.departureTime ? vo.departureTime : <button>입차</button>}</td>
                       <td>{vo.fee ? vo.fee +'분' : '정산대기'}</td>
                       <td>{vo.delYn ==='Y' ?<span style={{ color: 'red' }}>예약취소</span> :  <span style={{ color: 'green' }}>정상예약</span>}</td> 
                       <td><button className='sty02_btn'>수정/삭제</button></td>
                    </tr>
                    ))}
              </tbody>
            </table>

                  
            
          </div>
          <div>
            {currentPage === pvo?.maxPage ? '': <button className='sty02_btn' onClick={
                (e)=>{
                    handlePageChange(e)
                }}>더보기</button>}
            
          </div>
        </div>

       
        <ParkingModal fecthJava={test}  isOpen={isModalOpenLogout} closeModal={closeModalLogout} title={'로그아웃 하시겠습니까?'}></ParkingModal>
        
      </StyledMemberDiv>
    );
};

export default ParkingList;