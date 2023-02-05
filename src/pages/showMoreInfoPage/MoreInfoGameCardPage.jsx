import { useEffect, useState } from "react";
import axios from "axios";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { useParams } from "react-router-dom";

//* this function uses the React Hooks useState and useEffect.
//* The component has a state variable called ("gameCard") that is initially set to null.
//* The component also destructures the "id" variable from the useParams hook.
//* In the useEffect hook, an anonymous asynchronous function is defined that makes a GET request to the endpoint ('/games/getbyid/:id') using axios,
//* where ':id' is passed to the function as a variable, which is coming from the useParams hook.
//* The response data is then set to the "gameCard" state variable.
//* If an error occurs, it is caught and not handled in this code snippet.
//* This useEffect hook runs only once when the component mounts and it uses the empty dependency array to make sure that it only runs once.
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
    gameCard && (
      <GameCardComponent
        name={gameCard.gameName}
        price={gameCard.gamePrice}
        releaseDate={gameCard.gameReleaseDate}
        img={gameCard.gameImg}
        desc={gameCard.gameDescription}
        id={gameCard._id}
      ></GameCardComponent>
    )
  );
};

export default MoreInfoGameCardPage;
