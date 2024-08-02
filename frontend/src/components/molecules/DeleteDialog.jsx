import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTempScript } from '../../store/actions/solo';

export const DeleteDialog = ({ open, handleClose, deleteAction }) => {
  const curIndex = useSelector((state) => state.solo.tempScript);

  const dispatch = useDispatch();
  const deleteClickListener = () => {
    dispatch(deleteAction(curIndex.index));
    dispatch(useTempScript(0, { title: '', content: '' }));
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
          <div>정말로 이 데이터를 삭제하시겠습니까? </div>
          <div>이 작업은 되돌릴 수 없습니다.</div>
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
            onClick={deleteClickListener}
          >
            삭제
          </Button>
          <Button variant='contained' color='neutral' onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
