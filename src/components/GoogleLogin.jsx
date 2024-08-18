import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/api";
import { Button } from "@mui/material";
import useAuthContext from "../contexts/AuthContext/useAuthContext";

const GoogleLogin = () => {
  const { setUser } = useAuthContext();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        console.log(result);
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
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Sign In Using Google
  </Button>
  );
};

export default GoogleLogin;
