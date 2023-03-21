import React from "react";
import "./Main.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Popup.css";
import { Fragment } from "react";

const Popup = (props) => {
  const dataQuestions = useSelector((state) => state.dataQuestions);
  const personIndex = useSelector((state) => state.personIndex);
  const dispatch = useDispatch();
  let popup = [];
  // if (!personIndex)
  if (dataQuestions) {
    let person = dataQuestions.results[0];
    popup = (
      <div id="popup" className="Popup">
        <div className="popup_content">
          <button className="popup_close" onClick={btnCancel}>
            <img src="./image/close-popup.svg" alt="picture" />
          </button>
          <div className="popup_text">
            <img src={person.image} alt="image" />
            <p>Name:{person.name}</p>
            <p>Status: {person.status}</p>
            <p>Species: {person.species}</p>
            <p>Origin: {person.origin.name}</p>
            <p>Location: {person.location.name}</p>
            <p>Gender: {person.gender}</p>
          </div>
        </div>
      </div>
    );
  }

  const btnCancel = () => {
    dispatch({
      type: "personIndex",
      personIndex: null,
    });
  };

  return <Fragment>{popup}</Fragment>;
};
export default Popup;
