import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Info from './pages/LicenseInfo/Info';
import ComList from './pages/Community/ComList';
import SearchFiltered from './pages/Filtered/SearchFiltered';
import MyInfo from './pages/Mypage/MyInfo';
import ComDetail from './pages/Community/ComDetail';
import PostContent from './pages/Community/PostContent';
import Edit from './pages/Community/Edit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/community" element={<ComList />} />
          <Route path="/community/detail" element={<ComDetail />} />
          <Route path="/write" element={<PostContent />} />
          <Route path="/edit/{현재게시글 고유번호}" element={<Edit />} />
          <Route path="/mypage" element={<MyInfo />} />
          <Route path="/search" element={<SearchFiltered />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
