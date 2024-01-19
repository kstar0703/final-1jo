import React,{useRef,useState,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledComplaintWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    .wrap{
        flex-direction: column;
    }
    .topTitleBox{
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #000;
    }
    .ad_tbl_box{
        width: 100%;
        display: flex;
        & table{
            width: 80%;
        }
    }
    .button_btn_box {
        width: 100%;
        & div{
            width: 90%;
            display: flex;
            justify-content: end;
        }
        & button{
            margin-left: 10px;
        }
    }
`;

const ComplaintWrite = () => {
    const navigator = useNavigate();

    const imgRef = useRef();
    const [contentValue,setContentValue] = useState();
    const [titleValue,setTitleValue] = useState();
    const [fileObj,setFileObk] = useState();

    //textArea자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);

    const handleChangeFiles = (e) => {
        setFileObk(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    return (
        <StyledComplaintWriteDiv>
            <div className='wrap'>
                <div className='topTitleBox'>
                    <div><h1>민원 처리 접수하기</h1></div>
                </div>

                <div className='ad_tbl_box mt40'>
                    <table>
                        <caption>설문투표 상세 테이블</caption>
                        <colgroup>
                            <col width="15%"/>
                            <col width="35%"/>
                            <col width="15%"/>
                            <col width="35%"/>
                        </colgroup>    
                        <tbody>
                            <tr>
                                <th scop="row">제목</th>
                                <td colSpan='3'>
                                <div class="form_box">
                                    <input type="text" onChange={(e)=>{setTitleValue(e.target.value)}} value={titleValue} placeholder='제목을 입력해주세요'/>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>내용</th>
                                <td colSpan='3'>
                                    <div class="form_box">
                                        <textarea ref={textRef} onChange={(e)=>{setContentValue(e.target.value)}} onInput={handleResizeHeight} type="text-area" placeholder="값을 입력해주세요" value={contentValue}></textarea>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>이미지 첨부</th>
                                <td colSpan='3'>
                                    <input onChange={handleChangeFiles} type='file' name='f' multiple/> 이미지를 여러개 클릭 후 선택해주세요
                                </td>
                                {
                                    <img src='' alt='' />
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='button_btn_box'>
                    <div>
                        <button onClick={()=>{alert("접수중")}} className='sty02_btn'>접수하기</button>
                        <button onClick={()=>{navigator('/complaint/list')}} className='sty01_btn'>목록가기</button>
                    </div>
                </div>
            </div>

        </StyledComplaintWriteDiv>
    );
};

export default ComplaintWrite;