import React, { useState, createContext, useContext, useReducer } from "react";
import axiosInstance from "services/axiosInstance";
import { API_URL } from "utils/urls";
// import AuthData from "mocks/auth";
import { useHistory } from "react-router-dom";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  ...initialState,
  method: "Auth",
  login: async (params) => {},
  logout: async () => {}
});

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [state] = useReducer(initialState);
  let [user, setUser] = useState("");

  const parseJWT = (token) => {
    try{
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }). join(''))
      return JSON.parse(jsonPayload);
    }catch(e){
      console.log('error', e);
    }
  }

  const login = async (params) => {
    try {
      const response = await axiosInstance.post(API_URL.LOGIN, 
        params,
      );
      console.log("response", response);
      const {token} = response.data;
      console.log('token', token);
      if(token){
        document.cookie = `token=${token}; path=/; max-age="+ 60 * 60 * 24 * 10";`
        const decodeToken = parseJWT(token);
        console.log('decodeToken', decodeToken);
        if(decodeToken){
          const orgId = decodeToken.orgId
          console.log(orgId);
        }
      }

      
      return response;
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const logout = () => {
    console.log('logout function')
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"

    // history.push('/sign-in');
  }

  const config = {
    ...state,
    method: "Auth",
    login,
    logout,
  };

  return <AuthContext.Provider value={config}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
