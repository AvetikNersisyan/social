import { Account } from "../Pages/Account";
import { Login } from "../Pages/Auth/login";
import { MainFeed } from "../Pages/Feed";
import { SignUp } from "../Pages/Auth/registration";
import { Profile } from "../Pages/Profile/Profile";

export const routes = [
  {
    path: "/",
    Component: <MainFeed />,
  },
  {
    path: "/account",
    Component: <Account />,
  },
  {
    path: "/profile",
    Component: <Profile />,
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
];
