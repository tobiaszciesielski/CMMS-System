import React, { useState, useContext, createContext } from "react";
import http from "../services/httpService";
import JwtDecode from "jwt-decode";
import { AUTH_TOKEN } from "../config.json";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN) || "");
  const [user, setUser] = useState(decodeToken(token));

  const isAuthenticated = () => {
    return token ? true : false;
  };

  const login = async (login, password) => {
    const request = {
      login: login,
      password: password,
    };

    let error = "";
    try {
      const { headers } = await http.post("/login", request);
      localStorage.setItem(AUTH_TOKEN, headers[AUTH_TOKEN]);
      setToken(headers[AUTH_TOKEN]);
      setUser(decodeToken(headers[AUTH_TOKEN]));
      error = "";
    } catch (ex) {
      if (ex.response) {
        error = ex.response.data;
      } else if (ex.request) {
        error = "Server is not responding!";
      } else {
        error = ex.message;
      }
    }
    return error;
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const decodeToken = (token) => {
  try {
    return JwtDecode(token);
  } catch (ex) {
    return "";
  }
};

export const useAuth = () => useContext(AuthContext);
