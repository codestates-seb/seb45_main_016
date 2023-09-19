const UserInfoData = {
  memberId: '1',
  email: 'user1@example.com',
  name: '나는회원1',
  phone: '01012345678',
  profileImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbcWuOfIIeauCrkEBuuFRDE2RecNDMJzcEr4CIkqckKg&s',
  boards: [
    {
      id: 1,
      title: '[후기] 정보처리기사 꿀팁 후기입니다.',
    },
  ],
  bookmarks: [
    {
      id: 1,
      licenseInfo: {
        code: 1022,
        name: '용접기사',
        markCount: 1,
        licenses: [],
        docRegStartDt: '20230902',
        docRegEndDt: '20230912',
        docExamStartDt: '20231008',
        docExamEndDt: '20231012',
      },

      member: {
        memberId: 1,
        email: 'user1@example.com',
        name: '나는회원1',
        phone: '01012345678',
        password:
          '{bcrypt}$2a$10$9ey5PzQPljo7XHMXarv8yexJdGQxuiUaHKfuXBzOj37PmTzpzo9Q2',
        profileImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbcWuOfIIeauCrkEBuuFRDE2RecNDMJzcEr4CIkqckKg&s',
        roles: ['USER', 'ADMIN'],
      },
    },
  ],
};
export default UserInfoData;
