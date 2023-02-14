import { Fragment, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { toast } from "react-toastify";
import axios from "axios";
import "../gameStore/gameStorePage.scss";

let initialGamesCardsArray = [];

//* ("GameStorePage") uses the hooks "useState" and "useLocation" and "useHistory".
//* The component has a state called "gameCardArr" which is initially set to the value of "initialGamesCardsArray".
//* It also has two other states, "filterInput" and "categoryFilter", which are used to filter the game cards.
//* The "useLocation" hook is used to access the current location object and the "useHistory" hook is used to navigate the user to different pages.
const GameStorePage = () => {
  const [gameCardArr, setGameCardArr] = useState(initialGamesCardsArray);
  const [filterInput, setFilterInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const location = useLocation();
  const history = useHistory();

  //* This useEffect hook is used to fetch all the game cards from the server when the component is first rendered.
  //* It uses the axios to send a GET request to the ('/games/') endpoint and receives the game card data in the response.
  //* The received data is then stored in the initialGamesCardsArray variable and the state gameCardArr is also updated with the received data.
  //* The data received from the server is also logged to the console for debugging purposes.
  //* This effect only runs once when the component is first rendered because of the empty dependency array.
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/games/");
        initialGamesCardsArray = data.allGamecards;
        setGameCardArr(initialGamesCardsArray);
      } catch (err) {}
    })();
  }, []);

  //* This useEffect hook is used to handle the filtering, sorting, and categorizing of the game cards that are displayed on the page.
  //* It makes use of the location and initialGamesCardsArray state variables.
  //* The hook runs every time the location changes, which occurs when the user makes changes to the filter, category, and sort parameters in the URL.
  //* The hook first creates a new URLSearchParams object from the location.
  //* search property, which is used to extract the filter, category, and sort parameters from the URL.
  //* Then it creates a newFilteredArr variable which is used to store the filtered and sorted game cards.
  //* If the category parameter is present in the URL, the hook filters the initialGamesCardsArray based on the category and assigns the result to the newFilteredArr.
  //* If the filter parameter is present in the URL, the hook filters the newFilteredArr based on the filter and assigns the result to the newFilteredArr.
  //* If the sort parameter is present in the URL, the hook sorts the newFilteredArr based on the sort parameter and assigns the result to the newFilteredArr.
  //* Finally, if the newFilteredArr is not empty, it sets the gameCardArr state variable to newFilteredArr.
  //* This causes the component to re-render and display the filtered and sorted game cards on the page.
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

  //* The function checks if the key pressed is the Enter key.
  //* If it is, the function creates a new URLSearchParams object using the current location's search property.
  //* It then sets the "filter" parameter to the current value of the filterInput state.
  //* It then updates the browser's URL by calling the push method on the history object, passing in a string with the new URL, including the updated query parameters.
  const handleInputKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParmas = new URLSearchParams(location.search);
      qParmas.set("filter", filterInput);
      history.push(`/storepage?${qParmas.toString()}`);
    }
  };

  //* The function (handleCategoryFilter) is a callback that is called when the value of a select element is changed.
  //* It updates the state categoryFilter with the new value selected by the user.
  //* The event object is passed as an argument and the value of the select element is accessed using (ev.target.value).
  //* This allows the component to keep track of the selected category and use it to filter the game cards accordingly.
  const handleCategoryFilter = (ev) => {
    setCategoryFilter(ev.target.value);
  };

  //* This useEffect function is used to handle the category filtering feature on the store page.
  //* When the category filter is changed (by calling the handleCategoryFilter function), this useEffect function is triggered.
  //* It creates a new URLSearchParams object, which is used to update the URL query parameters.
  //* Specifically, it sets the "category" query parameter to the current value of categoryFilter.
  //* Finally, it pushes the updated URL to the browser's history, which updates the URL without causing a full page reload.
  //* This allows the user to see the filtered results without refreshing the page.
  useEffect(() => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("category", categoryFilter);
    history.push(`/storepage?${qParmas.toString()}`);
  }, [categoryFilter]);

  //* ascending sort button #1.
  //* The function retrieves the current search parameters from the browser's URL using the URLSearchParams object,
  //* sets the "sort" parameter to "asc" and updates the URL using the (history.push) method,
  //* so the page will navigate to the (/librarypage) path with the updated parameters.
  //* This allows the user to sort the games in the library in ascending order.
  const handleSortASCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "asc");
    history.push(`/storepage?${qParmas.toString()}`);
  };
  //* descending sort button #2.
  //* The function retrieves the current search parameters from the browser's URL using the URLSearchParams object,
  //* sets the "sort" parameter to "asc" and updates the URL using the (history.push) method,
  //* so the page will navigate to the (/librarypage) path with the updated parameters.
  //* This allows the user to sort the games in the library in descending order.
  const handleSortDESCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "desc");
    history.push(`/storepage?${qParmas.toString()}`);
  };

  //* This function is handling the change event of an input element, search or filter input.
  //* It takes the event as an argument and calls the setFilterInput function, which updates the filterInput state variable with the current value of the input element.
  //* This allows the component to keep track of the current value of the input and use it for filtering or searching.
  const handleFindInputOnChange = (event) => {
    setFilterInput(event.target.value);
  };

  //* The handleGameCardDelete function is an async function that makes a DELETE request to the backend server to delete a game card with a specific ID.
  //* It then updates the initialGamesCardsArray and gameCardArr state by removing the game card that has been deleted, so that the game card is no longer displayed.
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

  //* The useEffect logs the gameCardArr state to the console, and it will be re-run every time the GameCardComponent changes.
  useEffect(() => {
    // console.log(gameCardArr);
  }, [GameCardComponent]);

  return (
    <Fragment>
      <h1>welcome to our store</h1>
      <img
        src="../../../images/controller-storepage.jpg"
        style={{ aspectRatio: "4 / 1", objectFit: "cover" }}
      />
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
            <option selected>Category</option>
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
    </Fragment>
  );
};

export default GameStorePage;
