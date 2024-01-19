import { React,useRef, useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


// 관리자 수락 및 조회 
 const StyledMemberDiv = styled.div`
     width: 100%;
    display: flex;
    flex-direction : column;
 `

const AnnoucementList = () => {
  // 업데이트용 effect 재랜더링요
  const [updateEffect,setUpdateEffect] = useState();
  // 검색어 전달용
  const [dataVo,setDataVo] = useState();

 //공지사항 map 
  const [announcement,setAnnouncement] = useState([]);
  //페이징용 
  const [pvo,setPvo] = useState();


  let patcherble = true;

  useEffect(
   () => {
                const queryParams = new URLSearchParams();
          
                if(dataVo){
                for (const key in dateVo) {
                  queryParams.append(key, dateVo[key]);
                }
          
                for (const key in pvo) {
                  queryParams.append(key, vo[key]);
                }
              }
          
                const queryString = queryParams.toString();
                
                fetch(`http://127.0.0.1:8888/app/announcement/list?${queryString}`)
                .then(resp => resp.json())
                .then( data => {
                    setAnnouncement(data.voList);
                    console.log(announcement)
                    setPvo(data.pageVo);
                    console.log(data)

                } )
                .catch( e => {
                    console.error("Error fetching data:", e);
                } )
                ;
                
            },
            [updateEffect]
          );
 


    return (
        <StyledMemberDiv>
        <div className="ad_wrap">
          <div className="ad_search_box_bg">
            <div className="ad_tit">
              <h2>회원 관리</h2>
            </div>

            <div className="ad_search_box">
              <div className="search_item">
                <label form="sel01">작성자</label>
                <div className="form_box">
                  <input type="text" name="id" />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01" >제목</label>
                <div className="form_box">
                  <input type="text" name="title"  />
                </div>
              </div>
          
               <div className="search_item">
                <label form="sel01" >내용</label>
                <div className="form_box">
                  <input type="text" name="content"  />
                </div>
              </div>

            
              <div className="search_item">
                <label form="sel01">등록시작일</label>
                <div className="form_box">
                  <input type="date" name=''  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">등록종료일</label>
                <div className="form_box">
                  <input type="date"  />
                </div>
              </div>

              <div className="search_item">
                <label form="sel01">숨김여부</label>
                <div className="form_box">
                  <select name='delYn' class="sel_box" >
                    <option value='all'></option>
                    <option value='Y'>숨김</option>
                    <option value="N">공개</option>
                  </select>
                </div>
                </div>
            </div>

            <div className="btn_div">
              <div>
                <button className="sty01_btn" >초기화</button>
              </div>
              <div>
                <button className="sty02_btn" >검색</button>
              </div>
            </div>
  
          </div>

          <div class="ad_tbl_box data mt40">
            <table>
              <caption>회원 검색</caption>
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
                  <th scope='col'>숨김여부</th>
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
                       <td>{vo.delYn ==='Y' ? <button>삭제</button> : <button>숨김</button>   }</td>
                       <td><button onClick={ () =>{
                            clickDetail(vo.memberNo) 
                       }}>게시글 상세 조회</button> </td>              
                    </tr>
                    ))}

                
                  
                    
              </tbody>
            </table>
          </div>
        </div>
      </StyledMemberDiv>
    );
};

export default AnnoucementList;