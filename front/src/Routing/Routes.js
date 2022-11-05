import { useSelector } from "react-redux";
import { getToken } from "../utils";
import { publicRoutes, routes } from "./utils";
import { Navigate, Route, Routes } from "react-router-dom";

export const Routing = () => {
  const { isAuth } = useSelector((state) => state.user.user.currentUser);

  const isAuthToken = getToken() || isAuth;

  if (!isAuthToken) {
    return (
      <Routes>
        {publicRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={Component} />;
        })}
        <Route path={"*"} element={<Navigate to={"/login"} replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {routes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={Component} />;
      })}

      <Route path={"*"} element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};
