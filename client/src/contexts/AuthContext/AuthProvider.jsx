import { useEffect, useState } from "react";
import { verifyToken } from "../../api/auth";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //ensure auth status from server before the website loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await verifyToken();
        setUser(result.data.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
