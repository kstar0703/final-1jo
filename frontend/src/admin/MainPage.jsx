import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMainPageDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #eee;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    .ad_wrap{
        width: 80%;
        height: 80%;
        display: grid;
        grid-template-columns: 35vw 35vw ;
        grid-template-rows:  repeat(4, 1fr) ;
        justify-content: space-between;
        row-gap: 40px;
        column-gap: 20px;
        & :last-child{
            grid-column: 1 / span 2;
        }
    }
    .content_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 0; 
        background-color: #fff;
        border-radius: 20px;
        
    }
    .title_box{
        width: 80%;
        display: flex;
        justify-content:space-between ;
        align-items: end;
        & span{
            font-size: 0.1em;
            font-weight: 300;
            color: #ccc;
            &:hover{
                font-weight: 300;
                color : #5A6E5A
            }
        }
    }
    .ad_tbl_box{
        padding: 0px;
        & table{
            & th{
                /* font-size: 0.5em; */
                padding: 1px;
            }
            & td{
                /* font-size: 0.3em; */
            }
        }
    }
`;

const MainPage = () => {

    const navigater = useNavigate();

    const [complainVoList, setComplainVoList] = useState();
    const [memberVoList, setMemberVoList] = useState();
    const [announcementVoList, setAnnouncementVoList] = useState();
    const [boardVoList, setBoardVoList] = useState();
    const [parkingVoList, setParkingVoList] = useState();

    const loadvoList = () =>{

        fetch("http://127.0.0.1:8888/app/admin/adminMainPage")
        .then(resp =>(resp.json()))
        .then((data)=>{ console.log(data);
            setComplainVoList(data.complainVoList);
            setMemberVoList(data.memberVoList);
            setAnnouncementVoList(data.announcementVoList);
            setBoardVoList(data.boardVoList);
            setParkingVoList(data.parkingVoList);
        })
        ;

    }

    useEffect(()=>{
        loadvoList();
    },[])

    return (
      <StyledMainPageDiv>
        <div className="ad_wrap">
          <div className="content_box">
            <div className="title_box mb10">
              <h4>미승인 회원 조회</h4>
              <span onClick={()=>{navigater("/admin/member/search");}}>더보기</span>
            </div>
            <div className="ad_tbl_box">
              <table>
                <caption>미승인 회원 조회 테이블</caption>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>전화번호</th>
                    <th>세대정보</th>
                    <th>세대주/세대원</th>
                    <th>승인여부</th>
                  </tr>
                </thead>
                <tbody>
                  {memberVoList?.map((vo) => (
                    <tr
                      onClick={() => {
                        navigater("/admin/member/search");
                      }}
                    >
                      <td>{vo.memberNo}</td>
                      <td>{vo.phone}</td>
                      <td>{vo.dong + "동 " + vo.ho + "호"}</td>
                      <td>{vo.ownerYn === "Y" ? "세대주" : "세대원"}</td>
                      <td>{vo.permissionYn === "Y" ? "승인" : "미승인"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content_box">
            <div className="title_box mb10">
              <h4>처리할 민원 조회</h4>
              <span onClick={()=>{navigater("/admin/complaint/list");}}>더보기</span>
            </div>
            <div className="ad_tbl_box">
              <table>
                <caption>처리할 민원 조회 테이블</caption>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>작성자</th>
                    <th>처리상태</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    /*여기부터 작업==========================*/
                    complainVoList?.map((vo) => (
                      <tr
                        onClick={() => {
                          navigater(
                            `/admin/complaint/detail/${vo?.complaintNo}`
                          );
                        }}
                      >
                        <td>{vo.complaintNo}</td>
                        <td>{vo.title}</td>
                        <td>{vo.dong + "동 " + vo.ho + "호"}</td>
                        <td>{vo.memberNo + "번 관리자"}</td>
                        <td>{vo.status === "Y" ? "처리완료" : "미처리"}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="content_box">
            <div className="title_box mb10">
              <h4>최근 공지사항 조회</h4>
              <span onClick={()=>{navigater("/admin/announcement/list");}}>더보기</span>
            </div>
            <div className="ad_tbl_box">
              <table>
                <caption>최근 공지사항 조회 테이블</caption>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>등록일</th>
                    <th>작성자</th>
                  </tr>
                </thead>
                <tbody>
                  {announcementVoList?.map((vo) => (
                    <tr
                      onClick={() => {
                        navigater(
                          `/admin/announcement/detail/${vo.announcementNo}`
                        );
                      }}
                    >
                      <td>{vo.announcementNo}</td>
                      <td>{vo.title}</td>
                      <td>{vo.dong + "동 " + vo.ho + "호"}</td>
                      <td>{vo.managerNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content_box">
            <div className="title_box mb10">
              <h4>조회수 많은 소통 게시판</h4>
              <span onClick={()=>{navigater("/admin/board/list");}}>더보기</span>
            </div>
            <div className="ad_tbl_box">
              <table>
                <caption>조회수 많은 소통 게시판 테이블</caption>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>카테고리</th>
                    <th>글쓴이</th>
                    <th>제목</th>
                    <th>댓글수</th>
                    <th>조회</th>
                  </tr>
                </thead>
                <tbody>
                  {boardVoList?.map((vo) => (
                    <tr
                      onClick={() => {
                        navigater(`/admin/board/detail/${vo.boardNo}`);
                      }}
                    >
                      <td>{vo.boardNo}</td>
                      <td>{vo.categoryName}</td>
                      <td>
                        {vo.dong}동 {vo.name}
                        <br />({vo.phone})
                      </td>
                      <td>{vo.title}</td>
                      <td>{vo.replyCount}</td>
                      <td>{vo.hit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content_box">
            <div className="title_box mb10">
              <h4>방문 차량 예약일 조회</h4>
              <span onClick={()=>{navigater("/admin/parking/list");}}>더보기</span>
            </div>
            <div className="ad_tbl_box">
              <table>
                <caption>방문 차량 예약일 조회 테이블</caption>
                <colgroup>
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                  <col width="" />
                </colgroup>
                <thead>
                  <tr>
                    <th>예약번호</th>
                    <th>예약자</th>
                    <th>방문지</th>
                    <th>차량번호</th>
                    <th>예약일</th>
                    <th>방문예정일</th>
                  </tr>
                </thead>
                <tbody>
                  {parkingVoList?.map((vo) => (
                    <tr
                      onClick={() => {
                        navigater("/admin/parking/list");
                      }}
                    >
                      <td>{vo.parkingNo}</td>
                      <td>{vo.name}</td>
                      <td>
                        {vo.dong}동 {vo.name}
                      </td>
                      <td>{vo.carNo}</td>
                      <td>{vo.writeDate}</td>
                      <td>
                        {vo.modifyDate
                          ? vo.modifyDate + "(수정)"
                          : vo.enrollDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StyledMainPageDiv>
    );
};

export default MainPage;