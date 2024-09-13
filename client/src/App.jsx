import { Box, LinearProgress, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import SuspenseFallback from "./components/SuspenseFallback";
import { useAuthContext } from "./contexts/AuthContext";
import { MapProvider } from "./contexts/MapContext";
import PrivateRoute from "./PrivateRoute";
import theme from "./theme";

const LazyLens = lazy(() => import("./pages/Lens"));
const LazyLenses = lazy(() => import("./pages/Lenses"));
const LazyYourLenses = lazy(() => import("./pages/YourLenses"));
const LazyHome = lazy(() => import("./pages/Home"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile"));
const LazyLensCreation = lazy(() => import("./pages/LensCreation"));
const LazyEditLens = lazy(() => import("./pages/EditLens"));
const LazyLikedLenses = lazy(() => import("./pages/LikedLenses"));
const LazySuggestions = lazy(() => import("./pages/Suggestions"));

const App = () => {
  const defaultTheme = theme;

  const { user, loading } = useAuthContext();
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ThemeProvider theme={defaultTheme}>
            <MapProvider>
              <BrowserRouter>
                <ScrollToTop>
                  {loading && (
                    <Box
                      sx={{
                        width: "100%",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000000,
                      }}
                    >
                      <LinearProgress />
                    </Box>
                  )}
                  <Toaster
                    position="top-right"
                    containerStyle={{ zIndex: 1000000 }}
                  />
                  <Routes>
                    <Route path="/" element={<LazyHome />} />
                    <Route path="/lenses" element={<LazyLenses />} />
                    <Route
                      path="/lens/new/*"
                      element={
                        <PrivateRoute
                          user={user}
                          component={LazyLensCreation}
                          state={{
                            operation: "create",
                          }}
                        />
                      }
                    />
                    <Route
                      path="/lens/edit/:id/*"
                      element={
                        <PrivateRoute
                          user={user}
                          component={LazyEditLens}
                          state={{
                            operation: "edit",
                          }}
                        />
                      }
                    />
                    <Route path="/lens/:id" element={<LazyLens />} />
                    <Route
                      path="/user/:id"
                      element={
                        <PrivateRoute user={user} component={LazyUserProfile} />
                      }
                    />
                    <Route
                      path="/user/:id/lenses"
                      element={<LazyYourLenses />}
                    />{" "}
                    <Route
                      path="/user/:id/lenses/liked"
                      element={<LazyLikedLenses />}
                    />
                    <Route
                      path="/lens/:id/suggestions"
                      element={<LazySuggestions />}
                    />
                  </Routes>
                </ScrollToTop>
              </BrowserRouter>
            </MapProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </Suspense>
    </>
  );
};

export default App;
