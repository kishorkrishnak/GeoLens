import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthContext from "../contexts/AuthContext/useAuthContext";
import { googleAuth } from "../api/auth";

const GoogleLogin = () => {
  const { setUser } = useAuthContext();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        setUser(result.data.data.user);
        alert("successfuly logged in");
      } else {
        console.log(authResult);
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
      type="submit"
      color="success"
      variant="contained"
    >
      Sign In Using Google
    </Button>
  );
};

export default GoogleLogin;
