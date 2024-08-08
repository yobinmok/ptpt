import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { takeMyEvaluate } from '../../apis/room';
import MultiRadarChart from '../organisms/myInfo/MultiRadarChart';
import { Box, Typography, Paper, Divider } from '@mui/material';

const MyEvaluateContent = () => {
  const [myEvaluate, setMyEvaluate] = useState({
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
  });
  const [myComment, setMyComment] = useState([]);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.user.userId);
  let anonymity = 0;
  // oauth_id로 내 평가 호출해오기
  const getMyEval = async () => {
    try {
      const response = await takeMyEvaluate(studyRoomId, userId);
      console.log(response.length);
      if (response) {
        // 익명 여부와 평가 길이
        anonymity = response[0].anonymity;
        const totalEvaluate = response.reduce(
          (acc, curr) => ({
            delivery: acc.delivery + curr.delivery,
            expression: acc.expression + curr.expression,
            preparation: acc.preparation + curr.preparation,
            logic: acc.logic + curr.logic,
            suitability: acc.suitability + curr.suitability,
          }),
          {
            delivery: 0,
            expression: 0,
            preparation: 0,
            logic: 0,
            suitability: 0,
          }
        );
        const averageEvaluate = {
          delivery: totalEvaluate.delivery / response.length,
          expression: totalEvaluate.expression / response.length,
          preparation: totalEvaluate.preparation / response.length,
          logic: totalEvaluate.logic / response.length,
          suitability: totalEvaluate.suitability / response.length,
        };

        const comments = response.map(({ nickname, commentContent }) => ({
          nickname,
          commentContent,
        }));

        setMyEvaluate(averageEvaluate);
        console.log(myEvaluate);
        setMyComment(comments);
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
      <Box sx={{ padding: 0 }}>
        <Typography variant='h5' gutterBottom>
          내 평가
        </Typography>
        <Box sx={{ marginBottom: 3 }}>
          <MultiRadarChart data={myEvaluate} />
        </Box>
        <Box>
          <Typography variant='h6' gutterBottom>
            코멘트
          </Typography>
          {myComment.map((comment, index) => (
            <Paper
              key={index}
              elevation={4}
              sx={{ padding: 2, marginBottom: 2 }}
            >
              {anonymity === 0 && (
                <Typography variant='subtitle1' gutterBottom>
                  {comment.nickname}
                </Typography>
              )}
              <Divider />
              <Typography variant='body1'>{comment.commentContent}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default MyEvaluateContent;
