import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const StyledFacilityHistoryWriteDiv = styled.div`
    .reservation_info_box{
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
    .reservation_summary_box{
        display: flex;
        flex-direction: column;
        margin: 20px;
        & div{
            font-size: 18px;
        }
        & input {
            margin-top: 15px;
            width: 60%;
            border: 0.3px solid #ccc;
            padding: 5px 10px;
        }
    }
    .reservation_agree_box{
        padding: 13px 0 13px 0;
        text-align: center;
        align-items: center;
        justify-items: center;
        & button {
            margin-left: 30px;
            width: 40px;
            height: 20px !important;
            font-size: 11px;
            border-radius: 5px;
        }
    }
    .reservation_detail_box{
        text-align: left;
        & table > tr > td > input {
            margin-block: 0;
            padding-inline: 0;
            padding-block: 0;
            font-size: 16px;
        }
    }
    .application_box{
        text-align: center;
    }
    .outline_box{
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .agree_btn_box{
        justify-content: space-between;
    }
`;

const FacilityHistoryWrite = ({facilityVo}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservationDate, setReservationDate] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [historyVo, setHistoryVo] = useState({
        facilitiesNo: facilityVo.facilitiesNo,
        // memberNo:JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo
        price: facilityVo.unitPrice,
        memberNo: 1
    });
    
    //데이터 포맷팅, vo준비 
    const handleSelectedDate = (event)=>{
        const date = event.target.value;
        const selectedDate = new Date(date);
        setSelectedDate(selectedDate);
        const formatDate = selectedDate.toLocaleDateString('ko-KR', {
            year:'numeric',
            month: 'long',
            day: 'numeric'
        });
        setReservationDate(formatDate);
        setHistoryVo({
            ...historyVo,
            useDate: date 
        });
    }
    const price = (dataString)=>{
        return parseInt(dataString).toLocaleString();
    }
    useEffect(()=>{
        setHistoryVo({
            ...historyVo,
            price: facilityVo.unitPrice
        });
    }, [facilityVo.unitPrice]);

    //동의 & 모달
    const handleShowModal = ()=>{
        setShowModal(true);
    }
    const handleCloseModal = ()=>{
        setIsAgreed(false);
        setShowModal(false);
    }
    const handleAgreeAndCloseModal = ()=>{
        setIsAgreed(true);
        setShowModal(false);
    }
    const openModal = (e)=>{
        e.preventDefault();
        handleShowModal();
    }

    //신청제출
   

    const sendHistoryVo = ()=>{
        if(!isAgreed){
            alert("이용약관에 동의해야 합니다.");
        } else {
        console.log("예약일:" + historyVo.useDate);
        console.log("신청금액:" + historyVo.price);
        fetch("http://127.0.0.1:8888/app/facility/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(historyVo)
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert("이용신청완료");
            }else{
                alert("신청실패");
            }
        })}
    }

    return (
        <StyledFacilityHistoryWriteDiv>
            <div>
            <form>
                <div className='reservation_info_box'>
                    <div className='reservation_summary_box'>
                        <div>{facilityVo.facilitiesName}</div>
                        <input type='date' name='' onChange={handleSelectedDate}/>
                    </div>

                    <div className='reservation_detail_box'>
                        <table>
                            <colgroup>
                                <col width="150" />
                                <col width="300" />
                            </colgroup>
                            <tr>
                                <th>예약일</th>
                                <td>
                                    <input
                                        type='text'
                                        name='useDate'
                                        value={reservationDate || '예약일을 선택하세요.'}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>이용 금액</th>
                                <td>{price(facilityVo.unitPrice)} 원 / 일</td>
                            </tr>
                            <tr>
                                <th>결제 예정 금액</th>
                                <td>
                                    <input
                                        type='text'
                                        name='price'
                                        value={price(facilityVo.unitPrice) + "원"}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>결제방식</th>
                                <td>관리비 후불 청구</td>
                            </tr>
                            <tr>
                                <th>환불정책</th>
                                <td>전체 환불</td>
                            </tr>
                            <tr>
                                <th>이용안내</th>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className='reservation_agree_box'>
                    <input type='checkbox' name='' checked={isAgreed}/> 이용 약관 동의
                    <button className='sty02_btn' onClick={openModal}>
                        보기
                    </button>

                </div>
                <div className='application_box'>
                    <button className='sty02_btn' onClick={()=>{sendHistoryVo();}}>이용신청하기 </button>
                </div>
            </form>
            
            <ReactModal
                isOpen={showModal}
                contentLabel='Agree Modal'
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                style={{
                    content: {
                        width: '780px',
                        height: '520px',
                        borderRadius: '20px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }
                }}
                >
                    <div className='modal_content' style={{ margin: '30px 30px 0 30px' }}>
                        <div >
                            <div style={{ margin: '5px 20px 35px 20px', fontSize: '20px' }}>
                                [ 커뮤니티 서비스 이용약관 ]
                            </div>
                            <div style={{ 
                                borderTop: '1px solid black',
                                borderBottom: '1px solid black',
                                padding: '25px 20px',
                                marginBottom: '40px',
                                lineHeight: '1.6',
                                
                                '& > br': {
                                    margin: '10px'
                                }
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ margin: '2px 10px 0 0', fontSize: '14px' }}>●</div>
                                        <div> 입주민, 중학생 이상 (보호자 동반 시 초등학생 이하 가능)만 이용 가능합니다.<br/></div>
                                    </div>
                                    <div style={{height: '18px'}}></div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ margin: '2px 10px 0 0', fontSize: '14px' }}>●</div>
                                        <div> 이용자 중 외부 주민 무단 이용 및 1일 1회 이용 제한 수칙 위반 시 즉시 퇴장 조치 되며, 추후 이용이 제한 될 수 있습니다. (책임 소지 대표 예약자)<br/></div>
                                    </div>
                                    <div style={{height: '10px'}}></div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ margin: '2px 10px 0 0', fontSize: '14px' }}>●</div>
                                        <div> 시설 이용 중 시설물의 손상과 화재, 도난 등 모든 사고에 의한 피해와 이용자 과실로 인한 비용 발생 시 이용자 본인이 부담합니다.<br/></div>
                                    </div>
                                    <div style={{height: '10px'}}></div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <div style={{ margin: '2px 10px 0 0', fontSize: '14px' }}>●</div>
                                        <div> 이용 전 시설물 이상(파손 등) 이 있을 경우 즉시 커뮤니티 안내데스크로 연락 주시기 바랍니다. 이용 후 발생된 파손은 이용자 과실로 간주 될 수 있습니다.<br/></div>
                                    </div>
                               
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <button className='close sty01_btn' onClick={handleCloseModal}>닫기</button>
                            <button className='close sty02_btn' onClick={handleAgreeAndCloseModal}>동의</button>
                        </div>
                    </div>

                </ReactModal>
           
            </div>
        </StyledFacilityHistoryWriteDiv>
    );
};

export default FacilityHistoryWrite;