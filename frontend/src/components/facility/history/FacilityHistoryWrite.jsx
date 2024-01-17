import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

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
        setShowModal(false);
    }
    const handleAgreeAndCloseModal = ()=>{
        setIsAgreed(true);
        setShowModal(false);
        console.log(isAgreed);
    }
    const openModal = (e)=>{
        e.preventDefault();
        handleShowModal();
    }

    //신청제출
   
    useEffect(()=>{
        sendHistoryVo();
        console.log(historyVo);
    }, [historyVo, isAgreed]);

    const sendHistoryVo = ()=>{
        if(isAgreed){
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

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!isAgreed){
            alert("이용약관에 동의해야 합니다.");
        }else{
            sendHistoryVo();
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='date' name='' onChange={handleSelectedDate}/>
                <div>{facilityVo.facilitiesName}</div>
                <table>
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

                <div>
                    <input type='checkbox' name='' checked={isAgreed}/> 이용 약관 동의
                    <button onClick={openModal}>
                        보기
                    </button>

                </div>
                <input type='submit' name='' value='이용 신청하기'/>
            </form>
            
            <ReactModal
                isOpen={showModal}
                contentLabel='Agree Modal'
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                >
                    <div className='modal-content'>
                        <span className='close' onClick={handleCloseModal}>닫기</span>
                        <span className='close' onClick={handleAgreeAndCloseModal}>동의</span>
                    </div>

                </ReactModal>
           
            
        </div>
    );
};

export default FacilityHistoryWrite;