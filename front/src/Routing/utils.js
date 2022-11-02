import { Account } from '../Pages/Account'
import { Login } from "../Pages/Auth/login";
import {  MainFeed } from "../Pages/Auth/Feed";
import { SignUp } from "../Pages/Auth/registration";

export const routes = [
  {
    path: "/",
    Component: <MainFeed />,
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
