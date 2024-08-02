// 리듀서: store에 들어갈 state와 state를 바꿀 함수 정의
// state와 state를 바꿀 함수를 정의하는 곳
const initialState = {
  studyRoomTitle: null,
  script: [],
  // {title: "", content: "", voiceSetting: {model: 0, tone: 3, speakingRate: 2}} 리스트 형식 -> 불러올 때는 인덱스 사용
  voiceRecord: null, // 내 녹음본
  isRecording: false,
  expectedQuestion: false,
  createdTime: null,
  isCompleted: false,
  guideline: null,
  tempScript: null, // {index, script}, script: {title: , content: } 형식
};

// state 수정하는 방법
const soloReducer = (state = initialState, action) => {
  // STATE를 수정하는 방식을 다 정해둠 -> type : type에 따른 처리
  switch (action.type) {
    case 'REGISTER_GUIDELINE':
      return {
        ...state,
        script: state.script.map((item, index) =>
          index === action.payload.index
            ? { ...item, voiceSetting: action.payload.newVoiceSetting }
            : item
        ),
      };
    case 'USE_TEMP_SCRIPT':
      return {
        ...state,
        tempScript: action.payload,
      };
    case 'UPDATE_SCRIPT':
      return {
        ...state,
        script: state.script.map((item, index) =>
          index === action.payload.index
            ? {
                ...item,
                ...action.payload.script,
              }
            : item
        ),
      };
    case 'CREATE_SCRIPT':
      return {
        ...state,
        script: [...state.script, action.payload.script], // 새로운 스크립트를 추가
      };
    case 'DELETE_SCRIPT':
      return {
        ...state,
        script: state.script.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
};

export default soloReducer;
