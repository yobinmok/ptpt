const MultiRoomItem = ({ item }) => {
  return (
    <>
      <div>
        {item.presetData.roomname} | {item.presetData.roomtopic} |
        {item.presetData.roomcomment} | {item.presetData.roomopen} |
        {item.presetData.roomtime}
      </div>
    </>
  );
};

export default MultiRoomItem;
