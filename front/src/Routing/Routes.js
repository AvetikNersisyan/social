import { useSelector } from 'react-redux'
import { publicRoutes, routes } from './utils'
import { Navigate, Route, Routes } from "react-router-dom";


export const Routing = () => {
  const { isAuth } = useSelector(state => state.user.user.currentUser)

  console.log(isAuth, 'isAuth')
  if(!isAuth) {
    return  <Routes>
      {
        publicRoutes.map(({path, Component}) => {
          return <Route path={path} element={Component}/>
        })
      }
      <Route path={"*"} element={<Navigate to={"/login"} replace />} />
    </Routes>
  }

  return (
    <Routes>
      {routes.map(({ path, Component }) => {
        return <Route path={path} element={Component} />;
      })}

      <Route path={"*"} element={<Navigate to={"/"} replace />} />
    </Routes>
  );
};
