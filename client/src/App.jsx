import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import useAuthContext from "./contexts/AuthContext/useAuthContext";
import { MapProvider } from "./contexts/MapContext";
import PrivateRoute from "./PrivateRoute";

const LazyMapPage = lazy(() => import("./pages/MapPage"));
const LazyLogin = lazy(() => import("./pages/Auth/Login"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile"));
const LazyLensCreation = lazy(() =>
  import("./pages/LensCreation/LensCreation")
);

const App = () => {
  const defaultTheme = createTheme();
  const { user } = useAuthContext();

  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      }
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={defaultTheme}>
          <MapProvider>
            <BrowserRouter>
              <ScrollToTop>
                <Toaster
                  position="top-right"
                  containerStyle={{ zIndex: 99999 }}
                />
                <Routes>
                  <Route path="/" element={<LazyHome />} />
                  <Route path="/lens" element={<LazyMapPage />} />
                  <Route
                    path="/lens/new/*"
                    element={
                      <PrivateRoute user={user} component={LazyLensCreation} />
                    }
                  />{" "}
                  <Route path="/lens/:id" element={<LazyMapPage />} />
                  <Route
                    path="/profile/:id"
                    element={
                      <PrivateRoute user={user} component={LazyUserProfile} />
                    }
                  />
                  <Route
                    path="/login"
                    element={user ? <Navigate to={"/"} /> : <LazyLogin />}
                  />
                </Routes>
              </ScrollToTop>
            </BrowserRouter>
          </MapProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Suspense>
  );
};

export default App;
