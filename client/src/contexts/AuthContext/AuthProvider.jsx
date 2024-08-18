import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { verifyToken } from "../../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCheckComplete,setAuthCheckComplete] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await verifyToken();
        setUser(result.data.data.user);
      } catch (error) {
        console.log("Not authenticated", error);
        setUser(null);
      }finally{
        setAuthCheckComplete(true)
      }
    };

    checkAuth();
  }, []);

  const contextValue = {
    user,
    setUser,
    authCheckComplete
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
