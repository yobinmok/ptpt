import React, { useState } from 'react';
import SettingsModal from './MultiSettingModal';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const MultiSetting = () => {
  const [openModal, setOpenModal] = useState(false);
  const hostId = useSelector((state) => state.room.hostId);
  const nickname = useSelector((state) => state.auth.user.nickname);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={handleModalOpen}
        disabled={hostId !== nickname}
        sx={{ marginRight: '8px', marginBottom: '10px' }}
      >
        설정 변경
      </Button>
      <SettingsModal open={openModal} onClose={handleModalClose} />
    </>
  );
};

export default MultiSetting;
