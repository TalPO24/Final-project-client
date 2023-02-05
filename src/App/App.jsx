//*    imports
import React, { lazy, Suspense } from "react";
import { useEffect } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import RegisterPage from "pages/registerPage/RegisterPage";
import LoginPage from "pages/loginPage/LoginPage";
import EditGameCardPage from "../pages/editGameCard/EditGameCardPage";
import NavbarComponent from "components/navbar/NavbarComponent";
import Footer from "components/footerComponent/FooterComponent";
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "pages/aboutUsPage/AbouUsPage";
import MyGamesLibraryPage from "pages/MyGamesLibrary/MyGamesLibraryPage";
import autoLogin from "services/autoLogin";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import CreateGameCardPage from "pages/createGameCard/CreateGameCardPage";
import GameStorePage from "pages/gameStore/GameStorePage";
import { Route, Switch } from "react-router-dom";
import AuthGuardRoute from "components/AuthGuardRouteComponent/AuthGuardRouteComponent";
import MoreInfoGameCardPage from "components/gameCardComponent/GameCardInfoComponent";

//* Suspens, lazy
// const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
// const GameStorePage = lazy(() => import("../pages/gameStore/GameStorePage"));

//*this function (rain) is the background style of the site.
function rain() {
  let amount = 20;
  let body = document.querySelector("#root");
  let i = 0;

  while (i < amount) {
    let drop = document.createElement("i");

    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * window.innerWidth - 25);
    let delay = Math.random() * -20;
    let duration = Math.random() * 50;

    drop.style.width = 0.3 + size + "px";
    drop.style.left = posX + "px";
    drop.style.animationDelay = delay + "s";
    drop.style.animationDuration = 1 + duration + "s";
    body.appendChild(drop);
    i++;
  }
}

//* in this function (App) we did couple of things:
//* we activated the (rain) function.
//* then we erote a function to delete the token
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    rain();
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          let { data } = await autoLogin();
          let dataFromToken = await jwt_decode(localStorage.getItem("token"));
          dispatch(authActions.login(dataFromToken.name));
          if (data) {
            dispatch(authActions.updateUserInfo(data.user));
          }
        } catch (err) {
          localStorage.removeItem("token");
        }
      })();
    }
  }, []);

  //* here we used react-router-dom to add the switch class so we can switch between the pages without uncimment some different route.
  //* then we use routes and pathes for the pages/components.
  return (
    <div>
      <div className="container" id="container">
        <div id="rain"></div>

        <ToastContainer />
        <NavbarComponent />
        <Switch>
          {/* <Suspense
            fallback={
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            }
          > */}
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/HomePage" component={HomePage}></Route>
          <Route path="/moreinfo/:id" component={MoreInfoGameCardPage}></Route>
          <Route path="/creategamecard" component={CreateGameCardPage}></Route>
          <Route path="/storepage" component={GameStorePage}></Route>
          <AuthGuardRoute
            path="/editgamecard/:id"
            component={EditGameCardPage}
          ></AuthGuardRoute>
          <Route path="/aboutus" component={AboutUsPage}></Route>
          <Route path="/librarypage" component={MyGamesLibraryPage}></Route>
          <Route path="*" component={PageNotFound}></Route>
          {/* </Suspense> */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
