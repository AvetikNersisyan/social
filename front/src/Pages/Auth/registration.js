import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, redirect } from "react-router-dom";
import { refreshBaseData } from "../../redux/reducers/user";
import { useAddUser } from "../../services/addUser";
import { API_STATUS } from "../../services/constants";

export const SignUp = () => {
  const dispatch = useDispatch();
  const { fetch, res, status } = useAddUser();
  const userBaseData = useSelector((state) => state.user.user.baseData);
  const [isPassShown, setIsPassShown] = useState(false);

  const { username, password } = userBaseData;

  const onSignUp = () => {
    fetch(userBaseData);
  };

  const onChangeField = (value, field) => {
    const copiedData = Object.assign({}, userBaseData);
    copiedData[field] = value;

    dispatch(refreshBaseData(copiedData));
  };

  const togleVisibility = () => {
    setIsPassShown((p) => !p);
  };

  if (status === API_STATUS.SUCCESS) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "end",
        flexDirection: "column",
        height: "50vh",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40vw",
          gap: "1rem",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="input-login-username">Email address</InputLabel>
          <Input
            onChange={(e) => onChangeField(e.target.value, "username")}
            id="input-login-username"
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="input-login-password">Password</InputLabel>
          <Input
            type={isPassShown ? "text" : "password"}
            value={password}
            onChange={(e) => {
              onChangeField(e.target.value, "password");
            }}
            id="input-login-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={togleVisibility}>
                  {isPassShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="input-login-name">Name </InputLabel>
          <Input
            onChange={(e) => onChangeField(e.target.value, "name")}
            id="input-login-name"
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="input-login-surname">Surname </InputLabel>
          <Input
            onChange={(e) => onChangeField(e.target.value, "surname")}
            id="input-login-surname"
          />
        </FormControl>

        <FormControl>
          <LoadingButton onClick={onSignUp} type="submit" variant="contained">
            Sign up
          </LoadingButton>
        </FormControl>
        <NavLink
          style={{
            textDecoration: "none",
            alignSelf: "flex-end",
          }}
          to={"/login"}
        >
          Already have an account?
        </NavLink>
      </Box>
    </Box>
  );
};
