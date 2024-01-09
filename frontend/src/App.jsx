import './App.css';
import Layout from './components/Layout';
import Admin from './admin/Admin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
