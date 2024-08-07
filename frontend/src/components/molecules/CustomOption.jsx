import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { reportParticipants, assignationParticipants } from '../../apis/room';

const otherOptions = ['발표자 지정', '신고'];
const myOptions = ['발표자 지정'];

const ITEM_HEIGHT = 48;

export default function CustomOption({ participant }) {
  const userId = useSelector((state) => state.user.userId);
  const studyRoomId = useSelector((state) => state.room.roomId);
  //   const userId = 'OpenVidu_User48';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // 사용자와 participant가 같으면 myOptions, 다르면 otherOptions 사용
  const options = participant === userId ? myOptions : otherOptions;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleOption = (option, person) => {
    if (option === '발표자 지정') {
      console.log('발표자 지정 호출');
      //   reportParticipants -> nickname
      // oauthId로 post할 수 없음 -> 신고자는 상대방의 oauthId를 알 수 없다
      const response = reportParticipants(person);
    } else if (option === '신고') {
      console.log('신고');
      //assignationParticipants -> studyroomId, nickname
      const response = assignationParticipants(studyRoomId, person);
    }
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              console.log(`${option} clicked for ${participant}`);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
