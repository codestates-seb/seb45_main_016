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
          {/* 아래코드가 실제 사용할 코드입니다 */}
          {/* <Route
            path={'/community/detail' + `${localStorage.getItem('param')}`}
            element={<ComDetail />}
          /> */}
          {/* 아래코드는 서버연결 없이 개발을 진행하기 위한 테스트용으로 지워질 코드입니다. */}
          <Route path={'/community/detail'} element={<ComDetail />} />
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
