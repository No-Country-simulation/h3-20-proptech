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
      const url =
        "https://h3-20-proptech-production.up.railway.app/api/register/";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log("Before SHOW:::", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      navigate("/login");
      return result;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  const loginUser = async (login_data) => {
    try {
      const url = "https://h3-20-proptech-production.up.railway.app/api/login/";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(login_data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.access && data.refresh) {
        setIsAuthenticated(true);
        localStorage.setItem("access", JSON.stringify(data.access));
        localStorage.setItem("refresh", JSON.stringify(data.refresh));
        navigate("/");
        console.log("Login Success");
      } else {
        throw new Error("Tokens no encontrados en la respuesta");
      }
    } catch (error) {
      console.error("Error en login:", error.message);
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
//for register new user from Admin dashboard
  const registerUserAdmin = async (data) => {
    try {
      const url =
        "https://h3-20-proptech-production.up.railway.app/api/register/";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log("Before SHOW:::", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);
    //   navigate("/login");
      return result;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
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
        registerUserAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseContext = () => useContext(Context);
