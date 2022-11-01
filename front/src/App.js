import {  Container } from "@mui/material";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routing } from "./Routing/Routes";
import { getToken } from './utils'
import  { setUser} from './redux/reducers/user'


function App() {



const dispatch = useDispatch()
  const { isAuth } = useSelector(state =>state.user.user.currentUser)

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log(token, 'token')
      dispatch(setUser({ isAuth: true }))
    } else {
      dispatch(setUser({isAuth: false}))
    }
  }, [isAuth])

  return (
    <Container>
      <Routing />
    </Container>
  );
}

export default App;
