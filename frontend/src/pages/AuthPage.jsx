import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AuthPage = () => {
    // 인가 코드 상태 변수
    const [code, setCode] = useState(null)

    // accessToken 상태 변수
    const [accessToken, setAccessToken] = useState(null)

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        setCode(code);
        console.log(window.location.href);

        // URL에서 인가 코드 추출
        const PARAMS = new URL(document.location).searchParams;
        const KAKAO_CODE = PARAMS.get("code");
        
        // 콘솔에 파라미터와 인가 코드 출력
        console.log(PARAMS);
        console.log(KAKAO_CODE);
    
        if (code) {
          fetchAccessToken(code);
        }
           
    }, []);

    // Access Token 요청 함수
    const fetchAccessToken = async (authorizationCode) => {
      try {
        const response = await axios.post('백엔드 포트 번호', {
          code : authorizationCode
        });
        // 백엔드 응답 데이터
        const data = response.data;
        // Access Token 상태에 저장
        setAccessToken(data.accessToken);
        console.log('Access Token:', data.accessToken);
      } catch (error) {
        console.error('Error fetching access token', error);
      }
    };

    return (
        <div>
            <h1>Auth Page</h1>
            { code ? (
                <p>Authorization Code : {code}</p>

            ) : (
                <p>Loading...</p>
            )}
            {accessToken && (
                <p>Access Token: {accessToken}</p>
            )}
        </div>
    );
};
export default AuthPage