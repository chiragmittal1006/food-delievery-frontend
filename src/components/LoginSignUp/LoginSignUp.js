import React, { useState } from "react";
import "./LoginSignUp.css";
import { assets } from "../../assets/assets";
import axios from "axios";

function LoginSignUp({ setloginpopup , isAdmin , setisAdmin }) {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [currentState, setcurrentState] = useState("sign-up");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        { username, email, password }
      );
      console.log("User registered successfully:", response.data);
      // Optionally, you can perform actions such as showing a success message or redirecting the user
      window.location.replace("/");
    } catch (error) {
      console.error("Error registering user:", error.response.data.message);
      alert("user already exist with this email or username");
      // window.location.replace("/")
      // Optionally, you can show an error message to the user
    }
  };

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { username, password },
        { withCredentials: true }
      );

      // Check if access token and refresh token are received and stored in cookies
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isAdmin" , response.data.data.user.isAdmin)

        // Set access token in Axios default headers
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        window.location.replace("/")

        console.log(localStorage.getItem("isAdmin"))
        // HandleLogoutAuto();
      } else {
        console.log("Access token or refresh token is missing");
        alert(response.error);
        // Optionally, you can handle the case where the tokens are missing
      }
    } catch (error) {
      console.error("Error registering user:", error.response.data.message);
      alert("please enter valid username and password");
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-box-heading">
          <h2>{currentState === "sign-up" ? "Sign Up" : "Login"}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => {
              setloginpopup(false);
            }}
          />
        </div>
        <form
          className="login-form"
          onSubmit={
            currentState === "sign-up" ? HandleSubmit : HandleLoginSubmit
          }
        >
          <div className="login-form-div">
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              required
            />
            {currentState === "sign-up" ? (
              <input
                type="email"
                placeholder="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
              />
            ) : (
              <></>
            )}
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="form-submit">
            {currentState === "sign-up" ? "Sign Up" : "Login"}
          </button>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
          >
            <input required type="checkbox" name="checkbox" id="checkbox" />
            <p style={{ fontSize: "1rem", lineHeight: "1rem" }}>
              By clicking, i agree to the terms of use and privacy policy.
            </p>
          </div>
        </form>
        <h4>
          {currentState === "sign-up"
            ? " Already have an account?"
            : "Create a new account?"}
          &nbsp;{" "}
          <span
            style={{ color: "tomato" }}
            onClick={() => {
              setcurrentState((prev) =>
                prev === "sign-up" ? "login" : "sign-up"
              );
            }}
          >
            {currentState === "sign-up" ? "Login" : "Sign Up"}
          </span>
        </h4>
      </div>
    </div>
  );
}

export default LoginSignUp;
