import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { takeMyEvaluate } from '../../apis/room';
// import { Radar } from 'react-chartjs-2';
// import { Chart } from 'chart.js/auto';
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(Legend);

const MyEvaluateContent = () => {
  const [myEvaluate, setMyEvaluate] = useState();
  const userId = useSelector((state) => state.user.data.oauth_id);

  // back-end response
  /*
  {
    "evaluationId": 0,
    "studyRoomId": 0,
    "memberId": 0,
    "delivery": 0,
    "expression": 0,
    "preparation": 0,
    "logic": 0,
    "suitability": 0
  }
  */

  useEffect(async () => {
    // 해당 페이지가 렌더링되면, api를 통해 내 정보 바로 불러오기
    // const response = await takeMyEvaluate(userId);
    // console.log(myEvaluate);
    // setMyEvaluate([...response]);
  }, []);

  return (
    <div>
      <p>내 평가</p>
      {/* 평가 항목을 그래프로 보여주기
        코멘트 모아서 보여주기
        - 익명이면, 그냥 보여주고
        - 공개면, 이름과 함께 보여주기 -> 현재 반환되는 값이 id인데, 이름과 보여주려면 api 호출이 또 필요
            - 따라서 반환을 id가 아닌 이름이나 별명?
     */}
    </div>
  );
};

export default MyEvaluateContent;
