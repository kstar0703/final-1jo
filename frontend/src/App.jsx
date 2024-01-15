import './App.css';
import Layout from './components/Layout';
import Admin from './admin/Admin';
import Login from './components/member/Login';
import Join from './components/member/Join';
import AdminLogin from './admin/login/AdminLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/join" element={<Join/>}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
