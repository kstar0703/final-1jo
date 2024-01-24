import React from 'react';
import styled from 'styled-components';

const FimeNameDiv =styled.div`


        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;

    
    .file-name-button{
        display: flex;
        gap:5px
    }

    .file-name-button span{
        font-size: 10px;
    }
    .file-name-button button{
        font-size: 10px;
        background-color: white;
        color: black;
    }
    .file-name-button button:hover{
        font-size: 12px;
        cursor: pointer;
        color: red;
    }
    
` 



const ImgNameBox = ({deleteImg,fileArr}) => {
    return (
        <FimeNameDiv className='file_name_div'>
        {fileArr?.map( (file,index) =>
            <div className='file-name-button'><span>{file?.name ? file?.name : file?.originName }</span><button type='button' onClick={()=>{
                deleteImg(index)
            }} >X</button></div>            
            )
        
        }
        </FimeNameDiv>
    );
};

export default ImgNameBox;