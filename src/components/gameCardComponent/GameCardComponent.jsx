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

import "../../components/gameCardComponent/GameCardComponent.scss";
import { icons } from "react-icons";

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
      console.log(wishListArr);
      let { data } = await axios.patch(`/user/${userInfo.id}`, {
        wishList: wishListArr,
      });
      localStorage.setItem("token", data);
      console.log(data);

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
    } catch (err) {
      console.log(err);
    }
    // const heartIcon = document.querySelector(".heart-icon");

    // heartIcon.addEventListener("click", (e) => {
    //   heartIcon.classList.toggle("liked");
    // });
  };

  return (
    <div className="col">
      <div className="card">
        <img
          src={img}
          className="card-img-top h-auto"
          alt={name}
          style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text">
            Name: <span>{name}</span>
          </p>
          <p className="card-text">
            Description: <span>{description}</span>
          </p>
          <p className="card-text">
            Price: <span>{price}$</span>
          </p>
          <p className="card-text">
            Release Date: <span>{releaseDate}</span>
          </p>
        </div>
        <div className="card-body">
          {userInfo.isAdmin ? ( // if the user is admin then display this buttons
            <Fragment>
              <button
                type="button"
                className="btn btn-outline-light ms-1"
                onClick={handleFavGameClick(id)}
              >
                add
                <FontAwesomeIcon icon={faBookmark} />
              </button>

              <Link to={`/editgamecard/${id}`} className="btn btn-outline-dark">
                Edit
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>

              {pathname == "/storepage" ? (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleDeleteBtnClick}
                >
                  Delete
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              ) : (
                ""
              )}
              {/* {pathname == "/storepage" ? (
                <div className="like-button">
                  <div className="heart-bg">
                    <div
                      className="heart-icon"
                      onClick={handleFavGameClick(id)}
                    ></div>
                  </div>
                </div>
              ) : (
                ""
              )} */}
              {pathname == "/librarypage" ? (
                <button
                  type="button"
                  className="btn btn-danger ms-1"
                  onClick={() => {
                    onDelete();
                    console.log("hey", index);
                  }}
                >
                  remove
                  <FontAwesomeIcon icon={faTrashCan} />
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
                more info
                <FontAwesomeIcon icon={faBookmark} />
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
                  className="btn btn-outline-light ms-1"
                  onClick={onDelete}
                >
                  remove
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light ms-1"
                  onClick={handleFavGameClick(id)}
                >
                  add library
                  <FontAwesomeIcon icon={faBookmark} />
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
