import React, { useEffect, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Main from "./Main";
import Popup from "./Popup";

const Quiz = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let url = "https://rickandmortyapi.com/api/character";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "dataQuestions",
          dataQuestions: json,
        });
      });
  }, []);
  return (
    <Fragment>
      <Main />
      <Popup />
    </Fragment>
  );
};

export default Quiz;
