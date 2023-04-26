import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
axios.defaults.headers.common["Authorization"] = JSON.parse(
  localStorage.getItem("authToken")
)?.token;

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("authToken"));
    setAuth({ ...auth, user: obj?.user, token: obj?.token });
  }, []);

  return (
    <AuthContext.Provider
      value={[auth, setAuth, loading, setLoading, details, setDetails]}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
