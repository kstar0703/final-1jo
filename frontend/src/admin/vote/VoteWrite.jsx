import React ,{useState,useRef,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledVoteWriteDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
.item_btn{
    & button{
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #eee;
        margin: 0 auto;

        &:hover{
            color:#fff;
            background-color: lightcoral;
        }
    }
}
`;

const VoteWrite = () => {
    const navigator = useNavigate();
    
    //textArear 자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);
    
    
    //작성하기 버튼 기능 onChange를 이용해서 select 값 받아서 묶어서 넘기기
    // const [formData, setFormData] = useState([]);
    
    const [titleValue,setTitleValue] = useState([]);
    const [contentValue,setContentValue] = useState([]);
    const acceptYn = useRef();
    const delYn = useRef();
    const deadDate = useRef();

    const [itemArr,setItemArr] = useState([]);
    const [itemVo, setItemVo] = useState({});
    
    const handleSubmit = () => {
        /* 모달 만들기 */
        // setFormData({
        //   title: titleValue,
        //   content: contentValue,
        //   delYn: delYn.current.value,
        //   acceptYn: acceptYn.current.value,
        //   voteNo,
        // });
        // console.log(formData);
        console.log(delYn.current.value);
        console.log(acceptYn.current.value);
        console.log(deadDate.current.value);
        console.log(titleValue);
        console.log(contentValue);
        // fetch("http://127.0.0.1:8888/app/vote/insert", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     title: titleValue,
        //     content: contentValue,
        //     delYn: delYn.current.value,
        //     acceptYn: acceptYn.current.value,
        //     deadlineDate: deadDate.current.value,
        //     managerNo : '9'
        //   }),
        // })
        //   .then((resp) => resp.json())
        //   .then((data) => {
        //     console.log(data);
        //     if (data === 1) {
        //       alert("작성이 완료되었습니다.");
        //       navigator("/admin/vote/list");
        //     }
        //   });
/****************************************여기부터 수정 */
          fetch("http://127.0.0.1:8888/app/vote/itemInsert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },body: JSON.stringify(itemArr)})
            .then((resp) => resp.json())
            .then((data) => {console.log(data);})
            ;

    }
    const handleAdd = (e) => {
        setItemArr(
            [
                ...itemArr, {
                    "itemName" : itemVo,
                    "itemNo" : itemArr.length+1,
                }
            ]

        )
    }
    const handleDel = () => {
        itemArr.pop();
        setItemArr([
            ...itemArr,
        ])
    }
    const handleSubmit2 = () => {
        console.log(itemArr);
    }
    return (
        <StyledVoteWriteDiv>
            <div className='ad_wrap'>
                <div class="ad_detail_box">
                    <div className="ad_tit">
                        <h2>설문투표 게시글 작성</h2>  
                    </div>

                    <div className='ad_tbl_box'>  
                        <table>
                        <caption>설문투표 작성 테이블</caption>
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                </colgroup>                        
                            <tbody>
                                <tr>
                                <th scope="row"><label form="">작성 번호</label></th>
                                    <td>{'9'}</td>
                                    <th scope="row"><label form=''>마감일자</label></th>
                                    <td><input ref={deadDate} type='date'/></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form=''>공개여부</label></th>
                                    <td>
                                        <div class="form_box">
                                            <select ref={delYn} class="sel_box" >
                                                <option value="N">공개</option>
                                                <option value="Y">비공개</option>
                                            </select>
                                        </div>
                                    </td>
                                    <th scope="row"><label form=''>투표 진행</label></th>
                                    <td>
                                        <div class="form_box">
                                            <select ref={acceptYn} class="sel_box">
                                                <option value="Y">진행</option>
                                                <option value="N">마감</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label form="">제목</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <input type="text" onChange={(e)=>{setTitleValue(e.target.value)}} placeholder='제목을 입력해주세요' value={titleValue}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label for="inp_03">글설명</label></th>
                                    <td colspan="3">
                                        <div class="form_box">
                                            <textarea ref={textRef} onChange={(e)=>{setContentValue(e.target.value)}} onInput={handleResizeHeight} type="text-area" placeholder="내용을 입력해주세요" value={contentValue}></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="4" scope="row"><label form=''>투표항목</label></th>
                                </tr>
                                <tr>
                                    <th scope="row">표기 순서</th>
                                    <td><input onChange={(e)=>{setItemVo(e.target.value)}} type='text' placeholder='항목명 입력' /></td>
                                    <td colSpan="2">
                                        <div className='item_btn'>
                                            <button onClick={handleAdd}>추가 ( + ) </button>
                                            <button onClick={handleDel}> 제거 ( - ) </button>
                                        </div>
                                    </td>
                                </tr>
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td colSpan="3"><input type='text' placeholder='항목명 입력' /></td>
                                    </tr> */}
                                {
                                  itemArr.map( (a,index)=>
                                    (
                                        <tr key={index}>
                                            <th scope="row">{a.itemNo}</th>
                                            <td colSpan="3">{a.itemName}</td>
                                        </tr> 

                                    )
                                  )  
                                }   

                            </tbody>
                        </table>
                    </div>
                    <div class="ad_btn_div mt20">
                        <div>
                            <button className='sty01_btn' onClick={()=>{navigator('/admin/vote/list')}}>목록가기</button>
                        </div>
                        <div>
                            <button className='sty02_btn' onClick={handleSubmit}>작성하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </StyledVoteWriteDiv>
    );
};

export default VoteWrite;