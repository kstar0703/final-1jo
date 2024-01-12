import React from 'react';

const ManagementList = () => {
    return (
        <div>
            <div>관리비 조회</div>
            <div>
                <div>2024년 1월분</div>
                <div>납부마감일: </div>
                <div>252,080 원</div>
            </div>
            <div>
                <div>조회</div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>이번달 사용</th>
                            <th>전월달 사용</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>일반관리비</td>
                            <td>~원</td>
                            <td>~원</td>
                        </tr>
                        <tr>
                            <td>세대사용료</td>
                            <td>~원</td>
                            <td>~원</td>
                        </tr>
                        <tr>
                            <td>커뮤니티사용</td>
                            <td>~원</td>
                            <td>~원</td>
                        </tr>
                        <tr>
                            <td>합계</td>
                            <td>~원</td>
                            <td>~원</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    그래프~
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default ManagementList;