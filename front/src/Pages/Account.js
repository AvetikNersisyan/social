import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../Components/MainLayout'
import { setUser } from '../redux/reducers/user'
import { API_STATUS } from '../services/constants'
import { useGetAccountData } from '../services/getAccountData'
import { removeItem } from '../utils'


export const Account = () => {
  const dispatch = useDispatch()
  const { res, fetch, status } = useGetAccountData()

  const onExit = () => {
    dispatch(setUser({ isAuth: false }))
    removeItem('token')
  }

  useEffect(() => {
    fetch();
  }, [])


  if(false) {
    return  <Box> No data</Box>;
  }
  return (
    <MainLayout>
      {status === API_STATUS.SUCCESS && <Box>
        <h3> {res.name}</h3>
        <h3> {res.surname}</h3>
        <h3> {res.email}</h3>
      </Box>}

      <Button onClick={onExit}>
        Exit
      </Button>
    </MainLayout>
  )
}
