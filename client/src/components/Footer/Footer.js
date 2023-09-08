import {
  FooterStyle,
  Leftform,
  Logo,
  Teamname,
  Gitlink,
  Rightform,
} from './FooterStyle';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

// eslint-disable-next-line no-undef
const imageUrl = process.env.PUBLIC_URL + '/Logo.png';
// eslint-disable-next-line no-undef
const imageUrlgit = process.env.PUBLIC_URL + '/gitIcon.png';
// eslint-disable-next-line no-undef
const imageUrlgit1 = process.env.PUBLIC_URL + '/gitIcon1.png';
// eslint-disable-next-line no-undef
const notion = process.env.PUBLIC_URL + '/notion.png';
// eslint-disable-next-line no-undef
const notion1 = process.env.PUBLIC_URL + '/notion1.png';
// eslint-disable-next-line no-undef
const figma = process.env.PUBLIC_URL + '/figma.png';
// eslint-disable-next-line no-undef
const figma1 = process.env.PUBLIC_URL + '/figma1.png';

const Footer = () => {
  const [isGitHovered, setIsGitHovered] = useState(false);
  const [isNotionHovered, setIsNotionHovered] = useState(false);
  const [isFigmaHovered, setIsFigmaHovered] = useState(false);

  return (
    <FooterStyle>
      <Leftform>
        <Logo>
          <Link to="/">
            <img src={imageUrl} alt="logo" />
          </Link>
        </Logo>
        <Teamname>
          <div>TEAM</div>
          <div>일단🌞보죠</div>
        </Teamname>
        <Gitlink>
          <div>
            <span>Front-end</span>
            <a href="https://github.com/kuetiipp">Seonhye Kim</a>
            <a href="https://github.com/kwonis">Inseung Kwon</a>
            <a href="https://github.com/rudeoreha">Hyeona Lee</a>
          </div>
          <div>
            <span>Back-end</span>
            <a href="https://github.com/hae02y">Haeyoung Jung</a>
            <a href="https://github.com/luminousol">Soli Choi</a>
            <a href="https://github.com/in9in9">Insoo Na</a>
            <a href="https://github.com/Allenkimgg">Gunkook Kim</a>
          </div>
        </Gitlink>
      </Leftform>
      <Rightform>
        <a
          href="https://github.com/codestates-seb/seb45_main_016"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsGitHovered(true)}
          onMouseLeave={() => setIsGitHovered(false)}
        >
          <img
            src={isGitHovered ? imageUrlgit1 : imageUrlgit}
            alt="GitHub 로고"
          />
        </a>
        <a
          href="https://www.notion.so/056ba51472444db194a6b6e7a8324b3e"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsNotionHovered(true)}
          onMouseLeave={() => setIsNotionHovered(false)}
        >
          <img src={isNotionHovered ? notion1 : notion} alt="Notin 로고" />
        </a>
        <a
          href="https://www.figma.com/file/AJIkokkPGmGtrxUpuqU1P7/%EC%9D%BC%EB%8B%A8%F0%9F%8C%9E%EB%B3%B4%EC%A3%A0_Main?type=design&node-id=255-4827&mode=design&t=lJHWdtoymXwn3JdH-0"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsFigmaHovered(true)}
          onMouseLeave={() => setIsFigmaHovered(false)}
        >
          <img src={isFigmaHovered ? figma1 : figma} alt="Figma 로고" />
        </a>
      </Rightform>
    </FooterStyle>
  );
};

export default Footer;
