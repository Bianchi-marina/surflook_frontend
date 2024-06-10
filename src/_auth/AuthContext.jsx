import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../api/appwrite";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { $id, email, name } = await account.get();
        setUser({ id: $id, email, name });
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const { $id, email: userEmail } = await account.get();
      setUser({ id: $id, email: userEmail });
    } catch (error) {
      console.error("Error no Login", error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      await account.create(name, email, password);
    } catch (error) {
      console.error("Erro no registro", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Erro no Logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
