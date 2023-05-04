import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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
      } catch (err) {}
    })();
  }, []);

  const handleGameCardInputChange = (ev) => {
    let newgameCardInput = JSON.parse(JSON.stringify(gameCardData));
    if (newgameCardInput.hasOwnProperty(ev.target.id)) {
      newgameCardInput[ev.target.id] = ev.target.value;
      setGameCardData(newgameCardInput);
    }
  };

  const handleCheckBox = (ev) => {
    setGameCardData((prev) => {
      prev.gameCategory = ev.target.value;
      return {
        ...prev,
      };
    });
  };

  useEffect(() => {
    // console.log(gameCardData);
  }, [gameCardData]);

  const handleFormSUbmit = async (event) => {
    event.preventDefault();
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

      // Navigate to the store page after successful submission
      history.push("/storepage");
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
