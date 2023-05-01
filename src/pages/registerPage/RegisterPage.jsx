import { Fragment, useState, useEffect,} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../registerPage/RegisterPage.scss";


//* this function uses the Hook "useState" to initialize the state variable "userInput" with an initial value of an object that has properties for "name", "email", and "password".
//* The state variable "userInput" is an object that can be modified by the component and is used to keep track of the values the user inputs into the corresponding form fields for name, email, and password.
//* The useState hook allows the component to have a state and the setUserInput function allows the component to change the state.
const RegisterPage = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //* ("userInputErrors") using the useState hook.
  //* It is an object with three properties: "name", "email", and "password".
  //* Each property is initialized with an empty array.
  //* This state variable is used to store any errors associated with the user's input in the corresponding fields (name, email, and password).
  //* This array will be updated when the user submits the form and the input is validated.
  const [userInputErrors, setUserInputErrors] = useState({
    name: [],
    email: [],
    password: [],
  });

  //*  uses the useState hook to set up a state variable called userInput which contains an object with the properties name, email, and password.
  //* The handleUserInputChange function is an event handler that is called when the user types in the form fields.
  //* It creates a deep copy of the userInput object, updates the property of the copy with the id of the form field that was changed, and then updates the state with the new value.
  //* This allows the component to keep track of the current values of the form fields as the user types in them.
  const handleUserInputChange = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    newUserInput[event.target.id] = event.target.value;
    setUserInput(newUserInput);
  };

  //* prevent the page from refresh.
  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  //* this function is handling the click event of a register button.
  //* When the button is clicked, it sends a POST request to the server with the user's input name, email, and password.
  //* If the request is successful, it logs the response to the console.
  //* If there is an error, the error is handled by creating a new object to store the input errors, then iterating through the error details returned from the server,
  //* and adding the error message to the corresponding key of the error object.
  //* Finally, it updates the state with the new error object.
  const handleRegisterClick = () => {
    axios
      .post("/auth/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      })
      .then((res) => {
        toast("you have successfuly registerd", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // navigate to the login page
        history.push("/login");
      })
      .catch((err) => {
        let newUserInputErrors = {
          name: [],
          email: [],
          password: [],
        };
        if (Array.isArray(err.response.data.err.details)) {
          for (let errorItem of err.response.data.err.details) {
            newUserInputErrors[errorItem.path[0]] = [
              ...newUserInputErrors[errorItem.path[0]],
              errorItem.message,
            ];
          }
        }
        setUserInputErrors(newUserInputErrors);
        toast("the user is already registered", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  
  

  return (
    <Fragment>
      <form className="row g-3" onSubmit={handleOnSubmit}>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <h1>Register page</h1>
          <div>
            <div className="registerPage">
              <div className="form-wrapper">
                <div className="col-md-6 w-100">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name"
                    value={userInput.name}
                    onChange={handleUserInputChange}
                  />
                  <ul className="list-group">
                    {userInputErrors.name.map((error, idx) => (
                      <li
                        className="list-group-item list-group-item-danger"
                        key={idx}
                      >
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
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
                    {userInputErrors.email.map((error, idx) => (
                      <li
                        className="list-group-item list-group-item-danger"
                        key={idx}
                      >
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
                  className="registerBtn "
                  onClick={handleRegisterClick}
                >
                  <span>Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterPage;
