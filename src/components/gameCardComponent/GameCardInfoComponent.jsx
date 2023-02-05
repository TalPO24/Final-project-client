import { useEffect, useState } from "react";
import axios from "axios";
import GameCardComponent from "components/gameCardComponent/GameCardComponent";
import { useParams } from "react-router-dom";

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
