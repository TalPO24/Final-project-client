import { Fragment, useEffect, useState } from "react";
import "./HomePage.scss";
import "./HomePage2.scss";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

let initialGamesCardsArray = [];

//* The useEffect hook is used to fetch data from the server when the component is first rendered.
//* It makes a GET request to the "/games" endpoint, and if the request is successful, it takes the first 4 items of the ("data.allGamecards") array and pushes them into the ("initialGamesCardsArray") array.
//* Then it sets the state of "gameCardArr" to "initialGamesCardsArray".
//* If there is an error in the request, it will throw an error message on the screen.
const HomePage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [gameCardArr, setGameCardArr] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/games");
        initialGamesCardsArray = [];
        for (let i = 0; i < 4; i++) {
          initialGamesCardsArray.push(data.allGamecards[i]);
        }
        setGameCardArr(initialGamesCardsArray);
      } catch (err) {
        toast.error("😭 Something went wrong", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })();
  }, []);

  useEffect(() => {}, [GameCardComponent]);

  return (
    <Fragment>
      <div className="w-100 d-flex justify-content-center">
        <div className="title-wrapper">
          <h2>{"welcome " + userInfo?.name}</h2>
          <div className="overlay"></div>
        </div>
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {gameCardArr.length > 0 &&
            gameCardArr.map((item, idx) => (
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={`${idx}`}
                className={0 == idx ? `active` : ""}
                aria-current="true"
                aria-label={`Slide ${idx + 1}`}
                key={idx}
              ></button>
            ))}
        </div>
        <div className="carousel-inner">
          {gameCardArr.length > 0 &&
            gameCardArr.map((item, idx) => (
              <div
                className={0 === idx ? `carousel-item active` : "carousel-item"}
                key={idx}
              >
                <img
                  src={item.gameImg}
                  className="d-block w-100"
                  alt={item.gameName}
                  style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block"></div>
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <img
        src="../../../images/freeGames.png"
        className="img-fluid"
        alt="free games pic"
        style={{ aspectRatio: "4 / 1", objectFit: "cover" }}
      />
      <Link to={"/storepage"} className="button1">
        <span>check our store</span>
      </Link>

      <img
        className="imgController"
        src="../../../images/pacman.jpg"
        style={{ aspectRatio: "5 / 1", objectFit: "cover" }}
      />
      <h3>LIST OF THE TOP 5 GAMES</h3>

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="../../../images/minecraft2.jpg"
              className="d-block w-100"
              alt="img1"
              style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/counter-strike.png
      "
              className="d-block w-100"
              alt="img2"
              style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/fortnite.jpg"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/lol.jpg"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/cod2.jpg"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "2 / 1", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </Fragment>
  );
};

export default HomePage;
