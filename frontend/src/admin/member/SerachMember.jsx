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

    const [stateSearch,setStateSearch] = useState('');
    let searchName = useRef();
    let searchPhone = useRef();
    let searchPermissionYn = useRef();
    
    const [memberVo, setMemberVo] = useState(
      {'name' :   ''  ,
      'phone' :  '' ,
      'permissionYn' : ''
    }
    );
   

    let patcherble =true;
  
    const onClickSerarch = () =>{
      

      if(!patcherble){
        return;
    }


     

      setStateSearch(stateSearch+"a");
      
    }

  

    useEffect( () =>{

      
      
      setMemberVo({
        'name' :   searchName.current.value  ,
        'phone' :  searchPhone.current.value ,
        'permissionYn' : searchPermissionYn.current.value 
      })
   

    fetch("http://127.0.0.1:8888/app/admin/findMember",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(memberVo),
    })
    .then( (resp) => {return resp.json()})
    .then( (data)=>{
      console.log(data)
    })
    .catch()
    .finally( () => {patcherble = true})}
    
    ,[stateSearch])

  

  

    const onClickReset = () =>{
        searchName.current.value=''
       
        searchPhone.current.value=''
        searchPermissionYn.current.value ='all'
        setState(state+'a')
    }
    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>설문투표 조회</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">성함</label>
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
                 
                    <tr>
                    <td>1</td>
                    <td>010-5382-4910</td>
                    <td>김희성</td>
                    <td>960703</td>
                    <td>남</td>
                    <td>세대주</td>
                    <td>100동1704호</td>
                    <td>100시간 0분</td>
                    <td><button>허가</button></td>
                    </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </StyledMemberDiv>
    );
};

export default SerachMember;