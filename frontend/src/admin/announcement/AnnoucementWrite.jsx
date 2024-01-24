import React , {useState,useCallback,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ImgBox from '../../components/imgUtil/ImgBox';
import ImgPlusBox from '../../components/imgUtil/ImgPlusBox';
import ImgThumbNail from '../../components/imgUtil/ImgThumbNail';
import ImgNameBox from '../../components/imgUtil/ImgNameBox';


const StyledAdminWriteDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;

    form{
        width: 100%;
    }

    .ad_tbl_box{
        width: 100%;
        display: flex;
        & table{
            width: 80%;
        }
    }
    .button_btn_box {
        width: 100%;
        & div{
            width: 90%;
            display: flex;
            justify-content: end;
        }
        & button{
            margin-left: 10px;
        }
    }

    .contTh{
        height: 50%;
    }

    
    

    
`;

const AnnoucementWrite = () => {

    const navigate =useNavigate()

    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

    const navigator = useNavigate();

    //textArea자동 스크롤
    const [contentValue,setContentValue] = useState();
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);

    const[dataVo,setDataVo] = useState();
    
    const [fileArr,setFileArr] = useState([]);

    const onChange = (e) =>{
        const {value,name} = e.target   
        setDataVo({
            ...dataVo
            ,[name] : value
    })

    }
    //파일 업로드 미리보기
    const [fileSrc, setFileSrc] = useState([]);

    const onChangefiles = (e) => {

        const filesArray = Array.from(e.target.files)

        console.log(filesArray.length)

        if(fileArr.length + filesArray.length >10){
            alert("파일업로드는 10까지 가능합니다")
            return
        }

        setFileArr([...fileArr,...filesArray]);

        console.log(fileArr)
    
        const files = Array.from(e.target.files);
    
        files.forEach((file, index, array) => {
            if (file) {
                const reader = new FileReader();
    
                reader.onload = function (e) {
                    setFileSrc(prevFileSrc => [...prevFileSrc, e.target.result]);
                };
    
                reader.readAsDataURL(file);
            }
        });   
    }

    //deleteImg
    const deleteImg = (index) => {
        // fileSrc 배열에서 해당 인덱스의 이미지를 제외한 새로운 배열 생성
        const updatedFileSrc = fileSrc.filter((_, i) => i !== index);
    
        // 업로드할 파일 업데이트
        setFileSrc(updatedFileSrc);

        const updatedFileArr = fileArr.filter((_, i) => i !== index);
        
        // 업로드할 파일 업데이트
        setFileArr(updatedFileArr);

    }
    
    

    let patcherble = true;
    const handleSubmit = (e) =>{
        
        

        e.preventDefault();

        
        if(!patcherble){
            return
        }

        patcherble= false;

        const fd = new FormData();
        fd.append("announcementNo", dataVo.announcementNo);
        fd.append("title" , dataVo.title);
        fd.append("content",dataVo.content)
       fd.append("managerNo" , loginMember.managerNo);
       for (let i = 0; i < fileArr.length; i++) {
        fd.append("fileArr", fileArr[i]);
     }





        fetch("http://127.0.0.1:8888/app/announcement/write" , {
            method: "POST",
            body : fd ,
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.status === "good"){
                alert("공지사항 작성성공 !");
                
                navigate(`/admin/announcement/detail/${data.announcementNo}`)


            }else{
                
            }
        } )
        .catch( (e)=>{
            
        })
        .finally( ()=>{patcherble =true; })
        ;
    };

   

   






    

    

    



    return (
        <StyledAdminWriteDiv>
            <form>
            <div className='ad_wrap'>
            <div className='ad_tit'>
                    <div><h1>공지 사항 작성</h1></div>
                </div>
                <div className='ad_tbl_box mt40'>
                    <table>
                        <caption>공지사항 작성</caption>
                        <colgroup>
                            <col width="15%"/>
                            <col width="35%"/>
                            <col width="15%"/>
                            <col width="35%"/>
                        </colgroup>    
                        <tbody>
                            <tr>
                                <th scop="row">제목</th>
                                <td colSpan='3'>
                                <div class="form_box">
                                    <input type="text" placeholder='제목을 입력해주세요' name='title' onChange={onChange}/>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <th className='contTh' scope='row'>내용</th>
                                <td colSpan='3'>
                                    <div class="form_box" >
                                        <textarea ref={textRef} name='content' onChange={
                                                    onChange   
                                        } onInput={handleResizeHeight} type="text-area" placeholder="값을 입력해주세요" ></textarea>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>이미지 첨부된 이미지</th>
                                <td colSpan='3'>
                                    
                                     <ImgNameBox deleteImg={deleteImg} fileArr={fileArr}/>
                                </td>
                                
                            </tr>
                            <tr>
                                <th scope='row'>이미지 썸내일</th>
                                <td colSpan='3'>
                                    <ImgThumbNail fileSrc ={fileSrc} onChangefiles={onChangefiles} deleteImg={deleteImg} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='button_btn_box'>
                    <div>
                        <button onClick={handleSubmit} className='sty02_btn'>작성하기</button>
                        <button onClick={()=>{navigator('/admin/announcement/list')}} className='sty01_btn'>목록가기</button>
                    </div>
                </div>
            </div>
            </form>
        </StyledAdminWriteDiv>
    );
};

export default AnnoucementWrite;