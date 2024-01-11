import './App.css';
import Layout from './components/Layout';
import Admin from './admin/Admin';
import Login from './components/member/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/member/*" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
