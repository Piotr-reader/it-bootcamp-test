const initState = {
  dataQuestions: "",
};

function questionReducer(state = initState, action) {
  switch (action.type) {
    case "allDataQuestions": {
      let newState = { ...state, allDataQuestions: action.allDataQuestions };
      return newState;
    }
    case "dataQuestions": {
      let newState = { ...state, dataQuestions: action.dataQuestions };
      return newState;
    }
    default:
      return state;
  }
}

export default questionReducer;
