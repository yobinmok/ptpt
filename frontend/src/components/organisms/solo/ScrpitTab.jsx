import { useState } from 'react';
import { TextField } from '@mui/material';
import RegisterScriptTab from './RegisterScrpitTab';
import SelectScriptTab from './SelectScriptTab';
import { useSelector, useDispatch } from 'react-redux';

const ScriptTab = () => {
  // 옵션들은 store에서 가져와야 함
  const options = [
    { value: 0, label: '스크립트ver1' },
    { value: 1, label: '스크립트 갈아엎음' },
    { value: 2, label: '최종최종' },
  ];

  // const [showRegisterTab, setShowRegisterTab] = useState(false);
  // const handleAddCircleClick = () => {
  //   setShowRegisterTab(true); // 클릭 시 RegisterScriptTab을 표시
  // };
  let isSelectScriptTab = useSelector((state) => state.room.isSelectScriptTab);

  return (
    <>
      {!isSelectScriptTab ? (
        <RegisterScriptTab /> // 클릭 시 RegisterScriptTab 컴포넌트 표시
      ) : (
        <SelectScriptTab
          options={options}
          // handleAddCircleClick={handleAddCircleClick}
        />
      )}
    </>
  );
};

export default ScriptTab;
