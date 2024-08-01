// 리듀서: store에 들어갈 state와 state를 바꿀 함수 정의
// state와 state를 바꿀 함수를 정의하는 곳
const initialState = {
  studyRoomTitle: null,
  script: [
    { title: '스크립트1', content: '스크립트 내용이요', voiceSetting: null },
    { title: '스크립트2', content: '스크립트 내용이요', voiceSetting: null },
    { title: '스크립트3', content: '스크립트 내용이요', voiceSetting: null },
  ], // {title: "", content: "", voiceSetting: {model: 0, tone: 3, speakingRate: 2}} 리스트 형식 -> 불러올 때는 인덱스 사용
  voiceRecord: null, // 내 녹음본
  isRecording: false,
  expectedQuestion: false,
  createdTime: null,
  isCompleted: false,
  guideline: null,
};

// state 수정하는 방법
const soloReducer = (state = initialState, action) => {
  // STATE를 수정하는 방식을 다 정해둠 -> type : type에 따른 처리
  switch (action.type) {
    case 'REGISTER_GUIDELINE':
      console.log(action);
      console.log(state);
      return {
        ...state,
        script: state.script.map((item, index) =>
          index === action.payload.index
            ? { ...item, voiceSetting: action.payload.newVoiceSetting }
            : item
        ),
      };
    default:
      return state;
  }
};

export default soloReducer;
