const SoloRoomItem = ({ item, onClick }) => {
  const handleClick = () => {
    onClick(item);
  };

  return (
    <>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {item.title} | {item.createdTime} |{' '}
        {item.isCompleted ? '종료' : '연습 중'}
      </div>
    </>
  );
};

export default SoloRoomItem;
