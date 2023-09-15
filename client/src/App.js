import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import Login from './pages/Login/Login';
import Info from './pages/LicenseInfo/Info';
import ComList from './pages/Community/ComList';
import SearchFiltered from './pages/Filtered/SearchFiltered';
import MyInfo from './pages/Mypage/MyInfo';
import ComDetail from './pages/Community/ComDetail';
import PostContent from './pages/Community/PostContent';
import Edit from './pages/Community/Edit';
import Kakao from './pages/Login/Kakao';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/community" element={<ComList />} />
          <Route path="/community/detail/boards/:id" element={<ComDetail />} />
          <Route path="/write" element={<PostContent />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/mypage" element={<MyInfo />} />
          <Route path="/search" element={<SearchFiltered />} />
          <Route path="/login/oauth/code/kakao" element={<Kakao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
