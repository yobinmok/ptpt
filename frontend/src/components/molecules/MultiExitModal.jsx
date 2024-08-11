import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePreset } from '../../apis/preset';

export const MultiExitModal = ({ open, handleClose }) => {
  const multiPreset = useSelector((state) => state.multi);
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const navigate = useNavigate();
  console.log(multiPreset);

  const param = {
    oauthId: oauthId,
    presetType: 'multi',
    presetData: multiPreset,
  };

  const saveClickListener = () => {
    savePreset(
      param,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    navigate('/');
    handleClose();
  };

  const exitClickListener = () => {
    navigate('/');
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '40px',
          }}
        >
          <div>발표 연습에 사용한 데이터를 저장하시겠습니까?</div>
          <div>저장한 정보는 내 정보에서 확인할 수 있습니다.</div>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '15px',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={saveClickListener}
          >
            저장
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={exitClickListener}
          >
            나가기
          </Button>
          <Button variant='contained' color='neutral' onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
