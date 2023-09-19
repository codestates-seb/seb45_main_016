// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import { Calendar } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import Modal from '../../components/Modal/Modal';
// import DelModal from '../../components/DelModal/DelModal';
// import { GetUserInfo, DeleteUser, UpdateUserInfo } from '../../utils/API';

// import {
//   CalendarContainer,
//   LikedInfo,
//   MypageStyle,
//   Profile,
//   ProfileLeft,
//   ProfileRight,
//   SchedulePlusLog,
//   Log,
//   Written,
//   BookMarkContainer,
//   WriteContents,
// } from './MypageStyle';

// // eslint-disable-next-line no-undef
// const imageUrl = process.env.PUBLIC_URL + '/edit.png';

// const MyInfo = ({ InfoData, ComData }) => {
//   const [userInfo, setUserInfo] = useState({});
//   const [isIndex, setIndex] = useState();
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isDelModalOpen, setDelModalOpen] = useState(false);
//   const [warningMessage, setWarningMessage] = useState('');
//   const [date, setDate] = useState(new Date());
//   const navigator = useNavigate();
//   const userId = localStorage.getItem('userId');

//   const WriteData = ComData.filter((info) => {
//     return info.username === userId;
//   });

//   // 유저 정보 가져오기
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await GetUserInfo();
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('유저 정보 가져오기 실패:', error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const modal = (index) => {
//     if (isModalOpen === false) {
//       setModalOpen(true);
//     }
//     setIndex(index);
//   };

//   const openDelModal = (message) => {
//     setWarningMessage(message);
//     setDelModalOpen(true);
//   };

//   const closeModal = () => {
//     setDelModalOpen(false);
//   };

//   const handleDeleteUser = async () => {
//     openDelModal('이 작업은 되돌릴 수 없어요!');
//   };

//   useEffect(() => {
//     if (isModalOpen === true) {
//       document.body.style = `overflow:hidden`;
//     } else {
//       document.body.style = `overflow:display`;
//     }
//   });

//   const handleDateChange = (date) => {
//     setDate(date);
//   };

//   const openDetail = () => {
//     navigator('/community/Detail/');
//   };

//   const confirmDeleteUser = async () => {
//     try {
//       await DeleteUser();
//       alert('그동안 이용해주셔서 감사합니다.');
//       localStorage.clear();
//       navigator('/');
//     } catch (e) {
//       console.error('회원 탈퇴 실패:', e);
//       alert('탈퇴에 실패하였습니다.');
//     } finally {
//       closeModal();
//     }
//   };

//   return (
//     <MypageStyle>
//       <Header />

//       <Profile>
//         {isModalOpen === true && (
//           <Modal
//             date={InfoData[isIndex].date}
//             setModalOpen={setModalOpen}
//             name={InfoData[isIndex].name}
//           />
//         )}
//         <ProfileLeft>
//           <img
//             /*{useravatar}*/ src="https://dinotaeng.com/file_data/dinotaeng/2022/04/07/3e1a4215a71999cb828799e4da858012.png"
//             alt="useravatar"
//           />
//           <button className="edit">edit photo</button>
//           <button className="delBtn" onClick={handleDeleteUser}>
//             회원탈퇴하기
//           </button>
//           <DelModal
//             isOpen={isDelModalOpen}
//             onCancel={closeModal}
//             onConfirm={confirmDeleteUser}
//             warningMessage={warningMessage}
//           />
//         </ProfileLeft>
//         <ProfileRight>
//           <div className="input-username">
//             <input type="text" placeholder="username"></input>
//             <button>
//               <img src={imageUrl} alt="editlogo" />
//             </button>
//           </div>
//           <div className="input-email">
//             <input type="text" placeholder="E-mail"></input>
//             <button>
//               <img src={imageUrl} alt="editlogo" />
//             </button>
//           </div>
//           <div className="input-phonenumber">
//             <input type="text" placeholder="Phone number"></input>
//             <button>
//               <img src={imageUrl} alt="editlogo" />
//             </button>
//           </div>
//         </ProfileRight>
//       </Profile>
//       <SchedulePlusLog>
//         <CalendarContainer className="calendar-container">
//           <Calendar
//             onChange={handleDateChange}
//             value={date}
//             showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
//           />
//         </CalendarContainer>
//         <Log>
//           <LikedInfo>
//             나의 관심 자격증
//             <BookMarkContainer>
//               {/* {InfoData 배열 순회하여 버튼 렌더링} */}
//               {InfoData.map((item, index) => (
//                 <button
//                   className="bookmark"
//                   key={index}
//                   onClick={() => modal(index)}
//                 >
//                   {item.name}
//                 </button>
//               ))}
//             </BookMarkContainer>
//           </LikedInfo>
//           <Written>
//             내가 작성한 글
//             <WriteContents>
//               {WriteData.map((item, index) => (
//                 <button className="write" key={index} onClick={openDetail}>
//                   {item.title}
//                 </button>
//               ))}
//             </WriteContents>
//           </Written>
//         </Log>
//       </SchedulePlusLog>
//       <Footer />
//     </MypageStyle>
//   );
// };

// export default MyInfo;

import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import DelModal from '../../components/DelModal/DelModal';
import { GetUserInfo, DeleteUser, EditUser } from '../../utils/API';
// import UserInfoData from '../../utils/UserdataMockup';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

import {
  CalendarContainer,
  LikedInfo,
  MypageStyle,
  Profile,
  ProfileLeft,
  ProfileRight,
  SchedulePlusLog,
  Log,
  Written,
  BookMarkContainer,
  WriteContents,
} from './MypageStyle';

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  // const [isIndex, setIndex] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  // const [eventDates, setEventDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigator = useNavigate();
  // const userId = localStorage.getItem('userId');
  // const [username, setUsername] = useState(userInfo.name);
  // const [email, setEmail] = useState(userInfo.email);
  // const [phone, setPhone] = useState(userInfo.phone);

  console.log(userInfo.name);

  // const [Image, setImage] = useState(UserInfoData.profileImage);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await GetUserInfo();
        console.log('dlfma', response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };
    fetchUserInfo();
  }, []);
  console.log(userInfo);

  const fileInput = useRef(null);

  const handleEditPhoto = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);
      axios
        .patch('http://{{host}}/members/mypage/image/upload/1', formData)
        .then((response) => {
          console.log('프로필 이미지 업데이트 성공:', response.data);
          userInfo.profileImage = response.data.profileImageUrl;
          toast.success('프로필 이미지가 업데이트되었습니다.');
        })
        .catch((error) => {
          console.error('프로필 이미지 업데이트 실패:', error);
          toast.error('프로필 이미지 업데이트 실패했습니다.');
        });
    }
  };

  const openDetail = (boardId) => {
    navigator(`/community/detail/${boardId}`);
  };
  const route = () => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
  };

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const onUpdateUserInfo = (newUsername, newEmail, newPhone) => {
    setNewUsername(newUsername);
    setNewEmail(newEmail);
    setNewPhone(newPhone);
  };

  const confirmEditUser = async () => {
    try {
      const updatedUserInfo = {
        username: newUsername,
        email: newEmail,
        phone: newPhone,
      };

      await EditUser(updatedUserInfo);
      onUpdateUserInfo(newUsername, newEmail, newPhone);

      console.log('수정 완료');
      toast.success('수정이 완료되었습니다.');
      localStorage.setItem('name', newUsername);
      localStorage.setItem('email', newEmail);
      localStorage.setItem('phone', newPhone);
      setIsEditMode(false);
    } catch (e) {
      console.error('수정 실패:', e);
      toast.error('수정에 실패하였습니다.');
    }
  };

  const openDelModal = (message) => {
    setWarningMessage(message);
    setDelModalOpen(true);
  };
  const closeModal = () => {
    setDelModalOpen(false);
  };
  const handleDeleteUser = async () => {
    openDelModal('이 작업은 되돌릴 수 없어요!');
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const confirmDeleteUser = async () => {
    try {
      await DeleteUser();
      toast.success('그동안 이용해주셔서 감사합니다.');
      localStorage.clear();
      navigator('/');
    } catch (e) {
      console.error('회원 탈퇴 실패:', e);
      toast.error('탈퇴에 실패하였습니다.');
    } finally {
      closeModal();
    }
  };

  // const extractEventDates = () => {
  //   const extractedDates = [];

  //   userInfo.bookmarks.forEach((bookmark) => {
  //     extractedDates.push(new Date(bookmark.licenseInfo.docRegStartDt));
  //     extractedDates.push(new Date(bookmark.licenseInfo.docRegEndDt));
  //     extractedDates.push(new Date(bookmark.licenseInfo.docExamStartDt));
  //     extractedDates.push(new Date(bookmark.licenseInfo.docExamEndDt));
  //   });

  //   return extractedDates;
  // };

  // useEffect(() => {
  //   // 이벤트 날짜 추출 및 상태 업데이트
  //   const extractedDates = extractEventDates();
  //   setEventDates(extractedDates);
  // }, []);

  return (
    <MypageStyle>
      <Header />
      <Profile>
        <ProfileLeft>
          <img src={userInfo.profileImage} alt="useravatar" />
          <button className="edit" onClick={handleEditPhoto}>
            edit photo
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInput}
            style={{ display: 'none' }}
          />
          <button className="delBtn" onClick={handleDeleteUser}>
            회원탈퇴하기
          </button>
          <DelModal
            isOpen={isDelModalOpen}
            onCancel={closeModal}
            onConfirm={confirmDeleteUser}
            warningMessage={warningMessage}
          />
        </ProfileLeft>
        <ProfileRight>
          {isEditMode ? (
            <>
              <div className="input-username">
                <input
                  type="text"
                  // value={name}
                  placeholder={userInfo.name}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="input-email">
                <input
                  type="text"
                  // value={email}
                  placeholder={userInfo.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="input-phonenumber">
                <input
                  type="text"
                  // value={phone}
                  placeholder={userInfo.phone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <button className="editinfo" onClick={confirmEditUser}>
                수정완료
              </button>
            </>
          ) : (
            <div className="display">
              <div className="text">
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
                <p>{userInfo.phone}</p>
              </div>
              <button className="editinfo" onClick={() => setIsEditMode(true)}>
                수정하기
              </button>
            </div>
          )}
        </ProfileRight>
      </Profile>
      <SchedulePlusLog>
        <CalendarContainer className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
            formatDay={(locale, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            }
            nextLabel={'▶'}
            prevLabel={'◀'}
            next2Label={null}
            prev2Label={null}
            // tileContent={({ date, view }) => {
            //   if (view === 'month' && eventDates.includes(date)) {
            //     // 이벤트가 있는 경우 해당 이벤트의 name 표시
            //     const eventLicenseNames = userInfo.bookmarks
            //       .filter((bookmark) =>
            //         [
            //           bookmark.licenseInfo.docRegStartDt,
            //           bookmark.licenseInfo.docRegEndDt,
            //           bookmark.licenseInfo.docExamStartDt,
            //           bookmark.licenseInfo.docExamEndDt,
            //         ].includes(date.toISOString()),
            //       )
            //       .map((bookmark) => bookmark.licenseInfo.name);

            //     return (
            //       <div className="licensedate">
            //         {eventLicenseNames.map((name, index) => (
            //           <div key={index}>{name}</div>
            //         ))}
            //       </div>
            //     );
            //   } else {
            //     return null;
            //   }
            // }}
          />
        </CalendarContainer>
        <Log>
          <LikedInfo>
            나의 관심 자격증
            <BookMarkContainer>
              {/* {InfoData 배열 순회하여 버튼 렌더링} */}
              {userInfo?.bookmarks?.map((bookmark, index) => (
                <button className="bookmark" key={index} onClick={route}>
                  {bookmark.licenseInfo.name}
                </button>
              ))}
            </BookMarkContainer>
            {isModalOpen === true && <Modal setModalOpen={setModalOpen} />}
          </LikedInfo>
          <Written>
            내가 작성한 글
            <WriteContents>
              {/* <Link
                to={('/community/detail/' + board, index.boardId)}
                key={(board, index.boardId)}
              > */}
              {userInfo?.boards?.map((board, index) => (
                <button className="write" key={index} onClick={openDetail}>
                  {board.title}
                </button>
              ))}
              {/* </Link> */}
            </WriteContents>
          </Written>
        </Log>
      </SchedulePlusLog>
      <Footer />
    </MypageStyle>
  );
};

export default MyInfo;
