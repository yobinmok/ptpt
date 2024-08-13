import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbackDetail } from '../../../store/actions/feedbackActions';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FeedbackDetailContainer = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative; /* 추가: 버튼을 오른쪽 끝에 배치하기 위해 사용 */
`;

const FeedbackItem = styled.div`
  margin-bottom: 20px;
`;

const FeedbackTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const FeedbackComment = styled.p`
  margin: 5px 0;
`;

const FeedbackScore = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const AuthorLabel = styled.span`
  background-color: #d9edf7;
  color: #31708f;
  padding: 3px 7px;
  border-radius: 3px;
  font-size: 12px;
  margin-left: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FeedbackDetail = () => {
  const { studyRoomId } = useParams(); // URL에서 studyRoomId를 가져옴
  const dispatch = useDispatch();
  const navigate = useNavigate(); // navigate 훅 추가
  const feedbackDetail = useSelector((state) => state.feedback.feedback); // Redux 상태에서 데이터 가져오기
  const loading = useSelector((state) => state.feedback.loading);
  const error = useSelector((state) => state.feedback.error);
  const oauthId = useSelector((state) => state.auth.user.oauthId);

  useEffect(() => {
    console.log('OAuth ID:', oauthId); // oauthId 확인
    console.log('Study Room ID:', studyRoomId); // studyRoomId 확인

    if (oauthId && studyRoomId) {
      dispatch(fetchFeedbackDetail(oauthId, studyRoomId));
    }
  }, [dispatch, oauthId, studyRoomId]);

  console.log('Feedback Detail data:', feedbackDetail); // 데이터를 확인하는 로그 추가

  const handleBackClick = () => {
    navigate('/myinfo/statistics'); // 통계 페이지로 이동
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FeedbackDetailContainer>
      <h2>피드백 상세</h2>
      <BackButton onClick={handleBackClick}>뒤로</BackButton>
      {feedbackDetail && feedbackDetail.length > 0 ? (
        feedbackDetail.map((item, index) => (
          <FeedbackItem key={index}>
            <FeedbackTitle>
              <AuthorLabel>작성자</AuthorLabel> {item.nickname}
              {/* 작성자 라벨 추가 */}
            </FeedbackTitle>
            <FeedbackComment>코멘트: {item.commentContent}</FeedbackComment>
            <FeedbackScore>발표력: {item.delivery}</FeedbackScore>
            <FeedbackScore>표현력: {item.expression}</FeedbackScore>
            <FeedbackScore>논리성: {item.logic}</FeedbackScore>
            <FeedbackScore>준비성: {item.preparation}</FeedbackScore>
            <FeedbackScore>적합성: {item.suitability}</FeedbackScore>
          </FeedbackItem>
        ))
      ) : (
        <p>피드백이 없습니다.</p>
      )}
    </FeedbackDetailContainer>
  );
};

export default FeedbackDetail;
