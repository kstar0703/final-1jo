import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalTest from './ModalTest';




const MyPageDiv = styled.div`
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid cornflowerblue;
    
    & > div{
        display: flex;
        flex-direction: column;
        gap: 20px
    }

    & > :first-child{
        
       width: 100%;
       justify-content: space-between;
       align-items: center;
        background-color: lightcoral;
       & {
        margin :20px;
       }
    }

    & > :nth-child(2){
        background-color: white;
        
        & > :nth-child(2){
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
    }
    
    & > :nth-child(3){
        
    }

   
    
`

const MyPage = () => {
    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    let testModal = true;

    const openModal = () => {
        
        setIsModalOpen(true)};
    
    const closeModal = () => {
            console.log(testModal)
        setIsModalOpen(false)}



    // 로그인정보
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

    // 네비 게이트
    const navigate = useNavigate();
    // 비번 변경
    const changePwd = () =>{
        navigate('/member/changePwd')
    }

    // 정보 수정
    const changePwdInfo = () =>{
        navigate('/member/edit')
    }

    const[logout,setLogout] = useState(1);


    // 로그아웃  
    const onClickLogout = () =>{
        sessionStorage.removeItem("loginMember")
        navigate('/')
  
    }

    // 회원탈퇴 
    const onClickQuit = () =>{
        navigate('/member/quit')
    }

    // 홈으로
    const onClickHome = ()=>{
        navigate('/member/home')
    } 

    return (
       <>
       <MyPageDiv>
            {/* 1 */}
            <div>
                <button>뒤로가기</button>
                <h2>마이페이지</h2>
                <div></div>
            </div>
            {/*2  */}
            <div>
                <div>
                    <span>{loginMember.name } 님 [아파트먼트#{loginMember.memberNo}]  </span>
                    <span></span>
                </div>

                <div>
                    <button onClick={changePwd}>비밀번호 변경</button>
                    <button onClick={changePwdInfo}>정보 수정</button>
                </div>
            </div>
            {/* 3 */}
            <div>
                <div>
                    <span>관리자승인 : </span>
                    {loginMember ? <span> 승인됨</span> : "" }
                </div>

                <div>
                    <span>세대주/세대원 : </span>
                    {!loginMember ? '' : loginMember.ownerYn ==='Y' ? <span>세대주</span> : <span>세대원</span>  }
                </div>

                <div>
                    <span>동/호수</span>
                    <span>
                        {loginMember ? <span> {loginMember.dong}동 {loginMember.ho}호  </span> : '' }
                    </span>
                </div>
            </div>

            {/*3  */}
            <div>
                <button onClick={onClickLogout}>로그아웃</button>
                <button>회원탈퇴</button>
            </div>

            

            <button onClick={openModal}>모달 열기</button>
            <ModalTest isOpen={isModalOpen} closeModal={closeModal} title={'정말 탈퇴하시겠습니까?'}  />

                

           
       </MyPageDiv>
       </>
    );
};

export default MyPage;