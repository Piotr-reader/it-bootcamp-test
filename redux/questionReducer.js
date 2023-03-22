const initState = {
  dataQuestions: "",
  personIndex: null,
  dataPage: 1,
  dataInfo:"",
};

function questionReducer(state = initState, action) {
  switch (action.type) {
    case "dataQuestions": {
      let newState = { ...state, dataQuestions: action.dataQuestions };
      return newState;
    }
    case "dataInfo": {
      let newState = { ...state, dataInfo: action.dataInfo };
      return newState;
    }
    case "personIndex": {
      let newState = { ...state, personIndex: action.personIndex };
      return newState;
    }
    case "dataPage": {
      let newState = { ...state, dataPage: action.currentPage };
      return newState;
    }
    default:
      return state;
  }
}

export default questionReducer;
