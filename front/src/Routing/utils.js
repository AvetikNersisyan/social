import { Account } from '../Pages/Account'
import { Login } from "../Pages/Auth/login";
import { Feed } from "../Pages/Auth/Feed";
import { SignUp } from "../Pages/Auth/registration";

export const routes = [
  {
    path: "/",
    Component: <Feed />,
  },
  {
    path: "/account",
    Component: <Account />,
  },

];


export const publicRoutes = [

  {
    path: "/login",
    Component: <Login />,
  },
  {
    path: "/signup",
    Component: <SignUp />,
  },

]
