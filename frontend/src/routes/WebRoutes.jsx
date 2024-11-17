import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const WebRoutes = () => {
  const LoginPage = lazy(() => import("../pages/LoginRegister/LoginPage"));
  const RegisterPage = lazy(() => import("../pages/LoginRegister/RegisterPage"));
  const MainPage = lazy(() => import("../pages/AfterLogin/MainPage"));
  const UploadProfilePicture = lazy(() => import("../pages/AfterLogin/UploadImage"));

  return (
    <>
      <Routes>
        {/* Login Page */}
        <Route
          element={
            <Suspense fallback="Please wait a sec">
              <LoginPage />
            </Suspense>
          }
          path="/"
        />

        {/* Upload Image */}
        <Route
          element={
            <Suspense fallback="Please wait a sec">
              <UploadProfilePicture />
            </Suspense>
          }
          path="/addimage"
        />

        {/* register page */}
        <Route
          element={
            <Suspense fallback="Please wait a sec">
              <RegisterPage />
            </Suspense>
          }
          path="/register"
        />

        {/* Dashboard */}
        <Route
          element={
            <Suspense fallback="Please wait a sec">
              <MainPage />
            </Suspense>
          }
          path="/mainpage"
        />

        {/* end of routes ---------------- */}
      </Routes>
    </>
  );
};

export default WebRoutes;
