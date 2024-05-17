import React, { useState, createContext, useContext, useReducer } from "react";
import axiosInstance from "services/axiosInstance";
import { API_URL } from "utils/urls";
import AuthData from "mocks/auth";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  ...initialState,
  method: "Auth",
  login: async (params) => {},
});

export const AuthProvider = ({ children }) => {
  const [state] = useReducer(initialState);
  let [user, setUser] = useState("");

  const login = async (params) => {
    try {
      const response = await axiosInstance.post(API_URL.LOGIN, {
        params,
      });
      // const response = AuthData
      console.log("response", response);
      return response;
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const config = {
    ...state,
    method: "Auth",
    login,
  };

  return <AuthContext.Provider value={config}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
