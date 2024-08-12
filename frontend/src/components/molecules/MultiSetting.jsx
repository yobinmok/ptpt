import React, { useState } from 'react';
import SettingsModal from './MultiSettingModal';
import { Button } from '@mui/material';

const MultiSetting = () => {
  const [openModal, setOpenModal] = useState(false);

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
        sx={{ marginRight: '8px', marginBottom: '10px' }}
      >
        설정 변경
      </Button>
      <SettingsModal open={openModal} onClose={handleModalClose} />
    </>
  );
};

export default MultiSetting;
