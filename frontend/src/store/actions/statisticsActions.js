import { Axios } from '../../util/http-commons';
import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAILURE,
} from '../types/statisticsTypes';

// 통계 데이터 설정 액션 생성자
export const setStatistics = (data) => ({
  type: STATISTICS_SUCCESS,
  payload: data,
});

// 통계 데이터를 가져오는 비동기 액션 생성자
// 닉네임으로
export const fetchStatistics = (nickname) => async (dispatch) => {
  dispatch({ type: STATISTICS_REQUEST });

  try {
    console.log('Fetching statistics for nickname:', nickname);
    const response = await Axios().post('/member/statistic', { nickname });
    dispatch({
      type: STATISTICS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    dispatch({
      type: STATISTICS_FAILURE,
      error: error.message,
    });
  }
};
