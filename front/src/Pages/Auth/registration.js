import { LoadingButton } from '@mui/lab'
import { Box,  Input, FormControl, InputLabel } from "@mui/material";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, redirect } from 'react-router-dom'
import { refreshBaseData } from '../../redux/reducers/user'
import { useAddUser } from '../../services/addUser'
import { API_STATUS } from '../../services/constants'

export const SignUp = () => {
  const dispatch = useDispatch()
  const { fetch, res, status } = useAddUser();
  const userBaseData = useSelector(state => state.user.user.baseData)

  const onSignUp =() => {
      fetch(userBaseData)
  }

  const onChangeField = (value, field) => {
    const copiedData = Object.assign({}, userBaseData);
      copiedData[field] = value;

      dispatch(refreshBaseData(copiedData))
  }


  if(status === API_STATUS.SUCCESS) {
  return  <Navigate to={'/'} />
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
          <Input onChange={(e) => onChangeField(e.target.value, 'username')}  id="input-login-username" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-login-password">Password</InputLabel>
          <Input onChange={(e) => onChangeField(e.target.value, 'password')} id="input-login-password" />
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
