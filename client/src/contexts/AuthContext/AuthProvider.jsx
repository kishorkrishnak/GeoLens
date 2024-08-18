import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { verifyToken } from "../../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await verifyToken();
        setUser(result.data.data.user);
      } catch (error) {
        console.log("Not authenticated", error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
