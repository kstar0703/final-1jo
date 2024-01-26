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
        .then((data)=>{
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
            <div className='ad_wrap'>
                <div className='content_box'>
                    <div className='title_box mb10'>
                        <h4>미승인 회원 조회</h4>
                        <span>더보기</span>
                    </div>
                    <div className='ad_tbl_box'>
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
                                {
                                    memberVoList?.map((vo)=>(
                                <tr onClick={()=>{navigater('/admin/member/search')}}> 
                                    <td>{vo.memberNo}</td>
                                    <td>{vo.phone}</td>
                                    <td>{vo.dong+"동 "+vo.ho+"호"}</td>
                                    <td>{vo.ownerYn === 'Y' ? "세대주" : "세대원"}</td>
                                    <td>{vo.permissionYn === 'Y' ? "승인" : "미승인"}</td>
                                </tr>

                                    ))
                                }
                               
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='content_box'>
                    <div className='title_box mb10'>
                        <h4>처리할 민원 조회</h4>
                        <span>더보기</span>
                    </div>
                    <div className='ad_tbl_box'>
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
                                { /*여기부터 작업==========================*/
                                    complainVoList?.map(()=>(
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>

                                    ))
                                }
                               
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='content_box'>
                    <div className='title_box mb10'>
                        <h4>최근 공지사항 조회</h4>
                        <span>더보기</span>
                    </div>
                    <div className='ad_tbl_box'>
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
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='content_box'>
                    <div className='title_box mb10'>
                        <h4>조회수 많은 소통 게시판</h4>
                        <span>더보기</span>
                    </div>
                    <div className='ad_tbl_box'>
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
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동 김지영(010-11111-1111)</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className='content_box'>
                    <div className='title_box mb10'>
                        <h4>방문 차량 예약일 조회</h4>
                        <span>더보기</span>
                    </div>
                    <div className='ad_tbl_box'>
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
                                    <th>차량번호</th>
                                    <th>방문예정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>2024-01-25 16:16:54</td>
                                    <td>가나바1234</td>
                                    <td>2024-01-02 00:00:00(수정)</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>010-6666-6666</td>
                                    <td>101동201호</td>
                                    <td>세대원</td>
                                    <td>N</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </StyledMainPageDiv>
    );
};

export default MainPage;