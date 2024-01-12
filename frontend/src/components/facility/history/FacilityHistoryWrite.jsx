import React from 'react';
import FacilityAgree from './FacilityAgree';

const FacilityHistoryWrite = () => {
    return (
        <div>
            <form>
                <input type='date' name='' />
                <div>사우나</div>
                <table>
                    <tr>
                        <th>예약시간</th>
                        <td>2024년 1월 1일 10:00 ~ 11:00</td>
                    </tr>
                    <tr>
                        <th>이용 금액</th>
                        <td>4,000 원 / 일</td>
                    </tr>
                    <tr>
                        <th>결제 예정 금액</th>
                        <td>4,000 원</td>
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
                    <input type='checkbox' name=''/> 이용 약관 동의
                </div>
                <div>
                    보기 <FacilityAgree />
                </div>
                <input type='submit' name='' value='이용 신청하기'/>
            </form>
        </div>
    );
};

export default FacilityHistoryWrite;