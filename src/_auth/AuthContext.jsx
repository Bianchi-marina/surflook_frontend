import { createContext, useState, useEffect } from "react";
import { account } from "../api/appwrite";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      account
        .get()
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const jwtResponse = await account.createJWT();
      localStorage.setItem("jwt", jwtResponse.jwt);
      const user = await account.get();
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
