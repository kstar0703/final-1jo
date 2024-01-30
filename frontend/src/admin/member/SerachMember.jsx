import { React,useRef, useState ,useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/page/Pagination';
// 관리자 수락 및 조회 
 const StyledMemberDiv = styled.div`
     width: 100%;
     height: 100%;
    display: flex;
    flex-direction : column;
 `

const SerachMember = () => {


    // 초기화용
    const [state,setState] = useState('');

    // 검색패치 다시 보내기용
    const [stateSearch,setStateSearch] = useState('');
    
    // 돔접근용
    let searchName = useRef();
    let searchPhone = useRef();
    let searchPermissionYn = useRef();
    let searchOwnerYn = useRef();
    let searchHo = useRef();
    let searchDong = useRef();


    // 서치vo 
    const [memberVo, setMemberVo] = useState({
      'permissionYn' : 'N'
    })

    const onChange = (event) =>{
      const {name , value} = event.target;
      setMemberVo({
          ...memberVo,
        [name] : value,
      }); 
    }

    //페이징용 
  const [pvo,setPvo] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  
  //페이징
  const handlePageChange = (page) =>{
    
   
    setCurrentPage(page); 
    setStateSearch(stateSearch+'a')
  };




  


    // 배열 부분
    const [memberArr, setMemberArr] = useState([])       
   

    let patcherble =true;
  
    // 검색
    const onClickSerarch = () =>{

      
      
   

      if(!patcherble){
          return
      }


    
      setStateSearch(stateSearch+"a");
    }

    useEffect( () =>{

         const queryParams = new URLSearchParams();
                if(memberVo){

                for (const key in memberVo) {
                  queryParams.append(key, memberVo[key]);
                }
          
                queryParams.append('currentPage',currentPage)
              }

              const queryString = queryParams.toString();

    fetch(`http://127.0.0.1:8888/app/admin/findMember?${queryString}`)
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{

      console.log(data)
      
      if(data.status==='good'){
      setPvo(data.pageVo);
      setMemberArr(data.voList)
      }
    })
    .catch()
    .finally( () => {patcherble = true})}
    
    ,[stateSearch])

    //초기화
    const onClickReset = () =>{
        searchName.current.value=''
        searchPhone.current.value=''
        searchPermissionYn.current.value ='N'
        searchOwnerYn.current.value ='all'
        searchHo.current.value = ''
        searchDong.current.value = ''
        setMemberVo({
          'permissionYn' : 'N'
        })
        setState(state+'a')
    }

    //허가 
    let patcherble2 = true;
    const onClickPermission = (memberNo) =>{


      if(!patcherble2){return}


      fetch("http://127.0.0.1:8888/app/admin/acceptMember",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          memberNo: memberNo,
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
        
      if(data.msg==='성공'){
          alert('승인 성공')
          setStateSearch(stateSearch+"a");
      }else{
        alert('승인 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble2 = true
      
    })

    }

    // 허가 취소
    let patcherble3 = true;
    const onClickCancelPermission = (memberNo) =>{

      if(!patcherble3){return}


      fetch("http://127.0.0.1:8888/app/admin/cancelacceptMember",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          memberNo: memberNo,
        }),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
        
      if(data.msg==='성공'){
          alert('승인취소 성공')
          setStateSearch(stateSearch+"a");
      }else{
        alert('승인 실패')
      }
      
    })
    .catch()
    .finally( () => {patcherble3 = true
      
    })

    }

    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>회원 관리</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">이름</label>
                <div className="form_box">
                  <input type="text" name="name" ref={searchName} onChange={onChange} />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01" >전화번호</label>
                <div className="form_box">
                  <input type="text" name="phone" ref={searchPhone} onChange={onChange} />
                </div>
              </div>
          
              <div className="search_item">
                <label form="sel01">승인여부</label>
                <div className="form_box">
                  <select name='permissionYn' class="sel_box" ref={searchPermissionYn} onChange={onChange}>
                  <option value="N">미승인</option>
                  <option value='Y'>승인</option>
                  <option value='all'>모든회원</option>
                  </select>
                </div>
              </div>

              {/* 세대주 여부 추가 +동 호수 추가 */}
              <div className="search_item">
                <label form="sel01">세대주</label>
                <div className="form_box">
                  <select name='ownerYn' class="sel_box" ref={searchOwnerYn} onChange={onChange}>
                    <option value='all'>모든회원</option>
                    <option value='Y'>세대주</option>
                    <option value="N">세대원</option>
                  </select>
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">동호수</label>
                <div className="form_box">
                <input type="text" name="dong" onChange={onChange} ref={searchDong} />동   <input type="text" name="ho" onChange={onChange} ref={searchHo} /> 호
                </div>
              </div>



              {/*필요 시 추가 가능*/}
            </div>

            <div className="btn_div">
              <div>
                <button className="sty01_btn" onClick={onClickReset}>초기화</button>
              </div>
              <div>
                <button className="sty02_btn" onClick={onClickSerarch}>검색</button>
              </div>
            </div>
          </div>
          <div class="ad_tbl_box data mt40">
            <table>
              <caption>회원 검색</caption>
              <colgroup>
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
                <col width="" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">성 함</th>
                  <th scope="col">전화번호</th>
                  <th scope='col'>이메일</th>
                  <th scope='col'>가입일</th>
                  <th scope="col">생년월일</th>
                  <th scope="col">성별</th>
                  <th scope="col">세대주/세대원</th>
                  <th scope="col">세대정보</th>
                  <th scope="col">잔여주차시간</th>
                  <th scope="col">승인여부</th>
                  <th>회원수락</th>
                </tr>
              </thead>
              <tbody>
                 
                
                    {memberArr?.length<=0 ? '검색결과 없음' :  memberArr?.map( (vo)=>(
                      <tr key={vo.no}>
                      <td>{vo.memberNo ? vo.memberNo : ''}</td>
                      <td>{vo.name ? vo.name : ''}</td>
                      <td>{vo.phone ? vo.phone : ''}</td>
                      <td>{vo.email ? vo.email : ''}</td>
                      <td>{vo.joinDate ? vo.joinDate : ''}</td>
                      <td>{vo.birth ? vo.birth : ''}</td>
                      <td>{vo.gender==='F' ? '여성' : '남성'}</td>
                      <td>{vo.ownerYn != null ? (vo.ownerYn ==='Y' ? "세대주" : "세대원") : ''}</td>
                      <td>{`${vo.dong ? vo.dong : ''}동${vo.ho ? vo.ho : ''}호`}</td>
                      <td>{`${Math.floor(vo.vehTime / 60)}시간 ${vo.vehTime % 60}분`}</td>
                      <td>{vo.permissionYn ? vo.permissionYn ==='Y' ? <span style={{color :"green"}}>승인</span> : <span style={{color :"red"}} >미승인</span> : '' }</td>
                        <td>{vo.permissionYn==='Y' ?  
                        <button className='sty01_btn' onClick={ () => {
                          
                          onClickCancelPermission(vo.memberNo)
                      }}>승인취소</button>
                        
                        : <button className='sty02_btn' onClick={ () => {
                          
                          onClickPermission(vo.memberNo)
                      }}>승인</button>  } </td>
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

export default SerachMember;