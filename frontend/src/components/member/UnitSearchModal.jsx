import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Pagination from '../page/Pagination';

const customModalStyles = {
    // 여기가 모달창 밖에 부분 처리
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    // 여기가 모달창 안쪽영역 
    content: {
      width: "600px",
      height: "600px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
     }

     
    
    
  };


  const ModalDiv =  styled.div`
    
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
   
    gap : 10px;

    .input-div {
      display  : flex;
      flex-direction: column;
      gap : 10px

    }

    .ad_tbl_box{
        width: 100%;
        height: 30vh;

      & table th{
        padding: 0px;
        height: 30px;
      }

      
    }

    .div-div{
        display: flex;
        gap : 10px
    }

    .tr-tr:hover{
        cursor: pointer;
    }

    
   `

const UnitSearchModal = ({ isOpen, closeModal , unitNoRef, setInfo}) => {

   const[searchVo,setSearchVo] =useState();

   const [updateEffect, setUpdateEffect] = useState();

   //페이징용 
  const [pvo,setPvo] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  
  //페이징
  const handlePageChange = (page) =>{
    setCurrentPage(page);
    setUpdateEffect(updateEffect+'a')
  };

  //유닛 리스트
  const [unitList,setUnitList] = useState();


  const [num, setNum] =useState()

  const onChangeNum = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value?.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거

    setSearchVo({
        ...searchVo,
        [name]: sanitizedValue
    });

    setNum(e.target)
}

   const onChange= (e)=>  {
        const {name,value} = e.target;

        setSearchVo({
            ...searchVo
            ,[name] : value
        })
   }

    let patcherbleJoin = true;
   
    const onClickSearch = (e)=>{
    setUpdateEffect(updateEffect+'a')
        
    if(!patcherbleJoin){return;}

  patcherbleJoin =false;

  }

  const updateData = (unitVo)=>{
      
    unitNoRef.current.value= `${unitVo.dong} 동 ${unitVo.ho} 호 세대주 : ${unitVo.name}`
    unitNoRef.current.style.display =''
    setInfo ( (prev)=>{
        return {
            ...prev,
            'unitNo': unitVo.unitNo
    
          }  
    })

    closeModal()

}

  

  useEffect(()=>{

    console.log(searchVo)
    console.log(currentPage)
    

    fetch("http://127.0.0.1:8888/app/member/findUnit",{
        method: "post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {

           'memberVo' : {
                ...searchVo
            },
          'pageVo' :{
            'currentPage' : currentPage  
          }
            
        }
        ),
    })
    .then( (resp) => {
        return resp.json()})
        .then( (data)=>{
          
  
        if(data.status==="good"){
            setUnitList(data.voList)
            setPvo(data.pageVo)
        }else{    
          return;
        }
    })
    .catch()
    .finally( () => {patcherbleJoin = true}) 

  },[updateEffect] )





    return (
        <ReactModal
        isOpen={isOpen}
        style={customModalStyles}
        onRequestClose={closeModal}
      >

      <ModalDiv>
            <div>    
                <h1>세대 찾기</h1>
            </div>
            
            <div className='input-div'>
                <div className='div-div'>
                <input type="text"  name='dong' placeholder='Ex)101' onChange={onChangeNum} /> <span>동</span>
                <input type="text" name= 'ho' placeholder='Ex)1704' onChange={onChangeNum} /> <span>호</span>
                </div>
                
                <div>  
                
                </div>
                
                <div className='div-div' >
                <span>세대주 이름 : </span> <span type="text" name='name' placeholder='Ex)김ㅇㅇ' onChange={onChange} /> 
                </div>
            </div>
           


            <div className='ad_tbl_box'>
                <table>
                    <tr >
                        <th>세대주</th>
                        <th>동</th>
                        <th>호수</th>
                    </tr>

                    {    unitList?.length===0 ?  '검색결과없음':   
                    
                        unitList?.map((unitVo,index)=>
                          <tr className='.tr-tr' key={index} onClick={()=>{
                            updateData(unitVo)
                          }} >
                          <td>{unitVo.name}</td>
                          <td>{unitVo.dong}</td>
                          <td>{unitVo.ho}</td>
                      </tr>
                    )}



                   
                </table>

                 
            </div>
            <div>
            <Pagination pvo={pvo} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
                <div>
                <button className='sty02_btn' onClick={onClickSearch}>검색</button>
                </div>

            
               

            
             
        </ModalDiv>
        
      </ReactModal>
    );
};

export default UnitSearchModal;