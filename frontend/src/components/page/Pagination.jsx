import React from 'react';
import styled from 'styled-components';

const StyledBtn = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    margin: 10px;
    padding: 5px;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
  }

  & button {
    width: 40px;
    height: 30px;
    background-color: lightgray;  /* 버튼 배경색 */
    color: black;  /* 글자색 */
    border-radius: 5px;  /* 버튼 모서리 둥글게 */
    border: 1px solid lightgray;  /* 버튼 테두리 스타일 */
  }
`
// pvo 디비에서 받아온 요소 (PageVo)

// currentPage 현재 페이지 // 뺴도됌

// onPageChange = (page) =>{
//     setCurrentPage(page)
// }

const Pagination = ({ pvo, currentPage, onPageChange }) => {
  // 페이지를 표시할 범위 계산

  console.log(pvo)
  
  const pageRange = Array.from({ 'length': pvo? Number(pvo.endPage)-Number(pvo.startPage)+1 :1 }, (_, index) => index + Number (pvo?.startPage) );
  

  

  return (
    
    <>
    {JSON.stringify(pvo) !== '{}' ? 
    
    <StyledBtn>
       {/* 처음으로 */}
       {pvo?.currentPage ===1 ? '' : <button onClick={ () => onPageChange(1)}>{'<<<'}</button>}
       {/* 5칸뒤로 */}
       {pvo?.currentPage ===1 ? '' : <button onClick={()=>{ onPageChange(pvo?.currentPage-5 <1 ? 1 : pvo?.currentPage-5) }} >{'<<'}</button>}
       {/* 페이지이동 */}
       {pvo?.startPage!==1 ? <button onClick={() => {onPageChange(pvo?.startPage- pvo?.pageLimit)}}>이전</button> : '' } 
      {pageRange.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}
      {/* 페이지 앞으로 */}
      {pvo?.endPage===pvo?.maxPage ? '' : <button onClick={() => onPageChange(pvo?.endPage+1)}>다음</button>}
      {/* 페이징 5칸이동 */}
      {pvo?.currentPage >= pvo?.maxPage ? '' : <button onClick={ () =>{
        onPageChange(pvo?.currentPage <= pvo?.maxPage-5  ? pvo?.currentPage+5 : pvo?.maxPage )
      }} >{'>>'}</button>}
      {/* 페이징 마지막 */}
      {pvo?.currentPage===pvo?.maxPage ? '': <button onClick={ () =>onPageChange(pvo?.maxPage)}>{'>>>'}</button> }

    </StyledBtn>
   
    : '' }
    </>
      
  );
};

export default Pagination;