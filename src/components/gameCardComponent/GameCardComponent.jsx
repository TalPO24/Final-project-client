import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
// import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { authActions } from "store/auth";
import { toast } from "react-toastify";
import "../../components/gameCardComponent/GameCardComponent.scss";

//*  instead of props we used here object destructuring for the father child communication
const GameCardComponent = ({
  name,
  img,
  description,
  price,
  releaseDate,
  id,
  onDelete,
  index,
  gameCategory,
}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  const { pathname } = useLocation();

  const handleFavGameClick = (productId) => async () => {
    try {
      const wishListArr = userInfo.wishList.map((product) => product._id);
      wishListArr.push(productId);
      let { data } = await axios.patch(`/user/${userInfo.id}`, {
        wishList: wishListArr,
      });
      localStorage.setItem("token", data);
      dispatch(
        authActions.addToWishList({
          gameDescription: description,
          gameImg: img,
          gameName: name,
          gamePrice: price,
          gameReleaseDate: releaseDate,
          gameCategory: gameCategory,
          _id: productId,
        })
      );
      toast("Added to library", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "dark",
      });
    } catch (err) {
      toast("somthing went wring", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "dark",
      });
    }
  };

  return (
    <div className="col">
      <div className="card">
        <img
          src={img}
          className="card-img-top h-auto ms-3"
          alt={name}
          style={{ aspectRatio: "3 / 3", objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text ms-4 mb-3">
            Name: <span>{name}</span>
          </p>
          <p className="card-text ms-4 mb-3">
            Description: <span>{description}</span>
          </p>
          <p className="card-text ms-4 mb-3">
            Price: <span>{price}$</span>
          </p>
          <p className="card-text ms-4 mb-3">
            Release Date: <span>{releaseDate}</span>
          </p>
        </div>
        <div className="card-body">
          {userInfo.isAdmin ? ( // if the user is admin then display this buttons
            <Fragment>
              <Link
                to={`/editgamecard/${id}`}
                className="btn btn-outline-dark ms-3 mb-4"
              >
                Edit
                <FontAwesomeIcon className="FontIcon" icon={faPenToSquare} />
              </Link>

              <button
                type="button"
                className="btn btn-outline-dark ms-3 mb-4"
                onClick={handleFavGameClick(id)}
              >
                Add to library
                <FontAwesomeIcon className="FontIcon" icon={faBookmark} />
              </button>

              {pathname == "/storepage" ? (
                <button
                  type="button"
                  className="btn btn-outline-dark ms-3 mb-4"
                  onClick={handleDeleteBtnClick}
                >
                  Delete
                  <FontAwesomeIcon className="FontIcon" icon={faTrashCan} />
                </button>
              ) : (
                ""
              )}

              {pathname == "/librarypage" ? (
                <button
                  type="button"
                  className="btn btn-outline-dark ms-3"
                  onClick={() => {
                    onDelete();
                  }}
                >
                  Remove
                  <FontAwesomeIcon className="FontIcon" icon={faTrashCan} />
                </button>
              ) : (
                ""
              )}
            </Fragment>
          ) : (
            <Fragment>
              <button
                type="button"
                className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target={`#f${index}`}
              >
                More Info
                <FontAwesomeIcon className="FontIcon" icon={faBookmark} />
              </button>
              <div
                className="modal fade"
                id={`f${index}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <img
                        src={img}
                        className="card-img-top h-auto"
                        alt={name}
                        style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
                      />
                    </div>
                    <div className="modal-body">
                      <p className="card-text text-dark">Name:{name}</p>
                      <p className="card-text text-dark">
                        Description: {description}
                      </p>
                      <p className="card-text text-dark">Price: {price}$</p>
                      <p className="card-text text-dark">
                        Release Date: {releaseDate}
                      </p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {pathname == "/librarypage" ? (
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={onDelete}
                >
                  Remove
                  <FontAwesomeIcon className="FontIcon" icon={faTrashCan} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleFavGameClick(id)}
                >
                  Add to library
                  <FontAwesomeIcon className="FontIcon" icon={faBookmark} />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCardComponent;
