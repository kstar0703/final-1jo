import React ,{useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteDetailDiv = styled.div`
        width: 100%;
        height: 100%;
    .detail_heard_box{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tbl_detail_box{
        display: flex;
        justify-content: center;
        align-items: center;
        table{
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
                & div{
                    display: flex;
                    gap: 30px;
                }
            }
            & tbody tr:last-child th{
                display: flex;
                text-align: center;
                justify-content: center;
                & span{
                    padding-bottom: 100px;
                }

                & div{
                    width: 100%;
                    flex-direction: column;
                    & button{
                        border-radius: 20px;
                        height: 70px;
                    }
                }
            }
        }
    }
`;

const VoteDetail = () => {

    //회원 id
    const str = {"memberNo":1};
    const memberNo = str.memberNo;
    // const memberLogin = JSON.parse(str);
    // const memberNo = memberLogin.no;
    const navigator = useNavigate();
    const voteNo = useParams();

    //fetch
    let [voteVo,setVoteVo] = useState([]);
    let [voteVoList, setVoteVoList] = useState([]);
    const loadVoteVo = () => {
        fetch('http://127.0.0.1:8888/app/vote/detail',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(voteNo),

        })
        .then(resp => resp.json())
        .then((data)=>{
            console.log(data);
            setVoteVo(data);
            setVoteVoList(data.voList)
        })
        ;
    }
    useEffect(()=>{
        loadVoteVo();
        console.log(voteVo.voList);
    },[]);
    /******************************************여기부터 진행하기*/
    const [radio, setRadio] = useState({

    });

    const handleClickRadio = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        const {name : value} = e.target;
        setRadio({
            name : value,
        });
        console.log(radio);
        
    }
    //투표 완료 시 실행되는 fetch
    const HandleSubmit = (e) => {
        if(radio.length < 1){
            return alert("투표 후 다시 진행해주세요");

        }
        fetch("http://127.0.0.1:8888/app/vote/voting",{
            method : "POST",
            headers : {
                    "Contect-Type" : "application/json",
                },
                body : JSON.stringify(radio),
            })
            .then()
            .then()
            ;
        alert("투표가 완료되었습니다.");
        // navigator("/vote/list");
    }
    return (


        <StyledVoteDetailDiv>
            
            <div className='wrap'>
                <div className='detail_heard_box'>
                    <h1>설문 투표</h1>
                </div>
                <div className='tbl_detail_box'>
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
                                    <div>{voteVo.title}</div>
                                        <div>{"111"}</div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div>관리자</div>
                                    <div>
                                        <div>등록일자 : {voteVo.enrollDate}</div>
                                        <div>마감일자 : {voteVo.deadlineDate}</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <div>
                                    {
                                        voteVoList.map( vo=>
                                        (<span>
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type='radio' value={vo.voteOrder} name='voteOrder' onChange={handleClickRadio}/> {vo.voteOrder}번 {vo.itemName}
                                                    </label>
                                                </li>
                                            </ul>
                                        </span>))
                                    }
                                        {/*투표 안하고 누르면 막고 팝업창 띄우기*/}
                                        <button onClick={HandleSubmit}>투표하기</button>
                                    </div>
                                </th>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>   
        </StyledVoteDetailDiv>
    );
};

export default VoteDetail;