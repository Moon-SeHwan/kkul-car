import React from "react";

import { 
  initNaverLogin,
  initKaKaoLogin,
} from 'src/api/member/auth';

const LogIn = ({ inputRef }) => {

  const handleNaverLogin = () => {
    initNaverLogin()
    .then(res => {
      window.location.href = res.data
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleKaKaoLogin = () => {
    initKaKaoLogin()
    .then(res => {
      window.location.href = res.data
    })
  }

  const handleNextClick = () => {
    inputRef.current.slickNext()
  }

  return (
    <div className="step1">
      <div className="stepBox"><span className="badge">STEP 1</span> 간편로그인</div>
      <p className="txt">쉽고 빠른 화물차 의뢰! 지금 꿀차에서 시작하세요.</p>
      <div className="btnBox">
        <div className="kakao" onClick={handleKaKaoLogin}><img src="./assets/kakao.png" alt="" />카카오 로그인</div>
        <div className="naver" onClick={handleNaverLogin}><img src="./assets/naver.png" alt="" />네이버 로그인</div>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default LogIn;
