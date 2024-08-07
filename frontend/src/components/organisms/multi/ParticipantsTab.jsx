import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CustomOption from '../../molecules/CustomOption';

const ParticipantsTab = () => {
  const userId = 'myUserId';
  const participants = useSelector((state) => state.participant.participants);

  const participantsWithoutMe = participants.filter(
    (participant) => participant !== userId
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {participantsWithoutMe.map((participant, index) => (
          <ListItem
            key={index}
            secondaryAction={<CustomOption participant={participant} />}
          >
            <ListItemText primary={participant} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ParticipantsTab;
