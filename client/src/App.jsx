import { createTheme, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import SuspenseFallback from "./components/SuspenseFallback";
import useAuthContext from "./contexts/AuthContext/useAuthContext";
import { MapProvider } from "./contexts/MapContext";
import PrivateRoute from "./PrivateRoute";

const LazyMapPage = lazy(() => import("./pages/MapPage"));
const LazyLenses = lazy(() => import("./pages/Lenses"));

const LazyHome = lazy(() => import("./pages/Home"));
const LazyUserProfile = lazy(() => import("./pages/UserProfile"));
const LazyLensCreation = lazy(() => import("./pages/LensCreation"));

const App = () => {
  const defaultTheme = createTheme();
  const { user, authCheckComplete } = useAuthContext();

  return (
    <>
      {authCheckComplete && (
        <Suspense fallback={<SuspenseFallback />}>
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
                        path="/user/:id/lenses"
                        element={<LazyMapPage />}
                      />
                      <Route
                        path="/lens/new/*"
                        element={
                          <PrivateRoute
                            user={user}
                            component={LazyLensCreation}
                          />
                        }
                      />{" "}
                      <Route path="/lens/:id" element={<LazyLenses />} />
                      <Route
                        path="/user/:id"
                        element={
                          <PrivateRoute
                            user={user}
                            component={LazyUserProfile}
                          />
                        }
                      />
                    </Routes>
                  </ScrollToTop>
                </BrowserRouter>
              </MapProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </Suspense>
      )}
    </>
  );
};

export default App;
