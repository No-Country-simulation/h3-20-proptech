import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const registerUser = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const url =
        "https://h3-20-proptech-production.up.railway.app/api/register/";
      console.log("THE RESPONSE BEFORE::: ", url);
      const response = await axios.post(url, data, config);

      if (response.status === 200) {
        const { token } = response.data;
        setAuthTokens(token);
        localStorage.setItem("authTokens", JSON.stringify(token));
        navigate("/login");
        console.log("Login Success");
      } else {
        console.log("An Error Occurred");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error en el servidor:", error.response.data.message);
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  const loginUser = async (username, password) => {
    try {
      let url = "https://h3-20-proptech-production.up.railway.app/api/login";
      const response = await axios.post(url, { username, password });

      const { data } = response;
      if (response.status === 200) {
        setAuthTokens(data.token);
        localStorage.setItem("authTokens", JSON.stringify(data.token));

        if (data.token) {
          setIsAuthenticated(true);
          navigate("/");
        }

        console.log("Login Success");
      } else {
        console.log(response.status);
        console.log("An Error Occured");
        console.log("Email - Password does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("");
      if (response.statusText === "OK") {
        if (users.length === 0) {
          setUsers(response.data);
        }
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Context.Provider
      value={{
        setUsers,
        users,
        getUsers,
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        registerUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseContext = () => useContext(Context);
