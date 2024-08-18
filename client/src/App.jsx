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
import useAuthContext from "./contexts/AuthContext/useAuthContext";
import { MapProvider } from "./contexts/MapContext";
import ScrollToTop from "./components/ScrollToTop";
const LazyMapPage = lazy(() => import("./pages/MapPage"));
const LazyLogin = lazy(() => import("./pages/Auth/Login"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile"));

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
      <GoogleOAuthProvider
        clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}
      >
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
                  <Route path="/lens/:id" element={<LazyMapPage />} />
                  <Route path="/profile/:id" element={<LazyUserProfile />} />
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
