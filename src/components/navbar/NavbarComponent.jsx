//*      imports
import NavBarLinkPartial from "partial/NavBarLinkPartial";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import "../../components/navbar/NavBarComponent.scss";

let links = [
  {
    label: "Home",
    url: "/",
  },

  {
    label: "store",
    url: "/storepage",
  },
  {
    label: "About Us",
    url: "/aboutus",
  },
  {
    label: "library",
    url: "/librarypage",
  },
];

let authLinks = {
  isLoggedIn: [
    {
      label: "Welcome",
      url: "/Profile",
    },
    {
      label: "Logout",
      url: "/logout",
    },
  ],
  isLoggedOut: [
    {
      label: "Login",
      url: "/login",
    },
    {
      label: "Register",
      url: "/register",
    },
  ],
};

let adminLinks = [
  {
    label: "Create game card",
    url: "/creategamecard",
  },
];

//* this function is for the navBar.
//* useDispatch helps us to update redux.
//* useHistory helps us to navigate between pages.
//* (loggedIn) when an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value.
const NavbarComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dataFromToken = useSelector((state) => state.auth.userInfo);
  const userInfo = useSelector((state) => state.auth.userInfo);

  //* this function handels the logout btn so when the user is logged out the it we clear the token from the local storage.
  //* then when the user is logged out then the function of (history.push) transfer the user to the login page.
  const handleLogoutBtnClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GameStore <FontAwesomeIcon icon={faGamepad} />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          // aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {links.map((item, idx) => (
              <NavBarLinkPartial
                key={"navlinks" + idx}
                label={item.label}
                link={item.url}
              />
            ))}

            {dataFromToken?.isAdmin &&
              adminLinks.map((item, idx) => (
                <NavBarLinkPartial
                  key={"adminnavlinks" + idx}
                  label={item.label}
                  link={item.url}
                />
              ))}
          </ul>
        </div>
        <form className="d-flex" role={"search"}>
          {loggedIn ? (
            <Fragment>
              <button type="button" className="btn btn-outline-light">
                {"You logged In"}
              </button>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleLogoutBtnClick}
              >
                {"Logout"}
              </button>
            </Fragment>
          ) : (
            authLinks.isLoggedOut.map((item, idx) => (
              <button
                type="button"
                className="btn btn-outline-light"
                key={"loggedOut" + idx}
                onClick={() => {
                  history.push(item.url);
                }}
              >
                {item.label}
              </button>
            ))
          )}
        </form>
      </div>
    </nav>
  );
};

export default NavbarComponent;
