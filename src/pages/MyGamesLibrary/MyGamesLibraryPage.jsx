import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Fragment, useState } from "react";
import "../MyGamesLibrary/MyGamesLibrary.scss";
import { authActions } from "store/auth";
import { toast } from "react-toastify";

//* useSelector is used to get the loggedIn and userInfo state from the Redux store.
//* useState is used to initialize two variables: gameCardArr and filterInput.
//* useLocation is used to get the current location object from React Router.
//* useHistory is used to navigate between pages using the history.push() method.
//* useDispatch is used to dispatch actions to the Redux store.
const LibraryPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [gameCardArr, setGameCardArr] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  //* the code inside the callback function checks if the userInfo variable is truthy and if it has a wishList property.
  //* If both of those conditions are true, it then calls setGameCardArr to update the component's gameCardArr state variable with the value of (userInfo.wishList).
  //*In other words, this useEffect is to set the gameCardArr to the wishlist of the user when userInfo is updated.
  useEffect(() => {
    if (userInfo && userInfo.wishList) setGameCardArr(userInfo.wishList);
  }, [userInfo]);

  //* the useEffect first checks that the userInfo and (userInfo.wishList) are truthy.
  //* If they are, it creates a new URLSearchParams object using the (location.search value).
  //* Then it checks if the URLSearchParams object has a "filter" parameter.
  //* If it does, it assigns the value of that parameter to the filter variable and creates a regular expression object that matches the filter input in a case-insensitive way.
  //* It then creates a new array newFilteredArr that is a deep copy of (userInfo.wishList) and filters this array based on the regular expression filter.
  //* then, it compares filter to filterInput and if they are different, it updates the state using setFilterInput(filter).
  //* then is checking if the userInfo and userInfo.wishList objects exist.
  //* If they do, it then creates a new URLSearchParams object based on the current location, which is used to check if the query string contains a "filter" or "sort" parameter.
  //* If the "filter" parameter is present, it sets a newFilteredArr variable to a filtered version of (userInfo.wishList), where each game's gameName property is matched against the "filter" parameter using a regular expression.
  //* If the "sort" parameter is present, it sorts newFilteredArr in ascending or descending order based on the value of "sort" parameter.
  //* Finally, if newFilteredArr is defined, it sets the state of gameCardArr to the newFilteredArr, which will trigger a re-render of the component and update the view with the filtered and sorted data.
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

  //* The function checks if the key pressed is the Enter key.
  //* If it is, the function creates a new URLSearchParams object using the current location's search property.
  //* It then sets the "filter" parameter to the current value of the filterInput state.
  //* It then updates the browser's URL by calling the push method on the history object, passing in a string with the new URL, including the updated query parameters.
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

  //* ascending sort button #1.
  //* The function retrieves the current search parameters from the browser's URL using the URLSearchParams object, sets the "sort" parameter to "asc" and updates the URL using the (history.push) method,
  //* so the page will navigate to the (/librarypage) path with the updated parameters.
  //* This allows the user to sort the games in the library in ascending order.
  const handleSortASCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "asc");
    history.push(`/librarypage?${qParmas.toString()}`);
  };
  //* descending sort button #2.
  //* The function retrieves the current search parameters from the browser's URL using the URLSearchParams object, sets the "sort" parameter to "asc" and updates the URL using the (history.push) method,
  //* so the page will navigate to the (/librarypage) path with the updated parameters.
  //* This allows the user to sort the games in the library in descending order.
  const handleSortDESCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "desc");
    history.push(`/librarypage?${qParmas.toString()}`);
  };

  //* this function takes an event as a parameter and sets the value of the "filterInput" state using the value of the target element of the event (event.target.value).
  //* This is likely used as an onChange event handler for an input element, allowing the user to filter a list of games based on the input.
  const handleFindInputOnChange = (event) => {
    setFilterInput(event.target.value);
  };

  //* this function takes in an id as a parameter.
  //* Inside the function, it makes a deep copy of the current gameCardArr using JSON.parse(JSON.stringify(gameCardArr)), and then it uses the splice method to remove the element of the array with the corresponding id.
  //* Then it makes a patch request to a specific endpoint ('/user/:id') with the updated wishList array.
  //* It then dispatches an action to remove the game from the wishList in the application state and updates the gameCardArr state.
  //* If there's any error in the process, it will show an error toast message.
  const handleGameCardDelete = (id) => async () => {
    try {
      const newArr = JSON.parse(JSON.stringify(gameCardArr));

      newArr.splice(id, 1);
      const { data } = await axios.patch(`/user/${userInfo.id}`, {
        wishList: newArr,
      });
      console.log(newArr);
      localStorage.setItem("token", data);

      dispatch(authActions.removeFromWishList(newArr));
      setGameCardArr(newArr);
    } catch (error) {
      console.log(error);
      toast.error(" somthing went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //* The useEffect logs the gameCardArr state to the console, and it will be re-run every time the GameCardComponent changes.
  useEffect(() => {
    console.log(gameCardArr);
  }, [GameCardComponent]);

  return (
    <Fragment>
      <h1>My library</h1>
      <img
        src="../../../images/controllerLibrary2.jpg"
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
