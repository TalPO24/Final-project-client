//*    imports
import { useState, useEffect } from "react";
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

//* This is a JavaScript function called rain that generates a rain animation on a webpage.
//* The function starts by setting a amount variable to 20 and selecting the #root element on the page using the document.querySelector method.
//* It also sets a i variable to 0, which is used in the while loop.
//* The while loop will run amount number of times and will create a new HTML i element using the document.createElement method.
//* Inside the loop, the function sets a random size for the drop element between 0.3 and 5 pixels.
//* It sets a random posX value for the horizontal position of the drop element between 0 and the inner width of the window minus 25 pixels.
//* It sets a random delay value between 0 and -20 seconds for the animationDelay property and a random duration value between 1 and 50 seconds for the animationDuration property.
//* The function sets the width, left, animationDelay, and animationDuration CSS properties of the drop element to the generated values.
//* Finally, the function appends the drop element to the body element, and increments the i variable by 1, so that the loop will stop when it reaches the amount value.
//* When this function is called, it will generate a rain animation with amount number of drops falling from random positions within the window
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

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    rain();
    setIsLoading(true);
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          let { data } = await autoLogin();
          let dataFromToken = await jwt_decode(localStorage.getItem("token"));
          dispatch(authActions.login(dataFromToken.name));
          if (data) {
            dispatch(authActions.updateUserInfo(data.user));
          }
          setIsLoading(false);
        } catch (err) {
          localStorage.removeItem("token");
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container" id="container">
          <div id="rain"></div>

          <ToastContainer />
          <NavbarComponent />
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/HomePage" component={HomePage}></Route>
            <Route
              path="/moreinfo/:id"
              component={MoreInfoGameCardPage}
            ></Route>
            <Route
              path="/creategamecard"
              component={CreateGameCardPage}
            ></Route>
            <Route path="/storepage" component={GameStorePage}></Route>
            <AuthGuardRoute
              path="/editgamecard/:id"
              component={EditGameCardPage}
            ></AuthGuardRoute>
            <Route path="/aboutus" component={AboutUsPage}></Route>
            <Route path="/librarypage" component={MyGamesLibraryPage}></Route>
            <Route path="*" component={PageNotFound}></Route>
          </Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
