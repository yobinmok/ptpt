import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie'
import { Axios } from '../util/http-commons';
import axios from 'axios';

// 컨텍스트 생성
export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  /* -----------------------[State]-------------------------- */
  // 로그인 여부
  const [isLogin, setLogin] = useState(false);

  // 유저 정보
  const [userInfo, setUserInfo] = useState(null);

  // 권한 정보
  const [roles, setRoles] = useState({ isUser: false, isAdmin: false });

  // 페이지 이동
  const navigate = useNavigate();

  // 로그인 체크
  const loginCheck = async () => {
    // accessToken 쿠키 확인 -> 추후 refresh token이 추가되면 accessToken은 Cookie에 저장
    // const accessToken = Cookies.get("accessToken")
    const accessToken = localStorage.getItem('accessToken');
    console.log(`accessToken : ${accessToken}`);

    // token이 없으면 로그아웃
    if (!accessToken) {
      console.log(`쿠키에 accessToken(jwt) 가 없음`);
      // 로그아웃 세팅
      logoutSetting();
      return;
    }

    // token이 있으면, 헤더에 token 등록
    console.log(`쿠키에 JWT(accessToken) 이 저장되어 있음`);
    // axios common header 에 등록
    Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // 사용자 정보 요청
    let response;
    let data;

    try {
      console.log(Axios.defaults.headers);
      // response = await axios.get('http://localhost:8080/api/v1/users/me')
      response = await axios.get('http://localhost:8080/api/v1/users/me');
      data = response.data;
    } catch (error) {
      console.log(`error : ${error}`);
      if (error.response) {
        console.log(`status : ${error.response.status}`);
        console.log(`accessToken(jwt) 이 만료되었거나 인증에 실패하였습니다.`);
        // alert로 알람 추가?
        logout();
      }
      return;
    }

    console.log(`data : ${data}`);

    // 인증 실패
    if (data === 'UNAUTHORIZED' || response.status === 401) {
      console.log(`accessToken(jwt) 이 만료되었거나 인증에 실패하였습니다.`);
      logout();
      return;
    }

    // 인증 성공
    console.log(`accessToken(jwt) 토큰으로 사용자 정보 요청 성공!`);
    console.log(response);

    // 로그인 세팅
    loginSetting(data, accessToken);
  };

  // 로그인
  const login = async (userId, password) => {
    console.log(`id: ${userId}`);
    console.log(`password: ${password}`);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/login',
        {
          id: userId,
          password: password,
        }
      );
      // const data = response.data
      console.log(response.data);
      const status = response.data.statusCode;
      // const headers = response.headers
      // const authorization = headers.authorization
      const accessToken = response.data.accessToken;
      // JWT
      // const accessToken = authorization.replace("Bearer ", "")

      // console.log(`data : ${data}`);
      console.log(`status : ${status}`);
      // console.log(`headers : ${headers}`);
      console.log(`jwt : ${accessToken}`);

      // 로그인 성공
      if (status === 200) {
        // Cookies.set("accessToken", accessToken)
        localStorage.setItem('accessToken', accessToken);

        // 로그인 체크
        loginCheck();
        setLogin(true);

        alert('로그인 성공. 메인 화면으로 이동합니다.');
        navigate('/');
      }
    } catch (error) {
      alert('로그인 실패. 아이디 또는 비밀번호가 일치하지 않습니다.');
      console.log(`로그인 실패: ${error}`);
    }
  };

  // 로그인 세팅
  // userData, accessToken(jwt)
  const loginSetting = (userData, accessToken) => {
    const { no, userId, authList } = userData; // Users (DTO) [JSON]
    // const { department, position, name, userId } = userData // ssafy_web_db - user dto
    // const roleList = authList.map((auth) => auth.auth)  // [ROLE_USER,ROLE_ADMIN]

    console.log(`no : ${no}`);
    console.log(`userId : ${userId}`);
    console.log(`authList : ${authList}`);
    // console.log(`roleList : ${roleList}`);

    // axios common header - Authorizaion 헤더에 jwt 등록
    Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // Context 에 정보 등록
    // 로그인 여부 세팅
    setLogin(true);

    // 유저 정보 세팅
    // const updatedUserInfo = {no, userId, roleList}
    const updatedUserInfo = { no, userId };
    setUserInfo(updatedUserInfo);

    // 권한 정보 세팅
    const updatedRoles = { isUser: false, isAdmin: false };
    // roleList.forEach((role) => {
    //   if (role === 'ROLE_USER') updatedRoles.isUser = true
    //   if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true
    // })
    setRoles(updatedRoles);
  };

  // 로그아웃 세팅
  const logoutSetting = () => {
    // axios 헤더 초기화
    Axios.defaults.headers.common.Authorization = undefined;

    // 쿠키 초기화
    // Cookies.remove("accessToken")
    localStorage.removeItem('accessToken');

    // 로그인 여부 : false
    setLogin(false);

    // 유저 정보 초기화
    // setUserInfo(null)

    // 권한 정보 초기화
    // setRoles({isUser: false, isAdmin: false})
  };

  // 로그아웃
  const logout = () => {
    logoutSetting();
    setLogin(false);
    // 강제 새로고침
    window.location.reload();
    navigate('/');
    return;
  };

  const signup = async (formData) => {
    try {
      console.log('signup try');
      console.log(formData.data);
      const response = await axios.post('http://localhost:8080/api/v1/users', {
        userId: formData.userId,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        position: formData.position,
        name: formData.name,
        department: formData.department,
      });
      console.log(response.data);
      const status = response.data.statusCode;

      console.log(`status : ${status}`);

      // 로그인 성공
      if (status === 200) {
        alert('회원가입 성공');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Mount / Update
  useEffect(() => {
    // 로그인 체크
    loginCheck();
    // 1. 쿠키에서 jwt 을 꺼낸다
    // 2️. jwt 있으면, 서버한테 사용자정보를 받아온다
    // 3️. 로그인 세팅을 한다. (로그인여부, 사용자정보, 권한정보 등록)
  }, []);

  return (
    // 컨텍스트 값 지정 ➡ value={ ?, ? }
    <LoginContext.Provider
      value={{ isLogin, userInfo, roles, login, loginCheck, logout, signup }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
