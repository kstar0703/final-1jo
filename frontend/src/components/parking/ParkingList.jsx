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
   
   .sty88_btn{
    width: 100px;
    height: 38px !important;
    border-radius: 10px;
    color: white;
    background-color:red
    }

  
   .sty77_btn:hover{
      background-color:#ccc ;
      color: black;
   }


   
   

 

   `
const ParkingList = () => {
    //상태업데이트
    const [updateEffect,setUpdateEffect] = useState('');

    const handleUpdateEffect = () =>{
      setUpdateEffect(updateEffect+'a')
    }

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
    const [parkingVo,setParkingVo] = useState()
    

      //모달 (등록창) 
      const [modalOpenRegister,setmodalOpenRegister]  = useState(false);
      const openModalRegister = () => { 
        setParkingVo({})
        setmodalOpenRegister(true)};
      const closeModalRegister = () => { setmodalOpenRegister(false)}

      //모달 (수정창)
      const [modalOpenChange,setModalOpenChange] = useState(false);

      const closeModalChange =() => { setModalOpenChange(false)}  
      const onClickChange = (vo) =>{ 
        console.log('체인지')
        setParkingVo(vo)
        setModalOpenChange(true)
      }
    

      //모달 (디테일창)
      const [modalOpenDetail,setModalOpenDetail] = useState(false);

      const closeModalDetail = () =>{ setModalOpenDetail(false) }
      const onClickDetail = (vo) =>{ 
        setModalOpenDetail(true)
        setParkingVo(vo)}

      

    
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
                  <input type="text" name="carNo" ref={searchCarNo} onChange={onChange} />
                </div> 
              </div>

              <div className="search_item">
                <label form="sel01" >방문목적</label>
                <div className="form_box">

                  <input type="text" name="purpose"  ref={searchPurpose} onChange={onChange} />

                </div>
              </div>

              <div className="search_item">
                <label form="sel01">상태</label>
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
                <button className='sty02_btn' onClick={openModalRegister}>예약등록</button>
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
                      <tr key={vo.no} style={{ zIndex: 0 }} >
                       <td onClick={()=>{onClickDetail(vo)}}>{vo.purpose}</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{vo.carNo}</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{ vo?.delYn ==='Y' ? <span className='cancel-span'> --</span> : vo.delYn ==='Y' ? <span style={{ color: 'red' }} >예약취소</span > : vo.modifyDate ?<span style={{ color: 'green' }}> {vo.modifyDate.substring(0, 16) +'(수정)'}</span> : vo.enrollDate  }</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{ vo?.delYn ==='Y' ? <span className='cancel-span'>--</span> : vo.arrivalTime ? vo.arrivalTime.substring(0, 16) : <span>입차대기</span> }</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{ vo?.delYn ==='Y' ? <span className='cancel-span'>--</span> : vo.departureTime ? vo.departureTime.substring(0, 16) : <span>출차대기</span>}</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{vo?.delYn ==='Y' ? <span className='cancel-span'>--</span> : vo.fee ? vo.fee +'분' : '정산대기'}</td>
                       <td onClick={()=>{onClickDetail(vo)}}>{vo.delYn ==='Y' ?<span style={{ color: 'red' }}>예약취소</span> : !vo.fee? <span style={{ color: 'green' }}>정상예약</span> : <span style={{ color: 'blue' }}>정산완료</span> } </td> 
                       <td>
                        {vo?.delYn ==='Y' ? <button className='sty88_btn'>예약취소</button> :  vo.arrivalTime ? 
                          <button style={{ zIndex: 1 }} className='sty01_btn sty77_btn' >삭제불가</button>: 
              
                        <button style={{ zIndex: 1 }} className='sty02_btn' onClick={()=>{onClickChange(vo)}}>수정/삭제</button>

                        }
                       </td>
                    </tr>
                    ))}
              </tbody>
            </table>

                  
            
          </div>
          <div>
            {(currentPage === pvo?.maxPage || pvo?.maxPage===0)? '': <button  className='sty02_btn' onClick={
                (e)=>{
                    handlePageChange(e)
                }}>더보기</button>}
            
          </div>
        </div>

        {/* modalTypeUpdateEffect  */}

        {/* 등록 'regiseter' */} 
        <ParkingModal modalType={'regiseter'} updateEffectModal={handleUpdateEffect}  isOpen={modalOpenRegister} closeModal={closeModalRegister} title={'차량 방문예약 등록'} parkingVo={parkingVo}></ParkingModal>
        
        {/* 수정/삭제 'change' */}
        <ParkingModal modalType={'change'} updateEffectModal={handleUpdateEffect}  isOpen={modalOpenChange} closeModal={closeModalChange} title={'차량 방문예약 수정'} parkingVo={parkingVo}></ParkingModal>
        {/* 내역조회 */}
        <ParkingModal modalType={'detail'} updateEffectModal={handleUpdateEffect}  isOpen={modalOpenDetail} closeModal={closeModalDetail} title={'차량 방문예약 조회'} parkingVo={parkingVo}></ParkingModal>
        
      </StyledMemberDiv>
    );
};

export default ParkingList;