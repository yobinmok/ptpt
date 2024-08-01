import CustomSelect from '../../molecules/CustomSelect';
import CustomTextarea from '../../molecules/CustomTextarea';
const ScriptTab = () => {
  // 옵션들은 store에서 가져와야 함
  const options = [
    { value: 0, label: '스크립트ver1' },
    { value: 1, label: '스크립트 갈아엎음' },
    { value: 2, label: '최종최종' },
  ];
  return (
    <>
      <CustomSelect
        label='스크립트 선택'
        options={options}
        onChange={() => {}}
      ></CustomSelect>
      <CustomTextarea></CustomTextarea>
      <div>- textarea(수정 및 삭제버튼)</div>
      <div>- 작성 화면</div>
      <div> 등록 및 취소 버튼</div>
    </>
  );
};

export default ScriptTab;
