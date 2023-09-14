import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Info from './pages/LicenseInfo/Info';
// import ComList from './pages/Community/ComList';
import SearchFiltered from './pages/Filtered/SearchFiltered';
import MyInfo from './pages/Mypage/MyInfo';
// import ComDetail from './pages/Community/ComDetail';
import PostContent from './pages/Community/PostContent';
import Edit from './pages/Community/Edit';
import ComDetailMock from './pages/Community/ComDetailMock';
import ComListMock from './pages/Community/ComListMock';
import Kakao from './pages/Login/Kakao';
import { infoData } from './utils/infoDummydata';
import { comData } from './utils/ComData';
// import { GetAllLicensesList,  GetAllCommunityPostsList } from './utils/API';

function App() {
  const [InfoData, setInfoData] = useState([]);
  const [ComData, setComData] = useState([]);

  useEffect(() => {
    setComData([...comData]);
    setInfoData([...infoData]);
  }, []);

  // 데이터 전체 받아오기 - 자격정보, 게시글
  // useEffect(() => {
  //   GetAllCommunityPostsList().then((res) => setComData([...res.data]));
  //   GetAllLicensesList().then((res) => setInfoData([...res.data]));
  // }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main InfoData={InfoData} ComData={ComData} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info InfoData={InfoData} />} />
          {/* <Route path="/community" element={<ComList ComData={ComData} />} /> */}
          {/* <Route path="/community/detail/boards/:id" element={<ComDetail  ComData={ComData} />} /> */}
          {/* mockpage */}
          <Route
            path="/community/list"
            element={<ComListMock ComData={ComData} />}
          />
          <Route
            path="/community/detail/:id"
            element={<ComDetailMock ComData={ComData} />}
          />
          {/*  */}
          <Route path="/write" element={<PostContent />} />
          <Route path="/edit/:id" element={<Edit ComData={ComData} />} />
          <Route
            path="/mypage"
            element={<MyInfo InfoData={InfoData} ComData={ComData} />}
          />
          <Route path="/search" element={<SearchFiltered />} />
          <Route path="/login/oauth/code/kakao" element={<Kakao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
