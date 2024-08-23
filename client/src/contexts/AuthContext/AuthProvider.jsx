import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { verifyToken } from "../../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  //ensure auth status from server before the website loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await verifyToken();
        setUser(result.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setAuthCheckComplete(true);
      }
    };

    checkAuth();
  }, []);

  const contextValue = {
    user,
    setUser,
    authCheckComplete,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
