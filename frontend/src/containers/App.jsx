import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useAuth } from "../redux/user/authContext";

const App = () => {
  const { token } = useAuth();

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/signin" replace />;
  };

  const RedirectToHomeOrAuth = ({ children }) => {
    return token ? <Navigate to="/" replace /> : children;
  };

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <RedirectToHomeOrAuth>
              <SignIn />
            </RedirectToHomeOrAuth>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <RedirectToHomeOrAuth>
              <SignUp />
            </RedirectToHomeOrAuth>
          }
        ></Route>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
