import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = async (email, password) => {
    try {
      let url = "";
      const response = await axios.post(url, { email, password });

      const { data } = response;
      if (response.status === 200) {
        setAuthTokens(data.token);
        localStorage.setItem("authTokens", JSON.stringify(data.token));

        if (data.token) {
          const { rol } = jwtDecode(data.token);
          const welcome =
            rol === "admin" ? "/welcome-admin" : "/welcome-pidiente";
          navigate(welcome);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseContext = () => useContext(Context);
