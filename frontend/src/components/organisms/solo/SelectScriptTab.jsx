import React from 'react';
import { Box } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomTextarea from '../../molecules/CustomTextarea';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useDispatch } from 'react-redux';
import { toggleScriptSelect } from '../../../store/actions/room';

const SelectScriptTab = ({ options }) => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center', // 세로 가운데 정렬
          marginBottom: '10px',
        }}
      >
        <CustomSelect
          label='스크립트 선택'
          options={options}
          onChange={() => {}}
        />
        <AddCircleOutlinedIcon
          sx={{
            color: '#7A7A7A',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            dispatch(toggleScriptSelect());
          }}
        />
      </Box>

      <CustomTextarea
        placeholder={'스크립트를 선택해주세요'}
        content={''}
        editFlag={false}
        sx={{ marginTop: '10px' }} // marginTop 추가
      />
    </Box>
  );
};

export default SelectScriptTab;
