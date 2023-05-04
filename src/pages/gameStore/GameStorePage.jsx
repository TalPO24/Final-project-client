import { Fragment, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { toast } from "react-toastify";
import axios from "axios";
import "../gameStore/gameStorePage.scss";

let initialGamesCardsArray = [];


const GameStorePage = () => {
  const [gameCardArr, setGameCardArr] = useState(initialGamesCardsArray);
  const [filterInput, setFilterInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/games/");
        initialGamesCardsArray = data.allGamecards;
        setGameCardArr(initialGamesCardsArray);
      } catch (err) {}
    })();
  }, []);

  
  useEffect(() => {
    const qParmas = new URLSearchParams(location.search);
    let newFilteredArr = undefined;
    if (qParmas.has("category")) {
      let category = qParmas.get("category");
      if (category != "Category") {
        let regex = new RegExp(category, "i");
        newFilteredArr = JSON.parse(JSON.stringify(initialGamesCardsArray));
        newFilteredArr = newFilteredArr.filter((item) =>
          regex.test(item.gameCategory)
        );
        if (category !== categoryFilter) {
          setCategoryFilter(category);
        }
      } else {
        newFilteredArr = JSON.parse(JSON.stringify(initialGamesCardsArray));
      }
    }
    if (qParmas.has("filter")) {
      let filter = qParmas.get("filter");
      let regex = new RegExp(filter, "i");
      newFilteredArr = newFilteredArr.filter((item) =>
        regex.test(item.gameName)
      );
      if (filter !== filterInput) {
        setFilterInput(filter);
      }
    }
    if (qParmas.has("sort")) {
      if (!newFilteredArr) {
        newFilteredArr = JSON.parse(JSON.stringify(initialGamesCardsArray));
      }
      if (qParmas.get("sort") === "asc") {
        newFilteredArr.sort((a, b) => {
          let x = a.gamePrice;
          let y = b.gamePrice;
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        });
      }
      if (qParmas.get("sort") === "desc") {
        newFilteredArr.sort((a, b) => {
          let x = a.gamePrice;
          let y = b.gamePrice;
          if (x > y) return -1;
          if (x < y) return 1;
          return 0;
        });
      }
    }
    if (newFilteredArr) setGameCardArr(newFilteredArr);
  }, [location, initialGamesCardsArray]);

 
  const handleInputKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParmas = new URLSearchParams(location.search);
      qParmas.set("filter", filterInput);
      history.push(`/storepage?${qParmas.toString()}`);
    }
  };

  
  const handleCategoryFilter = (ev) => {
    setCategoryFilter(ev.target.value);
  };

  
  useEffect(() => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("category", categoryFilter);
    history.push(`/storepage?${qParmas.toString()}`);
  }, [categoryFilter]);

  
  const handleSortASCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "asc");
    history.push(`/storepage?${qParmas.toString()}`);
  };
  
  const handleSortDESCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "desc");
    history.push(`/storepage?${qParmas.toString()}`);
  };

  
  const handleFindInputOnChange = (event) => {
    setFilterInput(event.target.value);
  };

 
  const handleGameCardDelete = async (id) => {
    try {
      const data = await axios.delete(`/games/${id}`);
      initialGamesCardsArray = initialGamesCardsArray.filter(
        (item) => item._id !== id
      );
      setGameCardArr(initialGamesCardsArray);
      toast("you deleted the game card", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "dark",
      });
    } catch (error) {
      toast("somthing went wrong", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "dark",
      });
    }
  };

  useEffect(() => {}, [GameCardComponent]);

  return (
    <Fragment>
      <h1>welcome to our store</h1>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
            src="../../../images/cod2.jpg"
              className="d-block w-100"
              alt="img1"
              style={{ aspectRatio: "6 / 2", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
            src="../../../images/minecraft2.jpg"
          
              className="d-block w-100"
              alt="img2"
              style={{ aspectRatio: "6 / 2", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/fortnite.jpg"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "6 / 2", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="../../../images/lol.jpg"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "6 / 2", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
             src="../../../images/counter-strike.png"
              className="d-block w-100"
              alt="img3"
              style={{ aspectRatio: "6 / 2", objectFit: "cover" }}
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
      <div className="row align-items-center">
        <div className="col-sm-4">
          <p className="p2">search by name :</p>

          <input
            type="text"
            id="floatingInput"
            className="form-control"
            placeholder="Search"
            onKeyUp={handleInputKeyUp}
            value={filterInput}
            onChange={handleFindInputOnChange}
          />
        </div>
        <div className="col-sm-4">
          <p className="p4">sort by price :</p>
          <div className="sort">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleSortASCClick}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleSortDESCClick}
            >
              ↓
            </button>
          </div>
        </div>

        <div className="col-sm-4">
          <p className="p3">search by category :</p>
          <select
            className="form-select"
            aria-label="Default select example"
            value={categoryFilter}
            onChange={handleCategoryFilter}
          >
            <option>Category</option>
            <option>Action</option>
            <option>Strategy</option>
            <option>RPG</option>
            <option>Adventure</option>
            <option>Racing</option>
          </select>
        </div>
        <hr></hr>
        <h1>{`${
          categoryFilter == "Category" ? "All" : categoryFilter
        } games`}</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {gameCardArr.length > 0
            ? gameCardArr.map((item, index) => {
                if (
                  item.gameCategory == categoryFilter ||
                  categoryFilter == "Category"
                ) {
                  return (
                    <GameCardComponent
                      key={"game" + item._id}
                      name={item.gameName}
                      img={item.gameImg}
                      description={item.gameDescription}
                      price={item.gamePrice}
                      releaseDate={item.gameReleaseDate}
                      gameCategory={item.gameCategory}
                      id={item._id}
                      onDelete={handleGameCardDelete}
                      index={index}
                    />
                  );
                }
              })
            : ""}
        </div>
      </div>
      <a href="/librarypage" className="button1">
  <span>Go to your library</span>
</a>
    </Fragment>
  );
};

export default GameStorePage;
