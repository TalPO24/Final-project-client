import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//* this function prevent unauthorized users from accessing the web page when they are not supposed to see (library page) it and redirect them to unauthorized (login page) page
const AuthGuardRoute = ({ component: Page, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Page {...props}></Page> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  );
};

export default AuthGuardRoute;
