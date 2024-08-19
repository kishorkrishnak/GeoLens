import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { verifyToken } from "../../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  //ensure auth status before page load to ensure proper working
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
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
