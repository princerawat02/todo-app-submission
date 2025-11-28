import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";
import { useEffect } from "react";
import { api } from "./api/axiosClient";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, [setUser]);

  return (
    <Routes>
      <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/auth" replace />}
      />

      <Route
        path="/reset/:token"
        element={!user ? <ResetPassword /> : <Navigate to="/" replace />}
      />
      <Route
        path="/forgot"
        element={!user ? <ForgotPassword /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
