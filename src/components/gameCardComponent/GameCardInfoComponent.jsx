import { useEffect, useState } from "react";
import axios from "axios";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { useParams } from "react-router-dom";

//* This code defines a React functional component called MoreInfoGameCardPage. The component uses the useState and useEffect hooks.
//* The useState hook initializes the gameCard state to null.
//* The gameCard state is likely to hold the information for a single game card that will be displayed on the page.
//* The useParams hook from the react-router-dom library is used to extract the id parameter from the URL.
//* The id parameter is likely to be the unique identifier of the game card that is being displayed.
//* The useEffect hook is used to fetch data for the specified game card from the server using an asynchronous axios.get request.
//* The id parameter is used in the request to identify the game card to retrieve.
//* If the request is successful, the data object is used to update the gameCard state with the retrieved game card information.
//* If there is an error, it is caught and not handled in this code.
const MoreInfoGameCardPage = () => {
  const [gameCard, setGameCard] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/games/getbyid/${id}`);
        setGameCard(data);
      } catch (err) {}
    })();
  }, []);
  return (
    <GameCardComponent
      name={gameCard.gameName}
      price={gameCard.gamePrice}
      releaseDate={gameCard.gameReleaseDate}
      img={gameCard.gameImg}
      desc={gameCard.gameDescription}
      id={gameCard._id}
    ></GameCardComponent>
  );
};

export default MoreInfoGameCardPage;
