import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../modal/Modal';




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
            gap: 10px;

            &  button{
                width: 200px;
                height: 50px;
            }
        }
        
    }
    
    & > :nth-child(3){
        
    }

   
    
`

const MyPage = () => {
    //모달 (탈퇴))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => { setIsModalOpen(true)};
    const closeModal = () => {setIsModalOpen(false)}
    //모달 (로그아웃)

        const [isModalOpenLogout, setIsModalOpenLogout] = useState(false);
        const openModalLogout = () => {
            
            setIsModalOpenLogout(true)};
        
        const closeModalLogout = () => {
                
            setIsModalOpenLogout(false)}
            
    

    
    let patcherble = true;
    const fecthJava = () =>{

        if(!patcherble){
            return
        }

        patcherble = false;

       

        fetch("http://127.0.0.1:8888/app/member/delete",{
            method: "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(loginMember),
        })
        .then( (resp) => {return resp.json()} )
        .then( (data) => {
           if(data.status==='good'){
                sessionStorage.removeItem(loginMember)
                alert(data.msg)
                navigate("/")
           }else{
                alert('탈퇴실패')
           }
           
        })
        .finally( () =>{
            patcherble=true;
        })
       
 }

       
    



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
                <button onClick={onClickHome}>뒤로가기</button>
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
                    <button onClick={changePwdInfo}>내 정보 확인</button>
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
                <button onClick={openModalLogout}>로그아웃</button>
                
                <button onClick={openModal}>회원탈퇴</button>     
            </div>

            
           
           {/* 로그아웃 */}
            <Modal fecthJava={onClickLogout}  isOpen={isModalOpenLogout} closeModal={closeModalLogout} title={'로그아웃 하시겠습니까?'}></Modal>
            
            {/* 탈퇴 */}
            <Modal fecthJava={fecthJava}  isOpen={isModalOpen} closeModal={closeModal} title={'정말 탈퇴 하시겠습니까?'}></Modal>
            
                

           
       </MyPageDiv>
       </>
    );
};

export default MyPage;