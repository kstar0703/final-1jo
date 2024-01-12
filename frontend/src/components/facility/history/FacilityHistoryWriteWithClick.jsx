import React from 'react';
import FacilityAgree from './FacilityAgree';

const FacilityHistoryWriteWithClick = () => {
    return (
<div>
            <form>
                <input type='date' name='' />
                <div>체육관</div>
                <table>
                     <tr>
                        <th>코트 번호</th>
                        <td>코트를 선택해주세요</td>
                    </tr>
                    <tr>
                        <th>예약시간</th>
                        <td>2024년 1월 1일 10:00 ~ 11:00 / 시간을 선택해주세요</td>
                    </tr>
                    <tr>
                        <th>이용 금액</th>
                        <td>4,000 원 / 시간</td>
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
                        <th>예약 제한 횟수</th>
                        <td>세대별 일 1회</td>
                    </tr>
                    <tr>
                        <th>환불정책</th>
                        <td>전체 환불</td>
                    </tr>
                    <tr>
                        <th>이용안내</th>
                        <td>
                            * 입주민, 중학생 이상(보호자 동반시 초등학생 이하 가능)만 이용 가능합니다.<br />
                            * 이용 방법: 커뮤니센터 안내데스크 확인 후, 체육관 입장</td>
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

export default FacilityHistoryWriteWithClick;