import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppDispatch } from 'src/store';
import userSlice from 'src/slice/user';
import tokenSlice from 'src/slice/token';

import {
  getNaverAccessToken
} from "src/api/member/auth";

const NaverLogin = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const SEARCH_PARAM = location.search.replace("?", "").split("&");

    const CODE = SEARCH_PARAM[0].split("=")[1];
    const STATE = SEARCH_PARAM[1].split("=")[1];

    getNaverAccessToken(CODE, STATE)
    .then(res => {
      const SOCIAL = JSON.parse(res.data.socialToken)
      const PROFILE = res.data.profile

      dispatch(
        tokenSlice.actions.SET_TOKEN({
          accessToken: res.data.token,
          refreshToken: SOCIAL.refresh_token
        })
      )
      dispatch(
        userSlice.actions.SET_LOGIN({
          ownerUid: PROFILE.ownerUid,
          name: PROFILE.ownerName,
          email: "",
          phoneNumber: PROFILE.phoneNumber,
          social: "NAVER",
          isLogin: true
        })
      )
    })
    .then(() => {
      navigate("/", { replace: true });
    })
    .catch(() => {
      navigate("/LogIn", { replace: true })
      alert("로그인 할 수 없습니다.\n다시 로그인해주세요.")
    });
  })

  return (
    <div></div>
  )
}

export default NaverLogin;