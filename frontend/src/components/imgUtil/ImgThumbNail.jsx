import React from 'react';
import styled from 'styled-components';
import ImgPlusBox from './ImgPlusBox';
import ImgBox from './ImgBox';


const ThumbNailDiv =  styled.div`

    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 10px; 
    
    .plus-div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
       height: 100px;
       border: 1px solid black;
    }
    .plus-div:hover{
       cursor: pointer;
    }
`

// 요소로 Img Box와

// 이미지 ImgPlus 박스를 사용 

//  사용하는쪽
{/* <ImgThumbNail fileSrc ={fileSrc} onChangefiles={onChangefiles} deleteImg={deleteImg} /> */}

// 
 // 파일 업로드 미리보기

//  const [fileArr,setFileArr] = useState([]);
//  const [fileSrc, setFileSrc] = useState([]);

//  const onChangefiles = (e) => {    
//      const filesArray = Array.from(e.target.files)
//      console.log(filesArray.length)
//      if(fileArr.length + filesArray.length >10){
//          alert("파일업로드는 10까지 가능합니다")
//          return
//      }

//      setFileArr([...fileArr,...filesArray]);

//      console.log(fileArr)
 
//      const files = Array.from(e.target.files);
 
//      files.forEach((file, index, array) => {
//          if (file) {
//              const reader = new FileReader();
 
//              reader.onload = function (e) {
//                  setFileSrc(prevFileSrc => [...prevFileSrc, e.target.result]);
//              };
 
//              reader.readAsDataURL(file);
//          }
//      });   
//  }


// 딜리트 이미지 

// const deleteImg = (index) => {
//     // fileSrc 배열에서 해당 인덱스의 이미지를 제외한 새로운 배열 생성
//     const updatedFileSrc = fileSrc.filter((_, i) => i !== index);

//     // 업로드할 파일 업데이트
//     setFileSrc(updatedFileSrc);

//     const updatedFileArr = fileArr.filter((_, i) => i !== index);
    
//     // 업로드할 파일 업데이트
//     setFileArr(updatedFileArr);

// }

// orignSrc ={} deleteOringFile ={} 이건 안쓰셔도 됩니당 ( 수정용임)




const ImgThumbNail = ({fileSrc,onChangefiles,deleteImg,orignSrc,deleteOriginImg}) => {
    
    return (
        <ThumbNailDiv>
        {orignSrc?.map( (src,index)=>
            <ImgBox key={index} onClick={()=>{
                
            }} src={src?.path + src?.imgName} index={index} deleteImg={deleteOriginImg}/>
        )
       }

        {fileSrc?.map( (src,index)=>
            <ImgBox key={index} src={src} index={index} deleteImg={deleteImg}/>
        )
       }
       { fileSrc?.length + (orignSrc?.length ||0) < 10 ? 
       <ImgPlusBox onChangefiles={onChangefiles}/>
        : ''  
    }
    
    </ThumbNailDiv>
    );
};

export default ImgThumbNail;