import { useState } from 'react';
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

    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))    

    const [purpose, setPurpose] = useState(props?.props?.parkingVo.purpose);

    const handleInputChange = (e) => {
      setPurpose(e.target.value);
    };

    const [carNo, setCarNo] = useState(props?.props?.parkingVo?.carNo || '');

    const handleInputChange2 = (e) => {
    setCarNo(e.target.value);
  };
  
   
    const closeModal = () => {setIsModalOpenLogout(false)}
    const [isModalOpenLogout, setIsModalOpenLogout] = useState(false);
    const openModalLogout = () => {
        
        setIsModalOpenLogout(true)};
    
  

        const fecthJava = () =>{
            console.log('하이')
        }
        


    return (
        <StyledVoteWriteDiv>
        <div className='ad_wrap'>
            <div class="ad_detail_box">
                <div className="ad_tit new-div">
                    <h2>{props.props.title}</h2>  
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
                                <th scope="row"><label form=''>예약일</label></th>
                                <td>
                                    <div class="form_box">
                                        {props?.props?.modalType ==='regiseter' ? 
                                        <input type="datetime-local" name="enrollDate"/>
                                        : 
                                        props?.props?.modalType === 'change' ?  
                                        <input type="datetime-local" value ={props?.props?.parkingVo?.enrollDate}   name="enrollDate"/>
                                        : 
                                        <span>{props?.props?.parkingVo?.departureTime?.substring(0, 16)}</span>
                                        }

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label form="">방문목적</label></th>
                                <td colspan="3">
                                    <div class="form_box">
                                        {props?.props?.modalType ==='regiseter' ? 
                                         <input type="text" name='purpose'  placeholder='방문목적 ex) 집들이' />
                                        : 
                                        props?.props?.modalType === 'change' ?  
                                        <input type="text" name='purpose'  placeholder='방문목적 ex) 집들이'  value={purpose} onInput={handleInputChange} />
                                        : 
                                        <input disabled='true' type="text" name='purpose'  placeholder='방문목적 ex) 집들이' value ={props?.props?.parkingVo?.purpose} />
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label for="inp_03">차량번호</label></th>
                                <td colspan="3">
                                    <div class="form_box">
                                        {props?.props?.modalType ==='regiseter' ? 
                                         <input type="text" name='carNo'  placeholder='36더8811' />
                                        : 
                                        props?.props?.modalType === 'change' ?  
                                        <input type="text" name='carNo'  placeholder='36더8811' value={carNo}onInput={handleInputChange2} />
                                        : 
                                        <input disabled='true' type="text" name='carNo'  placeholder='방문목적 ex) 집들이' value ={props?.props?.parkingVo?.carNo} />
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th colspan="4" scope="row"><label form=''>정산</label></th>
                            </tr>
                            <tr>
                                <th scope="row">입차 시간</th>
                               
                                <td colSpan={1}>
                                    
                                    {props?.props?.parkingVo?.departureTime ? <span>
                                        {props?.props?.parkingVo?.departureTime?.substring(0, 16)}
                                    </span> 
                                    : 
                                    <span>
                                        입차 대기
                                    </span>
                                    }
                                    
                                    </td>
                                <th scope="row">출차 시간</th>
                               
                                <td colSpan={1}>
                                    {props?.props?.departureTime ? <span>
                                        {props?.props?.arrivalTime?.substring(0, 16)}
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
                                    {props?.props?.fee ? <span>
                                        {props?.props?.fee}
                                    </span> 
                                    : 
                                    <span>
                                        정산 대기
                                    </span>
                                    }

                                </td>
                            </tr>
                            
                               
                            
                        </tbody>
                    </table>
                    <div class="ad_btn_div mt20 new-div3">
                    {props?.props?.modalType === 'regiseter' ?
                    <>
                    <div>
                        <button className='sty02_btn' >작성하기</button>
                    </div>
                    </>
                    : props?.props?.modalType === 'change' ? 
                    <>  
                         <div>
                        <button className='sty01_btn'  onClick={()=>{
                            
                        }} >예약수정</button>
                        </div>
                        <div>
                        <button className='sty02_btn'   >예약취소</button>
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