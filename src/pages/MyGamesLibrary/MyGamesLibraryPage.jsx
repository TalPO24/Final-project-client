import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Fragment, useState } from "react";
import { authActions } from "store/auth";
import { toast } from "react-toastify";
import "../MyGamesLibrary/MyGamesLibrary.scss";


const LibraryPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [gameCardArr, setGameCardArr] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (userInfo && userInfo.wishList) setGameCardArr(userInfo.wishList);
  }, [userInfo]);


  useEffect(() => {
    if (userInfo && userInfo.wishList) {
      const qParmas = new URLSearchParams(location.search);
      let newFilteredArr = undefined;
      if (qParmas.has("category")) {
        let category = qParmas.get("category");
        if (category != "Category") {
          let regex = new RegExp(category, "i");
          newFilteredArr = JSON.parse(JSON.stringify(userInfo.wishList));
          newFilteredArr = newFilteredArr.filter((game) =>
            regex.test(game.gameCategory)
          );
          if (category !== categoryFilter) {
            setCategoryFilter(category);
          }
        } else {
          newFilteredArr = JSON.parse(JSON.stringify(userInfo.wishList));
        }
      }
      if (qParmas.has("filter")) {
        let filter = qParmas.get("filter");
        let regex = new RegExp(filter, "i");
        newFilteredArr = JSON.parse(JSON.stringify(userInfo.wishList));
        newFilteredArr = newFilteredArr.filter((game) =>
          regex.test(game.gameName)
        );
        if (filter !== filterInput) {
          setFilterInput(filter);
        }
      }
      if (qParmas.has("sort")) {
        if (!newFilteredArr) {
          newFilteredArr = JSON.parse(JSON.stringify(userInfo.wishList));
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
    }
  }, [location, userInfo]);

  
  const handleInputKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParmas = new URLSearchParams(location.search);
      qParmas.set("filter", filterInput);
      history.push(`/librarypage?${qParmas.toString()}`);
    }
  };

  
  const handleCategoryFilter = (ev) => {
    setCategoryFilter(ev.target.value);
  };

  
  useEffect(() => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("category", categoryFilter);
    history.push(`/librarypage?${qParmas.toString()}`);
  }, [categoryFilter]);

  
  const handleSortASCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "asc");
    history.push(`/librarypage?${qParmas.toString()}`);
  };

  const handleSortDESCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "desc");
    history.push(`/librarypage?${qParmas.toString()}`);
  };


  const handleFindInputOnChange = (event) => {
    setFilterInput(event.target.value);
  };

 
  const handleGameCardDelete = (id) => async () => {
    try {
      const newArr = JSON.parse(JSON.stringify(gameCardArr));

      newArr.splice(id, 1);
      const { data } = await axios.patch(`/user/${userInfo.id}`, {
        wishList: newArr,
      });
      localStorage.setItem("token", data);
      dispatch(authActions.removeFromWishList(newArr));
      setGameCardArr(newArr);
      toast("you removed the card from your library", {
        position: "bottom-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "dark",
      });
    } catch (error) {
      toast.error(" somthing went wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {}, [GameCardComponent]);

  return (
    <Fragment>
      <h1>My library</h1>
      <img
        src="../../../images/controller-librarypage.jpg"
        style={{ aspectRatio: "4 / 1", objectFit: "cover" }}
      />

      <div className="row align-games-center">
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
            defaultValue={categoryFilter}
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
      </div>
      <hr></hr>
      <h1>{`${
        categoryFilter == "Category" ? "All" : categoryFilter
      } games`}</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {userInfo && gameCardArr.length > 0
          ? gameCardArr.map((game, index) => {
              if (
                game.gameCategory == categoryFilter ||
                categoryFilter == "Category"
              ) {
                return (
                  <GameCardComponent
                    key={"game" + game._id + index}
                    name={game.gameName}
                    img={game.gameImg}
                    description={game.gameDescription}
                    price={game.gamePrice}
                    releaseDate={game.gameReleaseDate}
                    gameMoreInfo={game.gameMoreInfo}
                    id={game._id}
                    onDelete={handleGameCardDelete(index)}
                    index={index}
                  />
                );
              }
            })
          : ""}
      </div>
    </Fragment>
  );
};

export default LibraryPage;
