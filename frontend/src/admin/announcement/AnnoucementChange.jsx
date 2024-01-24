import React , {useState,useCallback,useRef,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImgBox from '../../components/imgUtil/ImgBox';
import ImgPlusBox from '../../components/imgUtil/ImgPlusBox';
import ImgThumbNail from '../../components/imgUtil/ImgThumbNail';
import ImgNameBox from '../../components/imgUtil/ImgNameBox';

const StyledAdminChangeDiv = styled.div`


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

`



const AnnoucementChange = () => {


    const navigate =useNavigate()
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

 
    //textArea자동 스크롤
    const [contentValue,setContentValue] = useState();
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    },[]);

    // 데이터 뭉치기
    const [fileArr,setFileArr] = useState([]);

    const [announcementVo, setAnnouncemtVo] = useState()
    const onChange = (e) =>{
        const {value,name} = e.target

        
        setAnnouncemtVo({
            ...announcementVo
            ,[name] : value
    })

    }
    //파일 업로드 미리보기
    const [fileSrc, setFileSrc] = useState([]);

    const onChangefiles = (e) => {
        


        const filesArray = Array.from(e.target.files)

       

        if(fileArr.length + announcementVo?.fileList.length + filesArray.length >10){
            alert("파일업로드는 10까지 가능합니다")
            return
        }

        setFileArr([...fileArr,...filesArray]);

      
    
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

    let {announcementNo} = useParams();
    // 전달할 정보
      

    useEffect(
        ()=>{
            const url = `http://127.0.0.1:8888/app/announcement/detail/${announcementNo}`;
          
             fetch(url)
             .then( resp => resp.json())
             .then( data => {    
                setAnnouncemtVo(data.resultVo); 
             })
        }
    ,[]);

    

    //어느 파일 삭제 할지?
    const  deleteOriginImg = async(index)=>{
         
        
        const deleteFile = announcementVo?.fileList[index];
        const updatedFileSrc = announcementVo?.fileList.filter((_, i) => i !== index);

        console.log(deleteFile?.imgNo)
        console.log(deleteFile?.imgName)

        setAnnouncemtVo({
            ...announcementVo,
            fileList : updatedFileSrc,

            deleteNoArr : [
              ...announcementVo?.deleteNoArr,
              {
                imgNo: deleteFile?.imgNo,
                imgName: deleteFile?.imgName,
              },
            ]
        })

        // 화면에 보여줄 배열변경
     
    }

    //공지사항수정
    let patcherble = true;
    const handleChange = () =>{
      
      
        console.log(announcementVo)
        
        if(!patcherble){
            return
        }

        patcherble= false;

        const fd = new FormData();
        fd.append("announcementNo", announcementVo.announcementNo);
        fd.append("title" , announcementVo.title);
        fd.append("content",announcementVo.content)
       fd.append("managerNo" , loginMember.managerNo);
      
       announcementVo?.deleteNoArr.forEach((item, index) => {
        console.log(`반복문 호출 annc`)
        fd.append(`deleteNoArr[${index}].imgNo`, item.imgNo);
        fd.append(`deleteNoArr[${index}].imgName`, item.imgName);
      })
       
      
       for (let i = 0; i < fileArr.length; i++) {
        fd.append("fileArr", fileArr[i]);
     }

     
        fetch("http://127.0.0.1:8888/app/announcement/change" , {
            method: "POST",
            body : fd ,
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.status === "good"){
                alert("공지사항 수정성공 !");
                
                navigate(`/admin/announcement/detail/${announcementVo.announcementNo}`)


            }else{
                
            }
        } )
        .catch( ()=>{
            
        })
        .finally( ()=>{patcherble = true; })
        ;
    };

   
    

    



    return (
        <StyledAdminChangeDiv>
        <form>
        <div className='ad_wrap'>
        <div className='ad_tit'>
                <div><h1>공지 사항 수정 </h1></div>
            </div>
            <div className='ad_tbl_box mt40'>
                <table>
                    <caption>공지 사항 수정</caption>
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
                                <input type="text" placeholder='제목을 입력해주세요' value={announcementVo?.title} name='title' onChange={onChange}/>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <th className='contTh' scope='row'>내용</th>
                            <td colSpan='3'>
                                <div class="form_box" >
                                    <textarea ref={textRef} value={announcementVo?.content} name='content' onChange={
                                                onChange   
                                    } onInput={handleResizeHeight} type="text-area" placeholder="값을 입력해주세요" ></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>이미지 첨부된 이미지</th>
                            <td colSpan='3'>
                                <ImgNameBox deleteImg={deleteOriginImg} fileArr={announcementVo?.fileList}/>

                                 <ImgNameBox deleteImg={deleteImg} fileArr={fileArr}/>
                            </td>
                            
                        </tr>
                        <tr>
                            <th scope='row'>이미지 업로드</th>
                            <td colSpan='3'>
                                <ImgThumbNail fileSrc ={fileSrc} onChangefiles={onChangefiles} deleteImg={deleteImg} 
                                    orignSrc ={announcementVo?.fileList} deleteOriginImg ={deleteOriginImg} 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='button_btn_box'>
                <div>
                    <button onClick={handleChange} className='sty02_btn' type='button'>수정</button>
                    <button onClick={()=>{navigate('/admin/announcement/list')}} className='sty01_btn'>목록가기</button>
                </div>
            </div>
        </div>
        </form>
    </StyledAdminChangeDiv>
);
};
export default AnnoucementChange;