import { Box, Input, FormControl, InputLabel } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { refreshBaseData, setUser } from '../../redux/reducers/user'
import { API_STATUS } from '../../services/constants'
import { useLoginUser } from '../../services/loginUser'
import { LoadingButton } from '@mui/lab'
import { getToken } from '../../utils'



export const Login = () => {
  const dispatch = useDispatch()
  const userBaseData = useSelector(state => state.user.user.baseData)
  const { isAuth } = useSelector(state => state.user.user.currentUser)

  const { fetch, res, status } = useLoginUser()
  const navigate = useNavigate()

  const { username, password } = userBaseData


  const onLogin = () => {
    fetch(userBaseData)
  }

  useEffect(() => {
    if (isAuth) {
      console.log(isAuth,'esim')
      navigate('/')
    }
  }, [isAuth])

  const onChangeField = (value, field) => {
    const copiedData = Object.assign({}, userBaseData)
    copiedData[field] = value

    dispatch(refreshBaseData(copiedData))
  }

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column',
        height: '50vh',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '40vw',
          gap: '1rem',
        }}
      >
        <FormControl>
          <InputLabel htmlFor="input-login-username">Email address</InputLabel>
          <Input value={username}
                 onChange={(e) => { onChangeField(e.target.value, 'username')}}
                 id="input-login-username"/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-login-password">Password</InputLabel>
          <Input value={password}
                 onChange={(e) => { onChangeField(e.target.value, 'password')}}
                 id="input-login-password"/>
        </FormControl>
        <FormControl>
          <LoadingButton loading={status === API_STATUS.LOADING}
                         onClick={onLogin} type="submit" variant="contained">
            Login
          </LoadingButton>
        </FormControl>
        <NavLink
          style={{
            textDecoration: 'none',
            alignSelf: 'flex-end',
          }}
          to={'/signup'}
        >
          Create an account
        </NavLink>
      </Box>
    </Box>
  )
}
