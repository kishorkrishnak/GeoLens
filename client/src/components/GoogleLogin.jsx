import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../contexts/AuthContext";

import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import { googleAuth } from "../api/auth";

const GoogleLogin = () => {
  const { setUser } = useAuthContext();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        setUser(result.data.data.user);
        toast.success("Successfuly logged in");
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Button
      onClick={googleLogin}
      sx={{
        color: "white",
      }}
      type="submit"
      color="success"
      startIcon={<GoogleIcon />}
      variant="contained"
    >
      Login
    </Button>
  );
};

export default GoogleLogin;
