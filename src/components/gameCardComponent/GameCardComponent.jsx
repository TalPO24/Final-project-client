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
import axios from "axios";
import { authActions } from "store/auth";
import { toast } from "react-toastify";
import "../../components/gameCardComponent/GameCardComponent.scss";

//* This code defines a React functional component called GameCardComponent.
//* The component accepts several props, including name, img, description, price, releaseDate, id, onDelete, index, and gameCategory.
//* Inside the component, the useSelector hook from the react-redux library is used to retrieve information from the Redux store.
//* Specifically, the userInfo object is extracted from the auth slice of the store.
//* The useSelector hook takes a function that selects the desired state from the store.
//* In this case, the function takes the state object as an argument and returns state.auth.userInfo.
//* The useDispatch hook is also used to obtain a reference to the Redux store's dispatch function, which is used to dispatch actions to update the store.
//* Without further context or code, it is difficult to determine exactly what this component does or how it is used in the application.
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

  //* This code defines a function called handleDeleteBtnClick, which is likely to be triggered when a delete button is clicked.
  //* The function takes no arguments, but it calls the onDelete function and passes it the id value.
  //* The id value is likely to be the identifier of the game card that is being deleted.
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  //* This code uses the useLocation hook from the react-router-dom library in a React component.
  //* The useLocation hook returns an object that contains information about the current URL location in the browser's address bar.
  //* In this code, the object is destructured to extract the pathname property.
  //* The pathname property is a string that represents the current URL path.
  //* By using this hook and extracting the pathname property,
  //* the code can get information about the current URL path and use it to conditionally render content in the component or to perform other actions based on the current URL path.
  const { pathname } = useLocation();

  //* This code defines a function called handleFavGameClick that takes a productId argument and returns an asynchronous function.
  //* The returned function is likely to be called when the user clicks a button to add a game to their wishlist.
  //* Inside the function, the wishListArr array is created by mapping over the userInfo.wishList array and extracting the _id property of each item.
  //* Then the productId argument is added to the wishListArr array using the push method.
  //* Next, an asynchronous axios.patch request is made to the server to update the user's wishlist.
  //* The userInfo.id property is used to identify the user, and the wishList property is updated with the new wishListArr array.
  //* If the request is successful, the localStorage.setItem method is used to update the user's access token.
  //* The authActions.addToWishList action is dispatched to the Redux store to update the state with the new wishlist item.
  //* Finally, the toast method from the react-toastify library is called to display a success message if the request is successful or an error message if there is an error.
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
          className="card-img-top h-auto ms-2"
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
                <FontAwesomeIcon className="FontIcon" icon={faPenToSquare} />
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
