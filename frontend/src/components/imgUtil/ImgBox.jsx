import React from 'react';
import styled from 'styled-components';

const ImgBoxDiv = styled.div`
    .img-sumnail{
        width: 100px;
       height: 100px;
    }

    .btn-x{
        position: absolute;
        margin-left: 90px;
        color: black;
        background-color: transparent;
        
    }
    .btn-x:hover{
        color : red;
        font-size: 17px;
        cursor: pointer;
    }
`
const ImgBox = ({src,index,deleteImg}) => {
    
    return (
        <ImgBoxDiv>
             <img src={src} alt="" className='img-sumnail' />
        <button className='btn-x' type='button' onClick={()=>{
            deleteImg(index)
        }}>X</button>
        </ImgBoxDiv>
    );
};

export default ImgBox;