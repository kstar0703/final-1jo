import React, {useCallback, useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const customModalStyles = {
    // 여기가 모달창 밖에 부분 처리
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    // 여기가 모달창 안쪽영역 
    content: {
      width: "60%",
      height: "80%",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
     
    },
  };

const StyledReplyModalDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    p{
        font-size: 0.7em;
    }

`;

const ReplyModal = ({isOpen, closeModal, title, fecthJava, compVo}) => {
    
    //필요없으면 지우기
    const ajaxJava = async() =>{
        await fecthJava();
        setReply('');
        closeModal();
    }
    const managerNo = JSON.parse(sessionStorage.getItem("loginMember")).managerNo
    const hendleSubmit = () => {
        fetch("http://127.0.0.1:8888/app/complaint/clear",{
          method : "POST"
          ,headers : {
            "Content-Type": "application/json",
          }
          ,body : JSON.stringify(
            {
              managerNo : managerNo,
              reply: reply,
              complaintNo : compVo.complaintNo,
            }
          ),
        })
        .then((resp) =>resp.json())
        .then((data)=>{
          if(data === 1){
            alert("수정이 완료되었습니다.")
            ajaxJava();
          }else{
            alert("에러발생")
          }
        })
      }
    //답변 내용
    const [reply, setReply] = useState();
    
    useEffect(() => {
      setReply(compVo?.reply);
    }, [compVo?.reply]);
  


    //textArear 자동 스크롤
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
      }, []);

    return (
        <ReactModal isOpen={isOpen} style={customModalStyles} onRequestClose={closeModal}>


        <StyledReplyModalDiv>
            <h1 onClick={()=>{
            }}>{title}</h1>
            <div>
                <div className='ad_tbl_box'>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <label form="">민원 글 제목</label>
                                </th>
                                <td colspan="3">{compVo?.title}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label form="">민원 내용</label>
                                </th>
                                <td colspan="3">
                                    {compVo?.content}
                                    <p>첨부된 사진은 상세 페이지에서 확인해주세요</p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                <label for="inp_03">민원 처리 답변</label>
                            </th>
                                <td colspan='3'>
                                <div class="form_box">
                                    <textarea
                                        ref={textRef}
                                        value={reply}
                                        onChange={(e) => {
                                        setReply(e.target.value);
                                        }}
                                        onInput={handleResizeHeight}
                                        type="text-area"
                                        placeholder="값을 입력해주세요"
                                    ></textarea>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='ad_btn_div'>
                    <button className='sty02_btn' onClick={hendleSubmit} >답변 완료</button>
                    <button className='sty01_btn' onClick={closeModal}>목록가기</button>
                </div>
            </div>
        </StyledReplyModalDiv>
        </ReactModal>


    );
};

export default ReplyModal;