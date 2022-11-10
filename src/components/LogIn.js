import React from "react";
import { useSelector } from "react-redux";

import { 
  initNaverLogin,
  initKaKaoLogin,
} from 'src/api/member/auth';
import { persistor } from "src/index"; 

import OutputIcon from '@mui/icons-material/Output';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const LogIn = ({ inputRef }) => {
  const user = useSelector((state) => state.user)
  
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

  const handleLogout = async () => {
    await persistor.purge()
    .then(() => {
      alert("로그아웃 되었습니다.")
    })
  }

  const handleNextClick = () => {
    if (user.ownerUid === 0) {
      alert("로그인 후 사용할 수 있습니다.")
      return
    }

    inputRef.current.slickNext()
  }

  return (
    <div className="step1">
      {/* <div className="stepBox"><span className="badge">STEP 1</span> 간편로그인</div> */}
      <p className="txt">쉽고 빠른 화물차 의뢰! 지금 꿀차에서 시작하세요.</p>
      {
        user.ownerUid !== 0 && 
        <div className="nameBox btnBox">
          <p className="mgb15">{user.name} 님, 안녕하세요</p>
          <button className="btn out" onClick={() => handleLogout()}><i><OutputIcon /></i>로그아웃</button>
        </div>
      }
      <div className="btnBox">
        {
          user.ownerUid === 0 ?
          <>
            <div className="kakao mgr5" onClick={handleKaKaoLogin}><img src="./assets/kakao.png" alt="" />카카오 로그인</div>
            <div className="naver" onClick={handleNaverLogin}><img src="./assets/naver.png" alt="" />네이버 로그인</div>
          </>
          :
          <></>
        }
        {
          user.ownerUid === 0 ? 
          <></> 
          : 
        <button className="btn req" onClick={() => handleNextClick()}><i><ReceiptLongIcon /></i>의뢰하기</button>
        
        }
      </div>
    </div>
  )
}

export default LogIn;
