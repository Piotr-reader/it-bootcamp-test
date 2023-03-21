import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./components/Quiz";
import { Provider } from "react-redux";
import { createStore } from "redux";
import questionReducer from "./redux/questionReducer";
const store = createStore(questionReducer);

ReactDOM.render(
  <Provider store={store}>
    <Quiz />
  </Provider>,
  document.getElementById("container")
);
