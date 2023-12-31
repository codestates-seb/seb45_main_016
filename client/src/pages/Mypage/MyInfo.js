import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import DelModal from '../../components/DelModal/DelModal';
import {
  GetUserInfo,
  DeleteUser,
  EditUser,
  UploadProfileImage,
} from '../../utils/API';
// import UserInfoData from '../../utils/UserdataMockup';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

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
  const [isIndex, setIndex] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  // const [eventDates, setEventDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigator = useNavigate();

  const inputErrorClass = 'input-error';
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
  } = useForm();

  console.log(userInfo.name);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await GetUserInfo();
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };
    fetchUserInfo();
  }, []);
  console.log(userInfo);

  const route = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
  };

  // 유저 정보 수정
  const [newUsername, setNewUsername] = useState(userInfo.name);
  const [newPhone, setNewPhone] = useState(userInfo.phone);

  const confirmEditUser = async () => {
    console.log('수정 시작');
    console.log('newUsername:', newUsername);
    console.log('newPhone:', newPhone);
    if (!newUsername && !newPhone) {
      toast.info('변경할 정보가 없습니다.');
      return;
    }
    try {
      await EditUser(newUsername, newPhone);
      onUpdateUserInfo(newUsername, newPhone);

      console.log('수정 완료');
      localStorage.setItem('name', newUsername);
      localStorage.setItem('phone', newPhone);

      setIsEditMode(false);
      toast.success('수정이 완료되었습니다.');
      window.location.reload();
    } catch (e) {
      console.error('수정 실패:', e);
      toast.error('수정에 실패하였습니다.');
      navigator('/mypage');
    }
  };

  const onUpdateUserInfo = (newUsername, newPhone) => {
    setNewUsername(newUsername);
    setNewPhone(newPhone);
  };

  const openDelModal = (message) => {
    setWarningMessage(message);
    setDelModalOpen(true);
  };
  const closeDelModal = () => {
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
      closeDelModal();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);

    try {
      if (file) {
        setUserInfo({
          ...userInfo,
          profileImage: await UploadProfileImage(file),
        });
        //     const formData = new FormData();
        //     formData.append('profileImage', file);

        //     const response = await UploadProfileImage(file)

        //     const updatedProfileImage = response.data.profileImage;
        //     setUserInfo({ ...userInfo, profileImage: updatedProfileImage });

        //     console.log('프로필 이미지가 업로드되었습니다.');
        //   }
        window.location.reload();
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
      console.log(file);
    }
  };

  const handleEditPhotoClick = () => {
    // "프로필 이미지 선택" 버튼 클릭 시 input[type=file]을 클릭
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const openDetail = (boardId) => {
    navigator(`/community/boards/${boardId}`);
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
          <button className="edit" onClick={handleEditPhotoClick}>
            edit photo
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="delBtn" onClick={handleDeleteUser}>
            회원탈퇴하기
          </button>
          <DelModal
            isOpen={isDelModalOpen}
            onCancel={closeDelModal}
            onConfirm={confirmDeleteUser}
            warningMessage={warningMessage}
          />
        </ProfileLeft>
        <ProfileRight onSubmit={handleSubmit(confirmEditUser)}>
          {isEditMode ? (
            <>
              <div className="input-username">
                <p>새 닉네임</p>
                <input
                  type="text"
                  name="name"
                  placeholder="새 닉네임을 입력해 주세요."
                  {...register('name', {
                    required: '닉네임은 필수 입력입니다.',
                  })}
                  onBlur={() => trigger('name')}
                  className={errors.name ? inputErrorClass : ''}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="input-phonenumber">
                <p>새 전화번호</p>
                <input
                  type="tel"
                  name="phone"
                  placeholder="새 전화번호를 입력해 주세요."
                  {...register('phone', {
                    required: '전화번호는 필수 입력입니다.',
                  })}
                  onBlur={() => trigger('phone')}
                  className={errors.phone ? inputErrorClass : ''}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>

              <button
                className="editinfo"
                type="submit"
                disabled={isSubmitting}
                onClick={confirmEditUser}
              >
                수정완료
              </button>
            </>
          ) : (
            <div className="display">
              <div className="text">
                닉네임<p>{userInfo.name}</p>
                전화번호<p>{userInfo.phone}</p>
              </div>
              <button className="editinfo" onClick={() => setIsEditMode(true)}>
                내정보 수정하기
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
            {userInfo?.bookmarks?.length > 0 && (
              <BookMarkContainer>
                {isModalOpen === true && (
                  <Modal
                    date={userInfo.bookmarks[isIndex].licenseInfo.licenses}
                    setModalOpen={setModalOpen}
                    name={userInfo.bookmarks[isIndex].licenseInfo.name}
                    code={userInfo.bookmarks[isIndex].licenseInfo.code}
                    bookmark={userInfo.bookmarks[isIndex].licenseInfo.bookmark}
                  />
                )}
                {userInfo?.bookmarks?.map((bookmark, index) => (
                  <button
                    className="bookmark"
                    key={index}
                    onClick={() => route(index)}
                  >
                    {bookmark.licenseInfo.name}
                  </button>
                ))}
              </BookMarkContainer>
            )}
          </LikedInfo>
          <Written>
            내가 작성한 글
            {userInfo?.boards?.length > 0 ? (
              <WriteContents>
                {userInfo?.boards?.map((boards, index) => (
                  <button
                    className="write"
                    key={index}
                    onClick={() => openDetail(boards.boardId)}
                  >
                    {boards.title}
                  </button>
                ))}
                {/* </Link> */}
              </WriteContents>
            ) : (
              <p>아직 작성한 글이 없어요😅</p>
            )}
          </Written>
        </Log>
      </SchedulePlusLog>
      <Footer />
    </MypageStyle>
  );
};

export default MyInfo;
