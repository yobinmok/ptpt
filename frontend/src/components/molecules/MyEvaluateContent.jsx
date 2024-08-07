import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { takeMyEvaluate } from '../../apis/room';

const MyEvaluateContent = () => {
  const [myEvaluate, setMyEvaluate] = useState({
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
  });
  const [myComment, setMyComment] = useState({
    nickname: '',
    commentContent: '',
  });
  // const userId = useSelector((state) => state.user.data.oauth_id);
  const studyRoomId = useSelector((state) => state.room.roomId);

  // back-end response
  /*
  [
  {
    "evaluationId": 4,
    "studyRoomId": 2,
    "oauthId": null,
    "delivery": 100,
    "expression": 100,
    "preparation": 55,
    "logic": 55,
    "suitability": 60,
    "commentContent": "",
    "nickname": "OpenVidu_User43",
    "anonymity": 0
  }
]
  */
  // oauth_id로 내 평가 호출해오기
  const getMyEval = async () => {
    try {
      const userId = 'G123';
      // const userId = useSelector((state) => state.user.userId);
      const response = await takeMyEvaluate(studyRoomId, userId);
      if (response && response.data) {
        const {
          delivery,
          expression,
          preparation,
          logic,
          suitability,
          nickname,
          commentContent,
          anonymity, // 필요한가?
        } = response.data;
        setMyEvaluate({
          delivery,
          expression,
          preparation,
          logic,
          suitability,
        });
        setMyComment({ nickname, commentContent });
      }
    } catch (error) {
      console.log('get my evaluate error : ' + error);
    }
  };

  useEffect(() => {
    getMyEval();
  }, []);

  return (
    <div>
      <p>내 평가</p>
      <div>
        <h3>평가 점수</h3>
        <p>Delivery: {myEvaluate.delivery}</p>
        <p>Expression: {myEvaluate.expression}</p>
        <p>Preparation: {myEvaluate.preparation}</p>
        <p>Logic: {myEvaluate.logic}</p>
        <p>Suitability: {myEvaluate.suitability}</p>
      </div>
      <div>
        <h3>코멘트</h3>
        <p>Nickname: {myComment.nickname}</p>
        <p>Comment: {myComment.commentContent}</p>
      </div>
    </div>
  );
};

export default MyEvaluateContent;
