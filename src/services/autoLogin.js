import axios from "axios";

//* This function is an asynchronous function that makes a POST request to the ("/auth/userinfo") endpoint using the axios library.
//* ("axios.post") makes a post request to the given endpoint and returns a promise that resolves to the response object of the request.
//* This function trying to make a post request to the ("/auth/userinfo") endpoint, for auto-login functionality.
//* This function makes a post request to a server-side endpoint and then receives a userinfo as a response.
//* The returned promise will resolve to an object containing the response data, such as user information, once the request is complete.
const autoLogin = async() => {
    return await axios.post("/auth/userinfo");
};

export default autoLogin;