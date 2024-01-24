import { useState,useRef } from 'react';
import styled from 'styled-components';
import Modal from '../modal/Modal';



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

.new-div{
    width: 100% ;
}

.new-div{
    display: flex;
    flex-direction: column;
}

.new-div3{
    justify-content: center;
    width: 100%;
}

`

const ParkingRegister = (props) => {
    //금일 날자 가져오기
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const dayOfWeek = currentDate.getDay();

    // 요일을 텍스트로 변환
    const daysOfWeekText = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeekText = daysOfWeekText[dayOfWeek];

    // 시간을 24시간 형식으로 변환
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const currentTime = month + '월' + day + '일' + hours + ':' + minutes + '(' + dayOfWeekText +') 이후 날짜를 선택하세요' 
    
    const parkingVo = props?.props?.parkingVo;
    const modalType = props?.props?.modalType;
    const title = props?.props?.title;
    const closeModal = props?.props?.closeModal;

    
    const updateEffectModal = props?.props?.updateEffectModal;

   
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))    
    
    //데이터 가지고오기 
    const [purpose, setPurpose] = useState(parkingVo?.purpose);
    const handleInputChange = (e) => {setPurpose(e.target.value);};

    const [carNo, setCarNo] = useState(parkingVo?.carNo || '');
    const handleInputChange2 = (e) => {setCarNo(e.target.value);};

    const [enrollDate, setEnrollDate] = useState(parkingVo?.enrollDate || '');
    const handleDateChange3 = (e) =>{
        let limitDate = new Date(enRollRef2.current.value);
        if (currentDate >= limitDate) {
            alert( currentTime)
            return
        }
        
        setEnrollDate(e.target.value);}

    //modifyDate
    const [modifyDate, setModifyDate] = useState(parkingVo?.modifyDate || '');
    const handleDateChange4 = (e) =>{
        let limitDate = new Date(enRollRef.current.value);
        if (currentDate >= limitDate) {
            alert( currentTime)
            return
        }
        
        setModifyDate(e.target?.value);}
 
    // ref로 데이터 보낼떄 체크해볼까?
    // register
    let rgsEnrollRef = useRef()
    let rgsPurposeRef = useRef()
    let rgsCarNo = useRef()

    let enRollRef = useRef()
    let enRollRef2 = useRef()
    let purposeRef = useRef()
    let carNoRef = useRef()


    const[dataVo,setDataVo] =useState({
        'memberNo' : JSON?.parse(sessionStorage.getItem("loginMember"))?.memberNo
        ,...parkingVo
        
    })

  


    const onChange = (e)  =>{

        let limitDate = new Date(rgsEnrollRef.current.value);
        if (currentDate >= limitDate) {
            console.log(formattedHours)
            console.log(formattedMinutes)
            alert( currentTime)
            rgsEnrollRef.current.value = ''
            return
        }

        const{value,name} = e.target

        setDataVo({
            ...dataVo,
            [name] : value
        })

    } 

    const onChangeDelete = (e) =>{
        const{value,name} = e.target
        console.log('delete 호출')
        if(enRollRef.current){
            let limitDate = new Date(enRollRef.current?.value);
            console.log(enRollRef.current?.value)
            if (currentDate >= limitDate) {
                return
            }
        }else{
            let limitDate = new Date(enRollRef2.current?.value);
            if (currentDate >= limitDate) {
                return
            }
        }

        setDataVo({
            ...dataVo,
            [name] : value
        })

    } 
    
     
    let fetcherble = true
    const parkingRegister = () =>{

        console.log(dataVo)
        var limitDate = new Date(rgsEnrollRef.current.value);

        if (currentDate >= limitDate) {
            alert( month + '월 ' + day + '일 이후 날자를 선택하세요')
            rgsEnrollRef.current.value = ''
            return
        }

        if(rgsEnrollRef?.current.value.length<=0){
            alert('등록일은 필수값 입니다')
            rgsEnrollRef?.current.focus()
            return 
        }
        if(rgsPurposeRef?.current.value.length<=0){
            alert('방문목적을 입력하세요')
            rgsPurposeRef?.current.focus()
            return
        }
        if(rgsCarNo?.current.value.length<=0){
            alert('차량번호를 입력하세요')
            rgsCarNo?.current.focus()
            return
        }

        if(!fetcherble){return}

        fetcherble = false
        
        fetch('http://127.0.0.1:8888/app/parking/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataVo),
          })
        .then((resp) => {return resp.json()})
        .then((data)=>{ 
            
            if(data.status === 'good'){
                alert(data.msg)
                closeModal()
                updateEffectModal()
            }else{
                alert('실패')
            }
        })
        .catch( (e)=>{})
        .finally(()=>{
            fetcherble =true;
           })}   

    // 예약수정
    const parkingChange = () =>{
       
        if(enRollRef.current){
            if(enRollRef.current?.value.length<=0){
                alert('등록일은 필수값 입니다')
                enRollRef?.current.focus()
                return 
            }

        }else{
            if(enRollRef2.current?.value.length<=0){
                alert('등록일은 필수값 입니다')
                enRollRef2.current?.focus()
                return 
            }
        }

        if(purposeRef.current?.value.length<=0){
            alert('방문목적을 입력하세요')
            purposeRef?.current.focus()
            return
        }
        if(carNoRef?.current.value?.length<=0){
            alert('차량번호를 입력하세요')
            carNoRef?.current.focus()
            return
        }

        if(!fetcherble){return}

        fetcherble = false
        
        fetch('http://127.0.0.1:8888/app/parking/change', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataVo),
          })
        .then((resp) => {return resp.json()})
        .then((data)=>{ 
            
            if(data.status === 'good'){
                alert(data.msg)
                closeModal()
                updateEffectModal()
            }else{
                alert('실패')
            }
        })
        .catch( (e)=>{})
        .finally(()=>{
            fetcherble =true;
            })

    }

    // 예약 삭제
    const parkingDelete = () =>{

        if(!fetcherble){return}

        fetcherble = false
        
        fetch('http://127.0.0.1:8888/app/parking/cancel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataVo),
          })
        .then((resp) => {return resp.json()})
        .then((data)=>{ 
            
            if(data.status === 'good'){
                alert(data.msg)
                closeModal()
            }else{
                alert('실패')
            }
        })
        .catch( (e)=>{})
        .finally(()=>{
            fetcherble =true;
            updateEffectModal()})

    }


    
  
   
   
        


    return (
        <StyledVoteWriteDiv>
        <div className='ad_wrap'>
            <div class="ad_detail_box">
                <div className="ad_tit new-div">
                    <h2>{title}</h2>  
                </div>

                <div className='ad_tbl_box new-div new-div2'>  
                    <table>
                    <caption>차량 방문예약 등록</caption>
                            <colgroup>
                                <col width="15%"/>
                                <col width="35%"/>
                                <col width="15%"/>
                                <col width="35%"/>
                            </colgroup>                        
                        <tbody>
                            <tr>
                            <th scope="row"><label form="">예약자</label></th>
                                <td style={{color : 'grey'}}>{loginMember?.name}</td>
                                <th scope="row"><label form=''>전화번호</label></th>
                                <td style={{color : 'grey'}}>{loginMember?.phone}</td>
                            </tr>
                            <tr>
                                <th scope="row"><label form=''>동호수</label></th>
                                <td style={{color : 'grey'}}>{`${loginMember?.dong}동${loginMember?.ho}호`}</td>
                                <th scope="row"><label form=''>방문예정일</label></th>
                                <td>
                                    <div class="form_box">
                                        {
                                        
                                        modalType ==='regiseter' ? 
                                        <input type="datetime-local" name="enrollDate" onChange={onChange} ref={rgsEnrollRef} />
                                        : 
                                        modalType === 'change' ? parkingVo?.modifyDate ? 
                                        <input type="datetime-local" value ={modifyDate} onInput={handleDateChange4} onChange={onChangeDelete}  name="enrollDate" ref={enRollRef}/>
                                          :
                                        <input type="datetime-local" value ={enrollDate} onInput={handleDateChange3} onChange={onChangeDelete} name="enrollDate" ref={enRollRef2}/>
                                          : 
                                          parkingVo?.modifyDate ? 
                                          <span>{parkingVo?.modifyDate?.substring(0, 16)}(수정)</span>    
                                                    :
                                          <span>{parkingVo?.enrollDate?.substring(0, 16)}</span>
                                        }

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label form="">방문목적</label></th>
                                <td colspan="3">
                                    <div class="form_box">
                                        {modalType ==='regiseter' ? 
                                         <input type="text" name='purpose' onChange={onChange}  placeholder='방문목적 ex) 집들이' ref={rgsPurposeRef} />
                                        : 
                                       modalType === 'change' ?  
                                        <input type="text" name='purpose'  placeholder='방문목적 ex) 집들이' onChange={onChangeDelete} value={purpose} onInput={handleInputChange} ref={purposeRef} />
                                        : 
                                        <input disabled='true' type="text" name='purpose'  placeholder='방문목적 ex) 집들이' value ={parkingVo?.purpose} />
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label for="inp_03">차량번호</label></th>
                                <td colspan="3">
                                    <div class="form_box">
                                        {modalType ==='regiseter' ? 
                                         <input type="text" name='carNo'  placeholder='36더8811' onChange={onChange} ref={rgsCarNo} />
                                        : 
                                        modalType === 'change' ?  
                                        <input type="text" name='carNo'  placeholder='36더8811' onChange={onChangeDelete} value={carNo}onInput={handleInputChange2} ref={carNoRef}/>
                                        : 
                                        <input disabled='true' type="text" name='carNo' placeholder='방문목적 ex) 집들이' value ={parkingVo?.carNo} />
                                        }
                                    </div>
                                </td>
                            </tr>
                           {modalType === 'regiseter' ?  <tr>
                                <th colspan="4" scope="row"><label form=''></label></th>
                            </tr>: 
                            <>
                            <tr>
                                <th colspan="1" scope="row">등록일<label form=''></label></th>
                                <td colSpan={3}>{parkingVo?.writeDate?.substring(0,16)}</td>
                            </tr>
                            
                            <tr>
                                <th scope="row">입차 시간</th>
                               
                                <td colSpan={1}>
                                    
                                    {parkingVo?.departureTime ? <span>
                                        {parkingVo?.departureTime?.substring(0, 16)}
                                    </span> 
                                    : 
                                    <span>
                                        입차 대기
                                    </span>
                                    }
                                    
                                    </td>
                                <th scope="row">출차 시간</th>
                               
                                <td colSpan={1}>
                                    {parkingVo?.departureTime ? <span>
                                        {parkingVo?.arrivalTime?.substring(0, 16)}
                                    </span> 
                                    : 
                                    <span>
                                        출차 대기
                                    </span>
                                    }
                                </td>

                            </tr>

                            <tr >
                                <th scope="row">차감 시간</th>
                                    
                                    
                                <td colSpan={5}> 
                                    {parkingVo?.fee ? 
                                    <span>
                                        {parkingVo?.fee}분
                                    </span> 
                                    : 
                                    <span>
                                        정산 대기
                                    </span>
                                    }
                                </td>
                            </tr>
                            </>}
                               
                            
                        </tbody>
                    </table>
                    <div class="ad_btn_div mt20 new-div3">
                    {modalType === 'regiseter' ?
                    <>
                    <div>
                        <button className='sty02_btn'onClick={
                            () =>{
                                parkingRegister()
                            }
                        }>등록하기</button>
                    </div>
                    </>
                    : modalType === 'change' ? 
                    <>  
                         <div>
                        <button className='sty01_btn' onClick={parkingDelete}  >예약취소</button>
                        </div>
                        <div>
                        <button className='sty02_btn' onClick={()=>{ 
                            parkingChange()
                        }}  >예약수정</button>
                        </div> 
                    </>
                    : '' }       
                </div>
                </div>
               

            </div>
        </div>
    </StyledVoteWriteDiv>
    );
};

export default ParkingRegister;