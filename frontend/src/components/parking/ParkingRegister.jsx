import React from 'react';
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

const ParkingRegister = () => {
    return (
        <StyledVoteWriteDiv>
        <div className='ad_wrap'>
            <div class="ad_detail_box">
                <div className="ad_tit new-div">
                    <h2>차량 방문예약 등록</h2>  
                </div>

                <div className='ad_tbl_box new-div new-div2'>  
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
                            <th scope="row"><label form="">예약자</label></th>
                                <td>{'9'}</td>
                                <th scope="row"><label form=''>전화번호</label></th>
                                <td><input  type='date'/></td>
                            </tr>
                            <tr>
                                <th scope="row"><label form=''>동호수</label></th>
                                <td>{'9'}</td>
                                <th scope="row"><label form=''>예약일 선택</label></th>
                                <td>
                                    <div class="form_box">
                                        <select  class="sel_box">
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
                                        <input type="text"  placeholder='제목을 입력해주세요' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label for="inp_03">글설명</label></th>
                                <td colspan="3">
                                    <div class="form_box">
                                        <textarea   type="text-area" placeholder="내용을 입력해주세요" ></textarea>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th colspan="4" scope="row"><label form=''>투표항목</label></th>
                            </tr>
                            <tr>
                                <th scope="row">표기 순서</th>
                                <td><input  type='text' placeholder='항목명 입력' /></td>
                                <td colSpan="2">
                                    <div className='item_btn'>
                                        <button >추가 ( + ) </button>
                                        <button > 제거 ( - ) </button>
                                    </div>
                                </td>
                            </tr>
                               
                            
                        </tbody>
                    </table>
                    <div class="ad_btn_div mt20 new-div3">
                    <div>
                        <button className='sty01_btn '>목록가기</button>
                    </div>
                    <div>
                        <button className='sty02_btn'>작성하기</button>
                    </div>
                </div>
                </div>
              

            </div>
        </div>
    </StyledVoteWriteDiv>
    );
};

export default ParkingRegister;