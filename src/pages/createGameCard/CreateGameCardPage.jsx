import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../pages/createGameCard/CreateGameCard.scss";

//* This function uses the useState hook to create a state variable called gameCardInput which is an object with several properties:
//* gameName, gameDescription, gameReleaseDate, gamePrice, gameImg, and gameCategory.
//* These properties are all initialized to an empty string.
const CreateGameCardPage = () => {
  const [gameCardInput, setGameCardInput] = useState({
    gameName: "",
    gameDescription: "",
    gameReleaseDate: "",
    gamePrice: "",
    gameImg: "",
    gameMoreInfo:"",
    
  });


  const handleCreateGameCardInput = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(gameCardInput));
    newUserInput[event.target.id] = event.target.value;
    setGameCardInput(newUserInput);
  };


  const handleCheckBox = (ev) => {
    setGameCardInput((prev) => {
      prev.gameCategory = ev.target.value;
      return {
        ...prev,
      };
    });
  };

  //* The function calls the preventDefault() method.
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

 
  const handleCreateCardClick = async () => {
    try {
      const res = await axios.post("/games/", {
        gameName: gameCardInput.gameName,
        gameDescription: gameCardInput.gameDescription,
        gameReleaseDate: gameCardInput.gameReleaseDate,
        gamePrice: gameCardInput.gamePrice,
        gameImg: gameCardInput.gameImg,
        gameCategory: gameCardInput.gameCategory,
      });
      toast("you have successfuly created a new game card 😀", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      toast.error("somthing went wrong 😓", {
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

  useEffect(() => {}, [gameCardInput]);

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Create your game card</h1>
      <div className="mb-1">
        <label htmlFor="gameNameInput" className="form-label">
          Game Name
        </label>
        <input
          type="text"
          className="form-control"
          id="gameName"
          value={gameCardInput.gameName}
          onChange={handleCreateGameCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="gameDescriptionInput" className="form-label">
          Game Description
        </label>
        <input
          type="text"
          className="form-control"
          id="gameDescription"
          value={gameCardInput.gameDescription}
          onChange={handleCreateGameCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="gameReleaseDateInput" className="form-label">
          Game Release Date
        </label>
        <input
          type="text"
          className="form-control"
          id="gameReleaseDate"
          value={gameCardInput.gameReleaseDate}
          onChange={handleCreateGameCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="gamePriceInput" className="form-label">
          Game Price
        </label>
        <input
          type="text"
          className="form-control"
          id="gamePrice"
          value={gameCardInput.gamePrice}
          onChange={handleCreateGameCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="gameImg" className="form-label">
          Game Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="gameImg"
          value={gameCardInput.gameImg}
          onChange={handleCreateGameCardInput}
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
      <button
        type="submit"
        className="btn btn-success mt-3"
        onClick={handleCreateCardClick}
      >
        Create card
      </button>
    </form>
  );
};

export default CreateGameCardPage;
