import React, { useEffect, useState ,useRef } from 'react';
import { useNavigate,useParams  } from 'react-router-dom';
import styled from 'styled-components';

const DetailDiv = styled.div`
     width: 100%;
  height: 100%;
  .detail_heard_box {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  //디테일박스
  .tbl_detail_box {
    display: flex;
    justify-content: center;
    align-items: center;
    table {
      width: 80%;
      font-size: 13px;
      font-weight: 300;
      border-top: 1px solid #000;
      border-bottom: 1px solid #ddd;
      & tbody tr th {
        padding: 15px 0;
        border-bottom: 1px solid #ddd;
        vertical-align: middle;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 100px;
        & div {
          display: flex;
          gap: 30px;
        }
      }
      & tbody tr:last-child th {
        display: flex;
        text-align: center;
        justify-content: center;
        & span {
          padding-bottom: 10em;
        }

        & div {
        
          width: 100%;
          flex-direction: column;
          & .cont {
            margin: 3em 0 2.5em;
          }

          

          

          .btn-div {
                display: flex;
                flex-direction: row;
                justify-content: end;
                
                & > button {
                    
                }
          }
        }
      }

    }
  }
   .div-flex{
  display: flex;
  align-items: center;
  justify-content : center;
}



    
` 

const AnnoucementDetail = () => {
    const navigate = useNavigate();

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

    const goList = () =>{
      navigate('/announcement/list')
    }

    return (
        <DetailDiv>
             <div className="wrap">
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
                          <>
                          <div className='div-flex'>
                         <img style={{ width: '1000px', height: '1000px' }} key={index} src={file.path + file.imgName} alt={`File ${file?.originName}`} />
                         </div>
                         </>        
                              ))
                    : ''}

                    </div>
                    <div className='btn-div'>
                      <button className='sty01_btn' onClick={goList}>목록으로</button>
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        </DetailDiv>
    );
};

export default AnnoucementDetail;