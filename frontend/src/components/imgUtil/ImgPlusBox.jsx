import React, {useRef} from 'react';
import styled from 'styled-components';

const Style = styled.div`

.img-sumnail{
       width: 100px;
       height: 100px;
       
    }

  

`



const ImgPlusBox = ({onChangefiles}) => {
    
    let inputImgRef = useRef();
    
    const clcikInput = ()=>{ inputImgRef.current.click()}
    return (
        <>
        <input ref={inputImgRef} type='file' multiple  name='f' onChange={
            onChangefiles}
        style={{display : 'none'}}/>


        <div className='plus-div' onClick={()=>{
            clcikInput()
        }}>
            
            <div>
                +
            </div>
        </div>
    </>
    );
};

export default ImgPlusBox;

