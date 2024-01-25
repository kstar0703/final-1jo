import React, {useEffect} from 'react';
import Layout from '../admin/Layout';
import {  useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate =  useNavigate()
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"))

    
  useEffect(() => {
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));

    if (!loginMember) {
      alert('로그인 상태가 아닙니다');
      navigate('/admin');
    }else if (!(loginMember.managerNo)){
        alert('관리자가 아닙니다(권한이 부족합니다)');
        navigate('/admin')
    }
  }, [navigate]);
    

    return (
        <Layout/>
    );
};

export default Admin;