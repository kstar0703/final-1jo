import React from 'react';
import { useParams } from 'react-router-dom';
import FacilityNoticeList from './notice/FacilityNoticeList';
import FacilityHistoryWrite from './history/FacilityHistoryWrite';
import FacilityHistoryWriteWithClick from './history/FacilityHistoryWriteWithClick';

const FacilityDetail = () => {
    let facilitiesNo = useParams();

    return (
        <div>
            <div>
                커뮤니티 목록 상세<br/>
                --------------------------------------
                <div>사우나</div>
                <div>사우나사진</div>
                    --------------------------------------
                <div>
                    <div>[ 시설정보 ]</div>
                    <div>운영안내</div>
                    <table>
                        <tr>
                            <th>시설 위치</th>
                            <td>커뮤니티 센터</td>
                        </tr>
                        <tr>
                            <th>운영 시간</th>
                            <td>월~금</td>
                        </tr>
                        <tr>
                            <th>휴일</th>
                            <td>월 휴관</td>
                        </tr>
                        <tr>
                            <th>문의</th>
                            <td>02-222-2222</td>
                        </tr>
                        <tr>
                            <th>편의시설</th>
                            <td>정수기</td>
                        </tr>
                        <tr>
                            <th>안내사항</th>
                            <td>목적외 사용불가</td>
                        </tr>
                    </table>
                    --------------------------------------
                </div>
                <div>
                    <div>[ 공지사항 ]</div>
                    <FacilityNoticeList />
                    --------------------------------------
                </div>
                <div>
                    <div>[ 예약신청 ]</div>
                    <FacilityHistoryWrite />
                    선택2
                    <FacilityHistoryWriteWithClick />
                    --------------------------------------
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default FacilityDetail;