import React, { useState } from "react";
import "../../styles/login.css";
import Notification from "../../components/notification";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../utils/const.js';

export const Login = () => {
  const PATH_TO_LOGIN = BASE_URL + "/eshopbe/users/login/getlogpass.php";
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [, setCookie] = useCookies(["loggedIn", "userName"]);
  const navigate = useNavigate(); // Access the navigate function from React Router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const loginValue = formData.get("login");
    const passwordValue = formData.get("password");

    try {
      const response = await fetch(PATH_TO_LOGIN, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.match) {
          setNotification("Login successful");
          setCookie("loggedIn", true, { path: "/" });
          setCookie("userName", data.userName, { path: "/" });
          navigate("/"); // Redirect to the home page
        } else {
          setNotification("Invalid login or password");
          console.log(loginValue);
          console.log(passwordValue);
        }
      } else {
        const errorText = await response.text();
        setNotification(`Failed to login: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      setNotification("Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Login"
            maxLength="12"
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type="password"
            id="password"
            name="password"
            maxLength="12"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {notification && <Notification message={notification} />}
    </div>
  );
};
