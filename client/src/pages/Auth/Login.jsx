import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Footer from "../../components/Footer/Footer";
import GoogleLogin from "../../components/GoogleLogin";
import useAuthContext from "../../contexts/AuthContext/useAuthContext";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const { user } = useAuthContext();

  return (
    <>
      <h1>{user && JSON.stringify(user, null, 2)}</h1>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />

        <Grid
          sx={{
            borderRadius: "10px",
          }}
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={3}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
        <Avatar alt="logo" src="/logo.svg" />
            <Typography color={"secondary"} component="h1" variant="h5">
            GeoLens
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, margin: "0 auto" }}
            >
              <GoogleLogin />
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Or try out basic features as guest"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
