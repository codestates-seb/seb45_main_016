import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Info from './pages/Information/Info';
import ComList from './pages/Community/ComList';
import SearchFiltered from './pages/Filtered/SearchFiltered';
import MyInfo from './pages/Mypage/MyInfo';
import ComDetail from './pages/Community/ComDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/com" element={<ComList />} />
          <Route path="/com/detail" element={<ComDetail />} />
          <Route path="/mypage" element={<MyInfo />} />
          <Route path="/search/result" element={<SearchFiltered />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
