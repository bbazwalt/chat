import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersChat } from "../chat/action";
import { currentUser } from "./action";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("chat-token")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(currentUser(authSignOut));
      dispatch(getUsersChat());
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const authSignIn = (token) => {
    localStorage.removeItem("chat-token");
    localStorage.setItem("chat-token", token);
    setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const authSignOut = () => {
    localStorage.removeItem("chat-token");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, authSignIn, authSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
