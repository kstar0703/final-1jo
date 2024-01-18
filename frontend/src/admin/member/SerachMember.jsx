import { React,useRef, useState ,useEffect } from 'react';
import styled from 'styled-components';
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
    let searchName = useRef();
    let searchPhone = useRef();
    let searchPermissionYn = useRef();
    
    // 서치vo 
    const [memberVo, setMemberVo] = useState(
      {'name' :   ''  ,
      'phone' :  '' ,
      'permissionYn' : ''
    }
    );

    // 배열 부분
    const [memberArr, setMemberArr] = useState([])       
   

    let patcherble =true;
  
    const onClickSerarch = () =>{
      if(!patcherble){
          return
      }

      setMemberVo({
        'name' :   searchName.current.value  ,
        'phone' :  searchPhone.current.value ,
        'permissionYn' : searchPermissionYn.current.value 
      })
    
      setStateSearch(stateSearch+"a");
    }

    useEffect( () =>{
      
    fetch("http://127.0.0.1:8888/app/admin/findMember",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(memberVo),
    })
    .then( (resp) => {
     
      return resp.json()})
    .then( (data)=>{
      
      setMemberArr(data)
    })
    .catch()
    .finally( () => {patcherble = true})}
    
    ,[stateSearch])

    //초기화
    const onClickReset = () =>{
        searchName.current.value=''
       
        searchPhone.current.value=''
        searchPermissionYn.current.value ='all'
        setState(state+'a')
    }

    //허가 
    let patcherble2 = true;
    const onClickPermission = (memberNo) =>{

     console.log(memberNo)

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
        console.log(data)
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
                  <input type="text" name="name" ref={searchName} />
                </div>
              </div>
              <div className="search_item">
                <label form="sel01" >전화번호</label>
                <div className="form_box">
                  <input type="text" name="phone" ref={searchPhone} />
                </div>
              </div>
          
              <div className="search_item">
                <label form="sel01">승인여부</label>
                <div className="form_box">
                  <select name='permissionYn' class="sel_box" ref={searchPermissionYn}>
                    <option value='all'>모든회원</option>
                    <option value='Y'>승인</option>
                    <option value="N">미승인</option>
                  </select>
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
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">전화번호</th>
                  <th scope="col">성 함</th>
                  <th scope="col">생년월일</th>
                  <th scope="col">성별</th>
                  <th scope="col">세대주/세대원</th>
                  <th scope="col">세대정보</th>
                  <th scope="col">잔여주차시간</th>
                  <th scope="col">허가여부</th>
                </tr>
              </thead>
              <tbody>
                 
                
                    {memberArr.map( (vo)=>(
                      <tr key={vo.no}>
                      <td>{vo.memberNo ? vo.memberNo : ''}</td>
                      <td>{vo.phone ? vo.phone : ''}</td>
                      <td>{vo.name ? vo.name : ''}</td>
                      <td>{vo.birth ? vo.birth : ''}</td>
                      <td>{vo.gender==='F' ? '여성' : '남성'}</td>
                      <td>{vo.ownerYn != null ? (vo.ownerYn ==='Y' ? "세대주" : "세대원") : ''}</td>
                      <td>{`${vo.dong ? vo.dong : ''}동${vo.ho ? vo.ho : ''}호`}</td>
                      <td>{`${Math.floor(vo.vehTime / 60)}시간 ${vo.vehTime % 60}분`}</td>
                        <td>{vo.permissionYn==='Y' ?  ('승인'): <button className='sty02_btn' onClick={ () => {
                          
                          onClickPermission(vo.memberNo)
                      }}>미승인</button>  } </td>
                    </tr>
                    ))}
                    
              </tbody>
            </table>
          </div>
        </div>
      </StyledMemberDiv>
    );
};

export default SerachMember;