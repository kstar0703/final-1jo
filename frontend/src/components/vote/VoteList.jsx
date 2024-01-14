import React, {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteListDiv = styled.div`
    width: 100%;
    height: 100%;
    .seach_box_bg{
        height: 300px;
        background-color: #dadada;
        display: flex;
        justify-content: center;
        align-items: center;
        & form input{
            width: 300px;
            height: 40px;
            border-radius: 10px;
            margin: 10px;
            text-align: center;
        }
         .seach_btn{
            width: 100px;
            &:hover{
               background-color: aqua;
               color: #fff;
            }
         }
    }
    .tbl_box{
        display: flex;
        justify-content: center;
        align-items: center;        
    }
    table{
        /* 테이블 */
        width: 80%;
        & th {
            padding: 15px 0;
            /* background-color: #f0f0f0; */
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
            text-align: center;
            font-size: 13px;
            font-weight: 300;
            /* color: #949494; */
            &:last-child {
                border-right: none;
            }
        }
        & tbody td {
            padding: 15px 10px;
            background-color: #fff;
            /* border-right: 1px solid #ddd; */
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
            word-break: break-all;
            text-align: center;
            font-size: 13px;
            
            /* &:last-child {
                border-right: none;
            } */
            /* & a {
                font-size: 13px;
                font-weight: 300;
                color: var(--font-color);
                & :hover {
                    color: #000;
                    text-decoration: underline;
                }
            } */
        }
        
    }
/* .detail_box {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
}
.detail_box .tbl_box {
    border-top: 1px solid #333;
}
.detail_box .tbl_box tr:first-child th {
    border-top: 0;
}
.detail_box .tbl_box td {
    padding: 5px 10px;
    text-align: left;
}

.tbl_box.data {
    border-top: 1px solid #333;
}
.tbl_box.data table th {
    padding: 10px;
}
.tbl_box.data table td {
    padding: 7px 0;
} */
`;



const VoteList = () => {
    const navigator = useNavigate();

    //fetch
    let [voteVoList,setVoteVoList] = useState([]);
    const loadVoteVoList = () => {
        fetch('http://127.0.0.1:8888/app/vote/list')
        .then( resp => resp.json() )
        .then((data)=>{setVoteVoList(data);} )
        ;
    }
    useEffect(()=>{
        loadVoteVoList();
    },[]);

    return (
        <StyledVoteListDiv>
            <div className='wrap'>
                
                <div className='seach_box_bg'>
                    <form>
                        <input type='text' name='title' placeholder='키워드 검색'/>
                        <input className='seach_btn' type='submit' value="검색"/>
                    </form>
                </div>

                <div className="tbl_box mt40">
                    <table>
                        <caption>OOOO 테이블</caption>
                        <colgroup>
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
                                <th scope="col">제목</th>
                                <th scope="col">내용</th>
                                <th scope="col">작성일자</th>
                                <th scope="col">수정일자</th>
                                <th scope="col">조회수</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                voteVoList.length ===0
                                ?
                                <h1>loding</h1>
                                :
                                voteVoList.map( vo=>
                                    (<tr onClick={()=>{navigator(`/vote/detail/${vo.voteNo}`)}} >{/*key={vo.no} */}
                                        <td>{vo.voteNo}</td>
                                        <td>{vo.title}</td>
                                        <td>{vo.content}</td>
                                        <td>{vo.enrollDate}</td>
                                        {
                                            vo.modifyDate
                                            ?
                                            <td>{vo.modifyDate}</td>
                                            :
                                            <td>{vo.enrollDate}</td>
                                        }
                                        <td>111</td>
                                    </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </StyledVoteListDiv>
    );
};

export default VoteList;