import React, { useState } from "react";
import "../../styles/register.css";
import Notification from "../../components/notification.jsx";
import { BASE_URL } from '../../utils/const.js';

export const Register = () => {
  const PATH_TO_REGISTER = BASE_URL + "/eshopbe/users/register/register.php";
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("login", login);
    formData.append("password", password);

    try {
      // Register the user
      const registerResponse = await fetch(PATH_TO_REGISTER, {
        method: "POST",
        body: formData,
      });

      if (registerResponse.ok) {
        const registerData = await registerResponse.json();
        if (registerData.error) {
          setNotification(registerData.error);
        } else {
          setNotification(registerData.message);
          // Reset the form
          setName("");
          setLogin("");
          setPassword("");
        }
      } else {
        const errorText = await registerResponse.text();
        setNotification(`Failed to register user: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to register user:", error);
      setNotification("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            maxLength="10"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            id="login"
            name="login"
            maxLength="12"
            placeholder="Login"
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
        <button type="submit">Register</button>
      </form>
      {notification && <Notification message={notification} />}
    </div>
  );
};
