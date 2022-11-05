import {
  Box,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshBaseData, setUser } from "../../redux/reducers/user";
import { API_STATUS } from "../../services/constants";
import { useLoginUser } from "../../services/loginUser";
import { LoadingButton } from "@mui/lab";
import { getToken } from "../../utils";

export const Login = () => {
  const dispatch = useDispatch();
  const userBaseData = useSelector((state) => state.user.user.baseData);
  const { isAuth } = useSelector((state) => state.user.user.currentUser);
  const [isPassShown, setIsPassShown] = useState(false);

  const { fetch, res, status } = useLoginUser();
  const navigate = useNavigate();

  const { username, password } = userBaseData;

  const onLogin = () => {
    fetch(userBaseData);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const onChangeField = (value, field) => {
    const copiedData = Object.assign({}, userBaseData);
    copiedData[field] = value;

    dispatch(refreshBaseData(copiedData));
  };

  const togleVisibility = () => {
    setIsPassShown((p) => !p);
  };

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
            value={username}
            onChange={(e) => {
              onChangeField(e.target.value, "username");
            }}
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
          <LoadingButton
            loading={status === API_STATUS.LOADING}
            onClick={onLogin}
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
        </FormControl>
        <NavLink
          style={{
            textDecoration: "none",
            alignSelf: "flex-end",
          }}
          to={"/signup"}
        >
          Create an account
        </NavLink>
      </Box>
    </Box>
  );
};
