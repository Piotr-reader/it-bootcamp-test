import React, { useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import { useDispatch } from "react-redux";

const Main = (props) => {
  const dataQuestions = useSelector((state) => state.dataQuestions);
  const dispatch = useDispatch();
  let item = [];
  if (dataQuestions) {
    dataQuestions.results.forEach((element, index) => {
      item.push(
        <div
          className="item"
          key={index}
          onClick={() => {
            console.log(dataQuestions.results[index]);
          }}
        >
          <img className="image" src={element.image} alt="avatar" />
          <p className="personName">{element.name}</p>
        </div>
      );
    });
  }
  // window.addEventListener("scroll", () => {
  //   const documentRect = document.documentElement.getBoundingClientRect();
  //   if (documentRect.bottom < document.documentElement.clientHeight + 50) {
  //     if (dataQuestions) {
  //       let url = dataQuestions.info.next;
  //       fetch(url)
  //         .then((response) => response.json())
  //         .then((json) => {
  // dispatch({
  //   type: "dataQuestions",
  //   dataQuestions: json,
  // });
  // });
  // }
  // }
  // });
  return <Fragment>{item}</Fragment>;
};

export default Main;
