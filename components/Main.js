import React, { useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import { useDispatch } from "react-redux";

const Main = (props) => {
  const [fetching, setFetching] = useState(true);
  const [isScroll, setScroll] = useState(false);
  const [isSwitch, setSwitch] = useState("Scroll");
  const [orderSet, setOrder] = useState(1);
  const dataQuestions = useSelector((state) => state.dataQuestions);
  const dataPage = useSelector((state) => state.dataPage);
  const dataInfo = useSelector((state) => state.dataInfo);
  const dispatch = useDispatch();

  let downLoading = "";

  useEffect(() => {
    let url = "https://rickandmortyapi.com/api/character";
    if (dataPage > 1) {
      url = dataInfo.next;
    }

    if (fetching) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "dataQuestions",
            dataQuestions: [...dataQuestions, ...json.results],
          });
          dispatch({
            type: "dataInfo",
            dataInfo: json.info,
          });
          dispatch({
            type: "dataPage",
            currentPage: dataPage + 1,
          });
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    if (isScroll) {
      document.addEventListener("scroll", scrollHandler);
      return function () {
        document.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [isScroll]);

  const scrollHandler = () => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 1) {
      setFetching(true);
    }
  };

  let item = [];
  if (dataQuestions) {
    dataQuestions.forEach((element, index) => {
      item.push(
        <div
          className="item"
          key={index}
          onClick={() => {
            dispatch({
              type: "personIndex",
              personIndex: index,
            });
          }}
        >
          <img className="image" src={element.image} alt="avatar" />
          <p className="personName">{element.name}</p>
        </div>
      );
    });
  }

  const toTop = () => {
    window.scrollTo(0, 0);
  };
  let isLoading = "";
  if (dataInfo.next) {
    isLoading = <img className="loading" src="./image/discord-loading-dots-discord-loading.gif" alt="loading" />;
  }

  const btn_prev = () => {
    if (dataInfo.prev) {
      fetch(dataInfo.prev)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "dataQuestions",
            dataQuestions: json.results,
          });
          dispatch({
            type: "dataInfo",
            dataInfo: json.info,
          });
          dispatch({
            type: "dataPage",
            currentPage: dataPage - 1,
          });
        });
    }
  };
  const btn_next = () => {
    if (dataInfo.next) {
      fetch(dataInfo.next)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "dataQuestions",
            dataQuestions: json.results,
          });
          dispatch({
            type: "dataInfo",
            dataInfo: json.info,
          });
          dispatch({
            type: "dataPage",
            currentPage: dataPage + 1,
          });
        });
    }
  };
  let pagination = (
    <div className="pagination">
      <input className="btn_prev" type="button" defaultValue="назад" onClick={btn_prev} />
      <input className="btn_text" type="text" value={dataPage - 1} onChange={() => {}} />
      <input className="btn_next" type="button" defaultValue="вперед" onClick={btn_next} />
    </div>
  );

  const switchPagin = () => {
    if (isSwitch === "Scroll") {
      setScroll(true);
      setOrder(0);
      setSwitch("Pagination");
    } else {
      setScroll(false);
      setSwitch("Scroll");
      setFetching(false);
      setOrder(2);
    }
  };
  isScroll ? (downLoading = isLoading) : (downLoading = pagination);

  return (
    <Fragment>
      <div>
        <p className="changeScrolltoPagination">
          Switch to:
          <input className="switchPagination" type="button" defaultValue={isSwitch} onClick={switchPagin} />
        </p>
      </div>
      <div className="wrapper" style={{ order: orderSet }}>
        {item}
      </div>
      <div>{downLoading}</div>
      <img className="toTopScroll" src="./image/circle-arrow-up-solid.svg" alt="picture" onClick={toTop} />
    </Fragment>
  );
};

export default Main;
