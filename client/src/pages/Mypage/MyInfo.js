/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import DelModal from '../../components/DelModal/DelModal';
import { deleteUser } from '../../utils/API';

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

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/edit.png';

const MyInfo = ({ InfoData, ComData }) => {
  const [isIndex, setIndex] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const navigator = useNavigate();
  const userId = localStorage.getItem('userId');

  const WriteData = ComData.filter((info) => {
    return info.username === userId;
  });

  const modal = (index) => {
    if (isModalOpen === false) {
      setModalOpen(true);
    }
    setIndex(index);
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

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style = `overflow:hidden`;
    } else {
      document.body.style = `overflow:display`;
    }
  });

  const handleDateChange = (date) => {
    setDate(date);
  };

  const openDetail = () => {
    navigator('/community/Detail/');
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser();
      alert('그동안 이용해주셔서 감사합니다.');
      localStorage.clear();
      navigator('/');
    } catch (e) {
      console.error('회원 탈퇴 실패:', e);
      alert('탈퇴에 실패하였습니다.');
    } finally {
      closeModal();
    }
  };

  return (
    <MypageStyle>
      <Header />

      <Profile>
        {isModalOpen === true && (
          <Modal
            date={InfoData[isIndex].date}
            setModalOpen={setModalOpen}
            name={InfoData[isIndex].name}
          />
        )}
        <ProfileLeft>
          <img
            /*{useravatar}*/ src="https://dinotaeng.com/file_data/dinotaeng/2022/04/07/3e1a4215a71999cb828799e4da858012.png"
            alt="useravatar"
          />
          <button className="edit">edit photo</button>
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
          <div className="input-username">
            <input type="text" placeholder="username"></input>
            <button>
              <img src={imageUrl} alt="editlogo" />
            </button>
          </div>
          <div className="input-email">
            <input type="text" placeholder="E-mail"></input>
            <button>
              <img src={imageUrl} alt="editlogo" />
            </button>
          </div>
          <div className="input-phonenumber">
            <input type="text" placeholder="Phone number"></input>
            <button>
              <img src={imageUrl} alt="editlogo" />
            </button>
          </div>
        </ProfileRight>
      </Profile>
      <SchedulePlusLog>
        <CalendarContainer className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          />
        </CalendarContainer>
        <Log>
          <LikedInfo>
            나의 관심 자격증
            <BookMarkContainer>
              {/* {InfoData 배열 순회하여 버튼 렌더링} */}
              {InfoData.map((item, index) => (
                <button
                  className="bookmark"
                  key={index}
                  onClick={() => modal(index)}
                >
                  {item.name}
                </button>
              ))}
            </BookMarkContainer>
          </LikedInfo>
          <Written>
            내가 작성한 글
            <WriteContents>
              {WriteData.map((item, index) => (
                <button className="write" key={index} onClick={openDetail}>
                  {item.title}
                </button>
              ))}
            </WriteContents>
          </Written>
        </Log>
      </SchedulePlusLog>
      <Footer />
    </MypageStyle>
  );
};

export default MyInfo;
