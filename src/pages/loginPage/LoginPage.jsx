import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import "../loginPage/LoginPage.scss";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";

//*  the useState hook create a state variable userInput and a function setUserInput to update the state.
//* The initial value of userInput is an object with properties email and password initialized as empty strings.
const LoginPage = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [loginBtn, setLoginBtn] = useState(false);
  const dispatch = useDispatch();

  const [userInputErrors, setUserInputErrors] = useState({
    email: [],
    password: [],
  });

  //* This function is used to update the userInput state variable when the user types in the email and password fields in the login form.
  //* The function takes an event object as an argument, which is passed to it as an onChange event handler for the email and password fields in the login form.
  //* The function uses the (event.target.id) property to determine which field the event is coming from (email or password) and the (event.target.value) property to get the new value that the user entered.
  //* The function then creates a new variable, newUserInput, as a deep copy of the current userInput state variable, using JSON.parse(JSON.stringify(userInput)).
  //* This is done to create a new object and not reference the original object.
  //* It then assigns the new value to the appropriate field in the newUserInput object.
  //* Finally, it calls the setUserInput function passing the new user input object to update the state.
  const handleUserInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    newUserInput[event.target.id] = event.target.value;
    setUserInput(newUserInput);
  };

  //* prevent the page from refresh.
  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  //* this function, is making an HTTP request to the server using axios.
  //* It is a POST request to the endpoint ("/auth/login") with the payload userInput.
  //* If the request is successful, it will store the token received in the response in the localStorage and dispatch the login action with the decoded token to update the application state.
  //* It will also show a success toast message.
  const handleLoginClick = () => {
    axios.post("/auth/login", userInput)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(authActions.login(jwt_decode(res.data.token)));
        toast("you logged in!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
          theme: "dark",
        });
        history.push("/");
      })
      .catch((err) => {
        let newUserInputErrors = {
          email: [],
          password: [],
        };
        if (err.response && err.response.data && err.response.data.err) {
          for (let errorItem of err.response.data.err.details) {
            newUserInputErrors[errorItem.path[0]] = [
              ...newUserInputErrors[errorItem.path[0]],
              errorItem.message,
            ];
          }
        }
        setUserInputErrors(newUserInputErrors);
          toast.error("E-mail or Password are incorrect. Please try again.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "dark",
          });
        
      });
  };
  

  return (
    <Fragment>
      <div className="container">
        <form className="row g-3" onSubmit={handleOnSubmit}>
          <span className="col d-flex flex-column justify-content-center align-items-center">
            <h1>Login page</h1>
            <div>
              <div className="loginPage">
                <div className="form-wrapper">
                  <div className="col-md-6 w-100">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={userInput.email}
                      onChange={handleUserInputChange}
                    />
                    {userInputErrors.email.length > 0 && (
  <ul className="list-group">
    {userInputErrors.email.map((error, idx) => (
      <li
        className="list-group-item list-group-item-danger"
        key={idx}
      >
        {error}
      </li>
    ))}
  </ul>
)}

{userInputErrors.password.length > 0 && (
  <ul className="list-group">
    {userInputErrors.password.map((error, idx) => (
      <li
        className="list-group-item list-group-item-danger"
        key={idx}
      >
        {error}
      </li>
    ))}
  </ul>
)}



                  </div>
                  <div className="col-md-6 w-100">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={userInput.password}
                      onChange={handleUserInputChange}
                    />
                    <ul className="list-group">
                      {userInputErrors.password.map((error, idx) => (
                        <li
                          className="list-group-item list-group-item-danger"
                          key={idx}
                        >
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="loginBtn"
                    onClick={handleLoginClick}
                  >
                    <span>login</span>
                  </button>
                </div>
              </div>
            </div>
          </span>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
