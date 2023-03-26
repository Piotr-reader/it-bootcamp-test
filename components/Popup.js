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
  if (personIndex !== null && dataQuestions) {
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
              <p className="text_name">
                Name: <span>{person.name}</span>
              </p>
              <p className="text_name">
                Status: <span>{person.status}</span>
              </p>
              <p className="text_name">
                Species: <span>{person.species}</span>
              </p>
            </div>
            <div className="text">
              <p className="text_name">
                Origin: <span>{person.origin.name}</span>
              </p>
              <p className="text_name">
                Location: <span>{person.location.name}</span>
              </p>
              <p className="text_name">
                Gender: <span>{person.gender}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Fragment>{popup}</Fragment>;
};
export default Popup;
