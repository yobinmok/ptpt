import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvaluations } from '../../../store/actions/evaluationActions';

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const evaluations = useSelector((state) => state.evaluation.data);
  const error = useSelector((state) => state.evaluation.error);
  const userId = useSelector((state) => state.user.data?.id); // 사용자 ID 가져오기

  useEffect(() => {
    if (userId) {
      dispatch(fetchEvaluations(userId));
    }
  }, [dispatch, userId]);

  if (error) {
    return <div>Error loading evaluations: {error.message}</div>;
  }

  return (
    <div>
      <h1>통계 페이지</h1>
      {/* 평가 데이터를 기반으로 통계 표시 */}
      {evaluations.length > 0 ? (
        <ul>
          {evaluations.map((evaluation) => (
            <li key={evaluation.evaluationId}>
              <p>Delivery: {evaluation.delivery}</p>
              <p>Expression: {evaluation.expression}</p>
              <p>Preparation: {evaluation.preparation}</p>
              <p>Logic: {evaluation.logic}</p>
              <p>Suitability: {evaluation.suitability}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No evaluations available.</p>
      )}
    </div>
  );
};

export default StatisticsPage;
