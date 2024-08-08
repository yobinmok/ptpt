import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePreset } from '../../apis/preset';

export const ExitModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const soloPreset = useSelector((state) => state.solo);
  const oauthId = useSelector((state) => state.auth.user.oauthId);

  console.log(soloPreset);
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요, 2자리 맞추기
  const date = String(now.getDate()).padStart(2, '0'); // 2자리 맞추기

  const createdTime = `${year}-${month}-${date}`;

  const presetData = {
    title: '제목',
    createdTime: createdTime,
    isCompleted: false,
    presentationSheet: '',
    script: soloPreset.script.map(({ guideline, ...rest }) => rest),
  };

  const param = {
    oauthId: oauthId,
    presetType: 'solo',
    presetData: presetData,
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
