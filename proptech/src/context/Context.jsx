import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Context = createContext();

export default Context;

const urlGlobal = "https://h3-20-proptech-production.up.railway.app/api/";

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const registerUser = async (data) => {
    try {
      const url = urlGlobal + "register/";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

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
      const response = await fetch(urlGlobal + "login/", {
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

      if (data.access && data.refresh) {
        setIsAuthenticated(true);
        localStorage.setItem("access", JSON.stringify(data.access));
        localStorage.setItem("refresh", JSON.stringify(data.refresh));
        localStorage.setItem("rol", JSON.stringify(data.user_type));
        navigate("/");
        console.log("Login Success");
      } else {
        throw new Error("Tokens no encontrados en la respuesta");
      }
    } catch (error) {
      console.error("Error en login:", error.message);
    }
  };

//   const getUsers = async () => {
//     try {
//       const response = await axios.get("");
//       if (response.statusText === "OK") {
//         if (users.length === 0) {
//           setUsers(response.data);
//         }
//       } else {
//         console.log(response.error);
//       }
//     } catch (error) {
//       console.error("Error", error);
//     }
//   };

const getUsers = async () => {
    try {
      const url =  urlGlobal + "all-users/"; // Ensure urlGlobal is correctly initialized in context.jsx
      const response = await axios.get(url);
      
      if (response.status === 200) { // Use response.status instead of statusText for better reliability
        setUsers(response.data); // Directly set the data
        return response;
      } else {
        console.error("Error fetching users:", response);
      }
    } catch (error) {
      console.error("Error fetching users:", error); // Improved error logging
    }
  };

  const getUserById = async (id) => {
    try {
      const url =  urlGlobal + "user/" + id + "/"; 
      const response = await axios.get(url);
      
      if (response.status === 200) { 
        setUser(response.data); 
        console.log(response);
        return response;  //return data
      } else {
        console.error("Error fetching users:", response);
      }
    } catch (error) {
      console.error("Error fetching users:", error); 
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.clear();
    navigate("/");
  };

  //to register new user from Admin dashboard
  const registerUserAdmin = async (data) => {
    try {
      const url = urlGlobal + "register/";

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

      return result;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  //to update user information 
const updateUserInformation = async (data) => {
    try {
      const url = urlGlobal + "update-user-information/";

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await fetch(url, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   Accept: "application/json",
        // },
        body: formData, // FormData automatically sets the correct headers
        credentials: "include",
      });
      console.log("Before SHOW:::", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      return result;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  const getInvestments = async () => {
    try {
      const url =  urlGlobal + "investment-list-create/"; // Ensure urlGlobal is correctly initialized in context.jsx
      const response = await axios.get(url);
      
      if (response.status === 200) { // Use response.status instead of statusText for better reliability
        setInvestments(response.data); // Directly set the data
        return response;
      } else {
        console.error("Error fetching investments:", response);
      }
    } catch (error) {
      console.error("Error fetching investments:", error); // Improved error logging
    }
  };


  return (
    <Context.Provider
      value={{
        setUsers,
        users,
        getUsers,
        getUserById,
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        registerUser,
        registerUserAdmin,
        updateUserInformation,
        getInvestments,
        isAuthenticated,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseContext = () => useContext(Context);