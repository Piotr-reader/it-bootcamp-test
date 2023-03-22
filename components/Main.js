
import React, { useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import { useDispatch } from "react-redux";

const Main = (props) => {
  const [fetching, setFetching] = useState(true)
  const [result, setResult] = useState([])
  const dataQuestions = useSelector((state) => state.dataQuestions);
  const dataPage = useSelector((state) => state.dataPage);
  const dataInfo = useSelector((state) => state.dataInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    let url = "https://rickandmortyapi.com/api/character";
    if (dataPage>1) {
      url = dataInfo.next;
    }
    if (fetching) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: "dataQuestions",
            dataQuestions: [...dataQuestions,...json.results],
          });
          dispatch({
            type: "dataInfo",
            dataInfo: json.info,
          });
          dispatch({
            type: "dataPage",
            currentPage: dataPage+1,
          });
        })
        .finally(()=> setFetching(false));
    }
  }, [fetching]);

  useEffect(()=> {
      document.addEventListener("scroll",scrollHandler)
      return function() {
        document.removeEventListener("scroll",scrollHandler)
      }
    },[])
const scrollHandler = (e) => {
  const documentRect = document.documentElement.getBoundingClientRect();
      if (documentRect.bottom < document.documentElement.clientHeight+1) {
          setFetching(true)
  }
}
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
    window.scrollTo(0,0)
  }

  return <Fragment>
    {item}
    <img className="loading" src="./image/discord-loading-dots-discord-loading.gif" alt="loading" />
    <img className="toTopScroll" src="./image/circle-arrow-up-solid.svg" alt="picture" onClick={toTop}/>
    </Fragment>;
};

export default Main;
