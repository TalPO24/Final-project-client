import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import "../loginPage/LoginPage.scss";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
// import Joi from "joi-browser";
import validate from "validation/validation";
import loginSchema from "validation/login.validation";

//*  the useState hook create a state variable userInput and a function setUserInput to update the state.
//* The initial value of userInput is an object with properties email and password initialized as empty strings.
const LoginPage = () => {
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

  //*enabeling and disabeling Login button
  // useEffect(() => {
  //   const { error } = validate(userInput, loginSchema);
  //   if (error) {
  //     setLoginBtn(true);
  //   } else {
  //     setLoginBtn(false);
  //   }
  // }, [userInput]);

  const handleOnClick = (event) => {
    event.preventDefault();
    // const { error } = validate(userInput, loginSchema);
    // if (error) {
    //   let errorMsgs = "";
    //   for (let errorItem of error.details) {
    //     switch (errorItem.type) {
    //       case "string.min":
    //         errorMsgs += `${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
    //         break;
    //       case "string.max":
    //         errorMsgs += `${errorItem.context.label} length must be at least ${errorItem.context.limit} characters long, `;
    //         break;
    //       default:
    //         errorMsgs += "something went wrong,";
    //         break;
    //     }
    //   }
    //   toast.error(errorMsgs, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }

    //   .catch((err) => {
    //     toast.error("😭 Something went wrong", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   });
  };

  //* this function, is making an HTTP request to the server using axios.
  //* It is a POST request to the endpoint ("/auth/login") with the payload userInput.
  //* If the request is successful, it will store the token received in the response in the localStorage and dispatch the login action with the decoded token to update the application state.
  //* It will also show a success toast message.
  const handleLoginClick = () => {
    axios.post("/auth/login", userInput).then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch(authActions.login(jwt_decode(res.data.token)));
      //*redirect to panelPage
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
    });

    //* This code is making a POST request to the endpoint ("/auth/register") using axios.
    //* It is sending an object with name, email, and password properties of the userInput object as the payload.
    //* If the request is successful, it will log the response object to the console.
    //* In case the request is not successful, it will handle the error in the catch block.
    //* It creates an object newUserInputErrors with properties name, email, and password initialized as empty arrays.
    //* It then iterates through the error details in the response object, and for each error, it pushes the error message to the corresponding property of the newUserInputErrors object.
    //* Finally, it sets the newUserInputErrors object to the userInputErrors state variable.
    //* This code is essentially handling errors that may occur when a user is trying to register, It will keep track of errors for each input field, such as name, email, and password, and then updates the state variable userInputErrors.
    //* This way the error message can be displayed to the user.
    axios
      .post("/auth/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        let newUserInputErrors = {
          name: [],
          email: [],
          password: [],
        };
        for (let errorItem of err.response.data.err.details) {
          newUserInputErrors[errorItem.path[0]] = [
            ...newUserInputErrors[errorItem.path[0]],
            errorItem.message,
          ];
        }
        setUserInputErrors(newUserInputErrors);
      });
  };

  useEffect(() => {
    console.log(userInputErrors);
  }, [userInputErrors]);

  return (
    <Fragment>
      <div className="container">
        <form className="row g-3">
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
                    <ul className="list-group">
                      {userInputErrors.email.map((error) => (
                        <li className="list-group-item list-group-item-danger">
                          {error}
                        </li>
                      ))}
                    </ul>
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
                      {userInputErrors.password.map((error) => (
                        <li className="list-group-item list-group-item-danger">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={"/"}
                    className="loginBtn"
                    onClick={handleLoginClick}
                  >
                    <span>login</span>
                  </Link>
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
