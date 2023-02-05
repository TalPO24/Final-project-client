import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";

//* import axios */
import axios from "axios";

//* import bootstrap to react*/
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

//* import react toastify */
import "react-toastify/dist/ReactToastify.css";

//* import redux */
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";

//* config axios */
axios.defaults.baseURL = `http://10.0.0.8:3030/api`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    //* the token exists in local storage,the user logged in.
    //* if the token exists then we will add it to header of the request
    config.headers["token"] = token;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>{" "}
  </Provider>
);

reportWebVitals();
