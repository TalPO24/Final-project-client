import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

//* This function declares a state variable gameCardData which is used to store the data of the game card being edited.
//* It uses the useParams hook to extract the id of the game card from the URL.
//* It also uses the useEffect hook to fetch the data of the game card from the server using an async/await function,
//* which makes a GET request to the endpoint /games/getbyid/${id} where id is the id of the game card being edited.
//* The response data is then set to the gameCardData state using the setGameCardData function.
//* If the API call fails and throws an error, it logs the error to the console.
//* It runs only once and it is triggered when the component is first rendered.
//* It is fetching the data from the server and updating the state.
const EditGameCardPage = () => {
  const [gameCardData, setGameCardData] = useState({
    gameName: "",
    gameDescription: "",
    gameReleaseDate: "",
    gamePrice: "",
    gameImg: "",
    gameCategory: "",
  });
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/games/getbyid/${id}`);
        setGameCardData({
          gameName: data.gameName,
          gameDescription: data.gameDescription,
          gameReleaseDate: data.gameReleaseDate,
          gamePrice: data.gamePrice,
          gameImg: data.gameImg,
          gameCategory: data.gameCategory,
        });
      } catch (err) {
        // console.log(err);
      }
    })();
  }, []);

  //* The function takes an event object (ev) as a parameter, which is passed from the input fields when there is a change in the value.
  //* It then creates a new variable (newgameCardInput) which is a deep copy of the current gameCardData state using JSON.stringify and JSON.parse.
  //* It then checks if the (newgameCardInput) object has a property that matches the id of the input field that triggered the change event,
  //* if so it updates the value of that property to the new value entered in the input field, and then it updates the gameCardData state with the new input value.
  const handleGameCardInputChange = (ev) => {
    let newgameCardInput = JSON.parse(JSON.stringify(gameCardData));
    if (newgameCardInput.hasOwnProperty(ev.target.id)) {
      newgameCardInput[ev.target.id] = ev.target.value;
      setGameCardData(newgameCardInput);
    }
  };

  //* The function calls the setGameCardInput function with a callback function as an argument.
  //* The callback function takes the previous gameCardInput state and updates the gameCategory property with the value of the checkbox which is ev.target.value,
  //* then it returns a new state object which is a copy of the previous state with the spread operator ...prev.
  //* This allows the component to keep track of the current input values in the form fields, including the value of the checkbox which represents the gameCategory.
  const handleCheckBox = (ev) => {
    setGameCardData((prev) => {
      prev.gameCategory = ev.target.value;
      return {
        ...prev,
      };
    });
  };
  //* This useEffect hook will log the current state of gameCardData to the console whenever it updates.
  useEffect(() => {
    // console.log(gameCardData);
  }, [gameCardData]);

  //* The handleFormSubmit function is an asynchronous function that is triggered when the form is submitted.
  //* It first prevents the default form submission behavior by calling (event.preventDefault()).
  //* It then makes a PATCH request to the server, passing in the gameCardData object as the data to be updated in the server.
  //* If the request is successful, it displays a toast message with the text "you have successfuly edited the card".
  //* If the request fails, it displays a toast message with the text "somthing went wrong".
  const handleFormSUbmit = async (event) => {
    event.preventDefault();
    //! need to add joi validation !!
    try {
      let { data } = await axios.patch(`/games/${id}`, gameCardData);

      toast("you have successfuly edited the card", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("somthing went wrong", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <form onSubmit={handleFormSUbmit}>
      <h1>Edit game card page </h1>
      <div className="mb-3">
        <label htmlFor="gameName" className="form-label">
          Game Name
        </label>
        <input
          type="text"
          className="form-control"
          id="gameName"
          onChange={handleGameCardInputChange}
          value={gameCardData.gameName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gameDescription" className="form-label">
          Game Description
        </label>
        <input
          type="text"
          className="form-control"
          id="gameDescription"
          onChange={handleGameCardInputChange}
          value={gameCardData.gameDescription}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gameReleaseDate" className="form-label">
          Game Release Date
        </label>
        <input
          type="text"
          className="form-control"
          id="gameReleaseDate"
          onChange={handleGameCardInputChange}
          value={gameCardData.gameReleaseDate}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gamePrice" className="form-label">
          Game Price
        </label>
        <input
          type="text"
          className="form-control"
          id="gamePrice"
          onChange={handleGameCardInputChange}
          value={gameCardData.gamePrice}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="gameImg" className="form-label">
          Game Image
        </label>
        <input
          type="text"
          className="form-control"
          id="gameImg"
          onChange={handleGameCardInputChange}
          value={gameCardData.gameImg}
        />
      </div>
      <label className="form-check-label" htmlFor="flexRadioDefault1">
        Game category
      </label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          onClick={handleCheckBox}
          value="Action"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Action
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          onClick={handleCheckBox}
          value="Strategy"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Strategy
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault3"
          onClick={handleCheckBox}
          value="RPG"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
          RPG
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault3"
          onClick={handleCheckBox}
          value="Adventure"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
          Adventure
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault3"
          onClick={handleCheckBox}
          value="Racing"
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
          Racing
        </label>
      </div>

      <button type="submit" className="btn btn-outline-light">
        Submit
      </button>
    </form>
  );
};

export default EditGameCardPage;
