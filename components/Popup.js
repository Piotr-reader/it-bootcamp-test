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

  const btnCancel = () => {
    dispatch({
      type: "personIndex",
      personIndex: null,
    });
  };
  let popup = [];
  if (personIndex!==null&&dataQuestions) {
    let person = dataQuestions[personIndex];

    popup = (
      <div id="popup" className="Popup">
        <div className="popup_content">
          <button className="popup_close" onClick={btnCancel}>
            <img src="./image/close-popup.svg" alt="picture" />
          </button>
          <div className="popup_text">
            <img className="popup_img" src={person.image} alt="image" />
            <div className="text">
            <p>Name:{person.name}</p>
            <p>Status: {person.status}</p>
            <p>Species: {person.species}</p>
            </div>
            <div className="text">
            <p>Origin: {person.origin.name}</p>
            <p>Location: {person.location.name}</p>
            <p>Gender: {person.gender}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return <Fragment>{popup}</Fragment>;
};
export default Popup;
