import React ,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FacilitiesList = () => {
    
    const StyledFacilitiesListDiv = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction : column;
        
        .ad_wrap_mod{
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        div > div > table > tbody > tr > td {
            text-align: center !important;
        }
        .btn_box{
            margin: 20px 0 100px 0;
            float: right;
        }
        .wid80{
            width: 80%;
        }
    `;
    const navigator = useNavigate();

    const [facilityVoList, setFacilityVoList] = useState([]);
    const loadFacilityVoList = ()=>{
        fetch("http://127.0.0.1:8888/app/facility/admin/list")
        .then(resp=>resp.json())
        .then(data=>{setFacilityVoList(data.facilityVoList);});
    }
    useEffect(()=>{
        loadFacilityVoList();
    }, []);
    const formatContact = (dataString)=>{
        if(dataString != null){
            return dataString.substring(0,2) + "-" + dataString.substring(2,6) + "-" + dataString.substring(6,10);
        }else{
            return '';
        }
    };
    const price = (dataString)=>{
        return parseInt(dataString).toLocaleString();
    }

    const [delYn, setDelYn] = useState();
    const [vo, setVo] = useState({});
    const deleteFacilityVo = (vo)=>{
        fetch("http://127.0.0.1:8888/app/facility/admin/delete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...vo,
                delYn: delYn
            })
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.msg === "good"){
                alert("시설 사용전환 완료");
            }else{
                alert("시설 사용전환 실패");
            }
            loadFacilityVoList();
        })
    }
    const handleDelete = (vo)=>{
        const answerDel = window.confirm("사용전환 하시겠습니까?");
        if(answerDel){
            const updatedDelYn = (vo.delYn === "N")? "Y": "N";
            setDelYn(updatedDelYn);
            setVo(vo);
        }
    }
    useEffect(() => {
        if (delYn !== undefined && vo !== undefined) {
            deleteFacilityVo(vo);
        }
    }, [delYn, vo]);
    return (
        <StyledFacilitiesListDiv>
            <div className="ad_wrap_mod">
                <div className="ad_search_box_bg">
                    <div className="ad_tit">
                        <h2>시설목록</h2>
                    </div>

                    <div className="ad_search_box">
                        <div className="search_item">
                            <label form="sel01" >시설이름</label>
                                <div className="form_box">
                                    <input type="text" name="title" />
                                </div>
                        </div>
                    
                        <div className="search_item">
                            <label form="sel01">사용여부</label>
                            <div className="form_box">
                                <select name='delYn' className="sel_box">
                                    <option value='all'></option>
                                    <option value='Y'>미사용</option>
                                    <option value="N">사용</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="btn_div">
                        <div>
                            <button className="sty01_btn" >초기화</button>
                        </div>
                        <div>
                            <button className="sty02_btn" >검색</button>
                        </div>
                        <div>
                            <button className='sty02_btn' onClick={()=>{navigator("/admin/facility/insert")}}>시설등록</button>
                        </div>
                    </div>
                </div>
                    
                <div class="ad_tbl_box data mt40 mb50">
                    <table>

                        <caption>커뮤니티 시설목록</caption>

                        <colgroup>
                            <col width="70px" />
                            <col width="120px" />
                            <col width="150px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="150px" />
                            <col width="150px" />
                            <col width="180px" />
                            <col width="180px" />
                            <col width="110px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="120px" />
                        
                        </colgroup>
                        <thead>
                            <tr>
                            <th scope="col">번호</th>
                            <th scope="col">사용여부</th>
                            <th scope="col">시설 이름</th>
                            <th scope="col">이미지</th>
                            <th scope="col">단가</th>
                            <th scope='col'>문의</th>
                            <th scope='col'>운영시간</th>
                            <th scope='col'>휴일</th>
                            <th scope='col'>위치</th>
                            <th scope='col'>편의시설</th>
                            <th scope='col'>등록일</th>
                            <th scope='col'>수정일</th>
                            <th scope='col'>상세</th>
                            <th scope='col'>사용전환</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                facilityVoList.length === 0
                                ?
                                <h1>loading..</h1>
                                :
                                facilityVoList.map(vo => <tr key={vo.facilitiesNo}>
                                        <td>{vo.facilitiesNo}</td>
                                        <td>{vo.delYn === "N"?"O":"X"}</td>
                                        <td>{vo.facilitiesName}</td>
                                        <td><img src={vo.image} style={{width: '150px'}}/></td>
                                        <td>{price(vo.unitPrice)}원</td>
                                        <td>{formatContact(vo.contact)}</td>
                                        <td>{vo.operationTime}</td>
                                        <td>{vo.dayOff}</td>
                                        <td>{vo.location}</td>
                                        <td>{vo.amenity}</td>
                                        <td>{vo.enrollDate}</td>
                                        <td>{vo.modifyDate == null? "-":vo.modifyDate}</td>
                                        <td><button onClick={()=>{navigator(`/admin/facility/edit/${vo.facilitiesNo}`);}}>상세</button></td>
                                        <td><button onClick={()=>{handleDelete(vo)}}>사용전환</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div> 
        </StyledFacilitiesListDiv>
    );
};

export default FacilitiesList;