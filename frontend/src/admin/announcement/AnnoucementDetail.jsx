import React, { useEffect, useState ,useRef } from 'react';
import { useNavigate,useParams  } from 'react-router-dom';
import styled from 'styled-components';

const DetailDiv = styled.div`
     width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
 
  //디테일박스
 
 .tbl_detail_box{
    width: 100%;

    & table{
         
    }
 }
          
.btn-div2{
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
          

   
`; 


const AnnoucementDetail = () => {

   const navigate = useNavigate()

    let {announcementNo} = useParams();

    const [announcementVo, setBoardVo] = useState();  

    useEffect(
        ()=>{
            
            const url = `http://127.0.0.1:8888/app/announcement/detail/${announcementNo}`;
          
             fetch(url)
             .then( resp => resp.json())
             .then( data => {    
                    setBoardVo(data.resultVo); 
             })
        }
    ,[announcementNo]);

    return (
        <DetailDiv>
             <div className="ad_wrap">
        <div className="detail_heard_box">
          <h1>공지 사항</h1>
        </div>
        <div className="tbl_detail_box">
          <table>
            <caption>투표 상세보기 테이블</caption>
            <colgroup>
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">
                  <div>[공지] : {announcementVo?.title}</div>
                  <div></div>
                </th>
              </tr>
              <tr>
                <th>
                  <div>{announcementVo?.id}</div>
                  <div>
                    <div>{ announcementVo?.enrollDate ? announcementVo.enrollDate.substring(0,10) :''}</div>
                    
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <div>
                    <div className="cont">
                      <h1>{announcementVo?.content}</h1>

                      {announcementVo?.fileList
                        ? announcementVo.fileList.map((file, index) => (
                     <img key={index} src={file.path + file.imgName} alt={`File ${index}`} />
                              ))
                    : ''}

                    </div>
                    <div className='btn-div'>
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>

            <div className='btn-div2' >
                  <button className='sty01_btn' onClick={
                    () =>{
                      navigate("/admin/announcement/list")
                    }
                  }>목록으로</button>

                  <button className='sty02_btn'>
                    수정
                  </button>
            </div>

          
          </table>

          
        </div>
      </div>
        </DetailDiv>
    );
};

export default AnnoucementDetail;